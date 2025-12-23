import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutoTranslateService {
  currentLang = signal(this.getSavedLang());
  isTranslating = signal(false);

  private cache: Record<string, Record<string, string>> = {};
  private pendingTranslations: Map<string, Promise<string>> = new Map();
  private brandObserver: MutationObserver | null = null;
  private brandObserverTimer: any = null;

  constructor() {
    this.initializeGoogleTranslate();
    // Protect brand name on initialization so it isn't translated
    try {
      const div = document.querySelector('.skiptranslate') as HTMLIFrameElement | null;
      if (div) {
        div.style.display = 'none';
      }
      // slight delay to ensure DOM has been rendered
      setTimeout(() => this.protectBrand(), 200);
      // start observing DOM changes so dynamically added content is protected
      setTimeout(() => this.startBrandObserver(), 300);
    } catch (e) {
      console.warn('protectBrand init failed', e);
    }
  }

  private initializeGoogleTranslate() {
    // Load Google Translate script
    if (typeof window !== 'undefined' && !(window as any).google) {
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.head.appendChild(script);
    }
  }

  private startBrandObserver() {
    try {
      if (this.brandObserver || typeof MutationObserver === 'undefined' || typeof document === 'undefined' || !document.body) return;
      this.brandObserver = new MutationObserver((mutations) => {
        if (this.brandObserverTimer) clearTimeout(this.brandObserverTimer);
        this.brandObserverTimer = setTimeout(() => {
          try {
            this.protectBrand();
          } catch (e) {}
        }, 120);

        // also adjust Google Translate banner when DOM changes
        this.adjustGoogleBanner();
      });
      this.brandObserver.observe(document.body, { childList: true, subtree: true, characterData: true });
    } catch (e) {
      console.warn('startBrandObserver failed', e);
    }
  }

  // Make Google Translate banner opaque and push content down instead of overlaying
  private adjustGoogleBanner() {
    try {
      // find the banner iframe inserted by Google Translate
      const iframe = document.querySelector('.skiptranslate') as HTMLIFrameElement | null;
      if (!iframe) {
        // no banner: remove any padding we previously set
        if (document.body.style.paddingTop) document.body.style.paddingTop = '';
        return;
      }

      // style the iframe element to be solid and above other content
      iframe.style.position = 'fixed';
      iframe.style.top = '0';
      iframe.style.left = '0';
      iframe.style.right = '0';
      iframe.style.width = '100%';
      iframe.style.height = '0px !important';
      iframe.style.zIndex = '9999';
      iframe.style.opacity = '1';
      iframe.style.pointerEvents = 'auto';
      iframe.style.display = 'none';

      // Attempt to set a solid background on the iframe element itself
      iframe.style.backgroundColor = '#1C1C1C';

      // compute visible height and add padding to body so content is pushed down
      const rect = iframe.getBoundingClientRect();
      const height = rect.height || 48; // fallback to 48px if not measurable
      document.body.style.paddingTop = `0px !important`;

      // if header is fixed at top, increase its z-index so it appears below the banner
      const header = document.querySelector('nav');
      if (header) {
        (header as HTMLElement).style.zIndex = '9000';
      }
    } catch (e) {
      console.warn('adjustGoogleBanner failed', e);
    }
  }

  private getSavedLang(): string {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('site_lang') || 'pt';
    }
    return 'pt';
  }

  switchLang(lang: string) {
    this.currentLang.set(lang);
    localStorage.setItem('site_lang', lang);

    // Ensure the brand name is protected before attempting translation
    try {
      this.protectBrand();
    } catch (e) {
      console.warn('protectBrand before switch failed', e);
    }

    // Manage googtrans cookie so Google Translate keeps correct state
    // Simpler, more reliable flow: set the googtrans cookie and reload the page
    // so the Google widget reads the cookie and applies the chosen language immediately.
    if (lang !== 'pt') {
      this.setGoogleCookie('pt', lang);
    } else {
      this.setGoogleCookie('pt', 'pt');
      this.removeGoogleCookie();
    }

    // Try to apply translation programmatically without a full reload.
    // Order of attempts:
    // 1) Call global doGTranslate if available
    // 2) Change goog-te-combo select in document or iframe
    // 3) Use google.translate.TranslateService.execute if available
    // If none succeed within short timeout, fall back to reload.

    const applied = this.tryApplyWithoutReload(lang);
    if (applied) {
      // re-apply protection after a short delay so the widget doesn't touch the brand
      setTimeout(() => this.protectBrand(), 600);
      // ensure body padding reflects chosen language
      try {
        this.setBodyPaddingForLang(lang);
      } catch (e) {}
    } else {
      this.reloadPreserveRoute();
    }
  }

  // Set a body padding-top when language is English so the Google banner doesn't overlay content
  private setBodyPaddingForLang(lang: string) {
    try {
      if (typeof document === 'undefined' || !document.body) return;
      const body = document.body;
      // smooth transition for visual nicety
      body.style.transition = 'padding-top 200ms ease';
      if (lang === 'en') {
        // prefer existing banner height if available
        const iframe = document.querySelector('iframe.goog-te-banner-frame') as HTMLIFrameElement | null;
        const rect = iframe ? iframe.getBoundingClientRect() : null;
        const height = (rect && rect.height) ? rect.height : 48;
        body.style.paddingTop = `0px !important`;
      } else {
        body.style.paddingTop = '';
      }
    } catch (e) {
      console.warn('setBodyPaddingForLang failed', e);
    }
  }

  private tryApplyWithoutReload(lang: string): boolean {
    try {
      // 1) Try global doGTranslate helper (commonly injected by the widget)
      const win = window as any;
      if (typeof win.doGTranslate === 'function') {
        try {
          win.doGTranslate(`pt|${lang}`);
          return true;
        } catch (e) {
          console.warn('doGTranslate failed', e);
        }
      }

      // 2) Try changing the select.goog-te-combo in document
      if (this.applyGoogleCombo(lang)) {
        return true;
      }

      // 3) Try calling internal TranslateService API
      if (typeof win.google !== 'undefined' && win.google.translate && win.google.translate.TranslateService) {
        try {
          // prefer using translatePage which handles errors
          this.translatePage(lang);
          return true;
        } catch (e) {
          console.warn('TranslateService execute failed', e);
        }
      }
    } catch (e) {
      console.warn('tryApplyWithoutReload encountered error', e);
    }
    return false;
  }

  private applyGoogleCombo(lang: string): boolean {
    try {
      // Try to find the select element added by Google Translate
      const combo = document.querySelector('select.goog-te-combo') as HTMLSelectElement | null;
      if (combo) {
        combo.value = lang;
        combo.dispatchEvent(new Event('change'));
        return true;
      }

      // Sometimes the translate widget lives inside an iframe; try to find the iframe and its select
      const iframes = Array.from(document.getElementsByTagName('iframe'));
      for (const iframe of iframes) {
        try {
          const doc = iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document);
          if (!doc) continue;
          const sel = doc.querySelector('select.goog-te-combo') as HTMLSelectElement | null;
          if (sel) {
            sel.value = lang;
            sel.dispatchEvent(new Event('change'));
            return true;
          }
        } catch (e) {
          // cross-origin iframes will throw; ignore
        }
      }
    } catch (e) {
      console.warn('applyGoogleCombo failed', e);
    }
    return false;
  }

  private reloadPreserveRoute() {
    try {
      const current = new URL(window.location.href);
      // Replace or set the _gt cache-buster param instead of appending duplicates
      current.searchParams.set('_gt', String(Date.now()));
      const newUrl = current.pathname + current.search + current.hash;
      // Force full navigation to new URL so the widget reads the updated cookie
      location.href = newUrl;
    } catch (e) {
      // Fallback to simple reload
      location.reload();
    }
  }

  private translatePage(targetLang: string) {
    if (typeof (window as any).google === 'undefined') {
      return;
    }

    const googleTranslateElement = (window as any).google.translate;
    if (googleTranslateElement && googleTranslateElement.TranslateService) {
      this.isTranslating.set(true);
      try {
        googleTranslateElement.TranslateService.getInstance().execute(
          document.documentElement,
          new googleTranslateElement.TranslateElement.TranslateService(),
          'pt',
          targetLang,
          () => {
            setTimeout(() => this.isTranslating.set(false), 500);
            // Protect brand after internal translate completes
            try {
              setTimeout(() => this.protectBrand(), 300);
            } catch (e) {}
          }
        );
      } catch (e) {
        // If the internal API fails, fallback to reloading so cookie state applies
        console.warn('Google Translate execute failed, falling back to reload', e);
        this.isTranslating.set(false);
        location.reload();
      }
    }
  }

  // Protect occurrences of the brand "Pilar Forte" by wrapping them in a non-translate element.
  // This scans text nodes and replaces matches with <span class="notranslate" translate="no">Pilar Forte</span>
  private protectBrand() {
    try {
      if (typeof document === 'undefined' || !document.body) return;
      const root = document.body;
      const regex = /Pilar Forte/g;

      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
      const nodes: Text[] = [];
      let node: Node | null = walker.nextNode();
      while (node) {
        const txt = node.nodeValue || '';
        if (regex.test(txt)) {
          nodes.push(node as Text);
        }
        node = walker.nextNode();
      }

      for (const textNode of nodes) {
        const parent = textNode.parentElement;
        if (!parent) continue;
        // Skip already-protected areas
        if (parent.closest && parent.closest('[translate="no"], .notranslate')) continue;
        if (['script', 'style', 'textarea', 'code', 'pre'].includes(parent.tagName.toLowerCase())) continue;

        const text = textNode.nodeValue || '';
        let match: RegExpExecArray | null;
        regex.lastIndex = 0;
        const frag = document.createDocumentFragment();
        let lastIndex = 0;
        while ((match = regex.exec(text)) !== null) {
          const idx = match.index;
          if (idx > lastIndex) {
            frag.appendChild(document.createTextNode(text.slice(lastIndex, idx)));
          }
          const span = document.createElement('span');
          span.className = 'notranslate';
          span.setAttribute('translate', 'no');
          span.textContent = match[0];
          frag.appendChild(span);
          lastIndex = idx + match[0].length;
        }
        if (lastIndex < text.length) {
          frag.appendChild(document.createTextNode(text.slice(lastIndex)));
        }
        if (frag.childNodes.length) {
          textNode.parentNode?.replaceChild(frag, textNode);
        }
      }
    } catch (e) {
      console.warn('protectBrand failed', e);
    }
  }

  private resetTranslation() {
    // Prefer removing the googtrans cookie and reloading to ensure original language
    this.removeGoogleCookie();
    location.reload();
  }

  private setGoogleCookie(from: string, to: string) {
    try {
      const value = `/${from}/${to}`;
      const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
      document.cookie = `googtrans=${value}; path=/; expires=${expires}`;
      // also try setting with domain
      try {
        const host = location.hostname;
        document.cookie = `googtrans=${value}; domain=${host}; path=/; expires=${expires}`;
      } catch (e) {
        // ignore domain set errors
      }
    } catch (e) {
      console.warn('Failed to set googtrans cookie', e);
    }
  }

  private removeGoogleCookie() {
    try {
      document.cookie = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      try {
        const host = location.hostname;
        document.cookie = `googtrans=; domain=${host}; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      } catch (e) {}
    } catch (e) {
      console.warn('Failed to remove googtrans cookie', e);
    }
  }

  // Simple synchronous translate for static content
  async t(text: string): Promise<string> {
    const lang = this.currentLang();
    if (lang === 'pt') return text;
    
    // Return text as-is; Google Translate will handle it via DOM
    return text;
  }
}

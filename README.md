
# Pilar Forte - Website

Este projeto foi desenvolvido em Angular e está configurado para publicação automática no GitHub Pages.

## Como Publicar (Grátis)

Para hospedar este site gratuitamente e usá-lo no Google Sites, siga estes passos:

### 1. No GitHub
1. Crie um novo repositório e certifique-se de que está definido como **Public** (Público).
2. Envie os ficheiros deste projeto para lá.
3. Vá ao separador **Settings** > **Pages**.
4. Em **Build and deployment** > **Source**, selecione **GitHub Actions**.
5. O GitHub irá detetar automaticamente o ficheiro `.github/workflows/deploy.yml` e começar a construir o site.
6. Aguarde uns minutos. Quando terminar, o link do seu site aparecerá no topo dessa página de definições.

### 2. No Google Sites
1. Abra o seu site no editor do Google Sites.
2. No menu da direita, clique em **Incorporar** (Embed).
3. Cole o URL que o GitHub lhe forneceu (ex: `https://o-seu-usuario.github.io/nome-do-repositorio/`).
4. Escolha a opção **Página inteira** se disponível, ou ajuste a janela para ocupar o espaço desejado.

## Desenvolvimento Local

Para correr o projeto no seu computador:

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   ng serve
   ```

3. Abra `http://localhost:4200` no browser.

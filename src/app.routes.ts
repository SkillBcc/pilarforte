
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ConstructionComponent } from './pages/services/construction/construction.component';
import { RenovationComponent } from './pages/services/renovation/renovation.component';
import { EngineeringComponent } from './pages/services/engineering/engineering.component';
import { ArchitectureComponent } from './pages/services/architecture/architecture.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'empresa', component: AboutComponent },
  { path: 'servicos', component: ServicesComponent },
  { path: 'servicos/construcao-raiz', component: ConstructionComponent },
  { path: 'servicos/remodelacao', component: RenovationComponent },
  { path: 'servicos/engenharia', component: EngineeringComponent },
  { path: 'servicos/arquitetura', component: ArchitectureComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'contactos', component: ContactComponent },
  { path: '**', redirectTo: '' }
];

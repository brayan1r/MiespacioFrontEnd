import { Routes } from '@angular/router';
import { ArquitectProfile } from './pages/private/arquitect-profile/arquitect-profile';
import { Billing } from './pages/private/billing/billing';
import { Projects } from './pages/private/projects/projects';
import { Quotation as PrivateQuotation } from './pages/private/quotation/quotation';
import { Home } from './pages/public/home/home';
import { Login } from './pages/public/login/login';
import { Register } from './pages/public/register/register';
import { ContactUs } from './pages/public/contact-us/contact-us';
import { Ourjob } from './pages/public/ourjob/ourjob';
import { ServicesPage } from './pages/public/services-page/services-page';
import { Quotation as PublicQuotation } from './pages/public/quotation/quotation';
import { ForgotPassword } from './pages/public/forgot-password/forgot-password';
import { beforeGuard } from './guards/before-guard';

export const routes: Routes = [
  // Rutas Públicas
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'forgot-password', component: ForgotPassword },
  { path: 'contact-us', component: ContactUs },
  { path: 'our-job', component: Ourjob },
  { path: 'services', component: ServicesPage },
  { path: 'quotation', component: PublicQuotation },

  // Rutas Privadas (Protegidas)
  {
    path: '',
    canActivate: [beforeGuard],
    children: [
      { path: 'profile', component: ArquitectProfile },
      { path: 'billing', component: Billing },
      { path: 'projects', component: Projects },
      { path: 'requested-quotes', component: PrivateQuotation },
    ],
  },

  // Redireccionamiento por defecto
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

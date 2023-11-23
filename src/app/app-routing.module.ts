import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { WelcomeComponent } from './pages/dashboard/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/welcome'
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: '',
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/error/error.module').then(m => m.ErrorModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

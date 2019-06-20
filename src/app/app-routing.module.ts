import { ContentComponent } from './pages/layout/content/content.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersAdminComponent } from './pages/admin/users/users.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: ContentComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'admin/users', component: UsersAdminComponent },
      { path: '**', redirectTo: '/dashboard' },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

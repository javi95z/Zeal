import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../layout/shared.module';
import { GenderIconComponent, LoadingComponent } from '../shared';
import { AdminComponent } from './admin.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { UsersAdminComponent } from './users/users.component';
import { ProfileComponent } from './users/profile/profile.component';
import { MaterialModule } from '../../material.module';
import { AuthGuard, AdminGuard } from '../../guards';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [ AuthGuard, AdminGuard ],
    children: [
      { path: 'users', component: UsersAdminComponent },
      { path: 'users/profile/:id', component: ProfileComponent },
      { path: '**', redirectTo: 'users' },
    ]
  }
];

@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    UsersAdminComponent,
    GenderIconComponent,
    LoadingComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    MaterialModule
  ]
})
export class AdminModule { }

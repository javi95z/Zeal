import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../layout/shared.module';
import { LoadingComponent } from '../shared';
import { AdminComponent } from './admin.component';
import { UsersAdminComponent } from './users/users.component';
import { MaterialModule } from '../../material.module';
import { AuthGuard, AdminGuard } from '../../guards';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [ AuthGuard, AdminGuard ],
    children: [
      { path: 'users', component: UsersAdminComponent },
      { path: '**', redirectTo: 'users' },
    ]
  }
];

@NgModule({
  declarations: [
    AdminComponent,
    UsersAdminComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    MaterialModule
  ]
})
export class AdminModule { }

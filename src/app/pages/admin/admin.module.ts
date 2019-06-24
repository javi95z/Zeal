import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule, MatCheckboxModule } from '@angular/material';
import { SharedModule } from '../layout/shared.module';
import { AdminComponent } from './admin.component';
import { UsersAdminComponent } from './users/users.component';
import { AuthGuard } from '../../guards/auth.guard';
import { AdminGuard } from '../../guards/admin.guard';

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
    UsersAdminComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatCheckboxModule
  ]
})
export class AdminModule { }

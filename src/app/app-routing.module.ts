import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {UserDashboardComponent} from './user-dashboard/user-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'user-info', pathMatch: 'full' },
  {path: 'user-info' , component: UserDashboardComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }

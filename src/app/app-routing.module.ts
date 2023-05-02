import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { SecondLayoutComponent } from './layout/second-layout/second-layout.component';

import { LoginComponent } from './page/login/login.component';
import { TaskComponent } from './page/task/task.component';
import { AboutComponent } from './page/about/about.component';
import { ContactComponent } from './page/contact/contact.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { UserComponent } from './page/user/user.component';

import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: SecondLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
        canActivate: [AuthGuard],
      }
    ]
  },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: AboutComponent
      },
      {
        path: 'task',
        component: TaskComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'user',
        component: UserComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ]
  },
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

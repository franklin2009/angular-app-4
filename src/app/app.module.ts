import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

/*
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AlertModule } from 'ngx-bootstrap/alert';
*/

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ContactComponent } from './page/contact/contact.component';
import { TaskComponent } from './page/task/task.component';
import { UserComponent } from './page/user/user.component';
import { AboutComponent } from './page/about/about.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { LoginComponent } from './page/login/login.component';

import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';

import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { SecondLayoutComponent } from './layout/second-layout/second-layout.component';

import { LoadingComponent } from './shared/tool/loading.component';

import { TaskService } from './shared/service/task.service';
import {  UserService } from './shared/service/user.service';


@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    TaskComponent,
    UserComponent,
    AboutComponent,
    NotFoundComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    MainLayoutComponent,
    SecondLayoutComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    /*ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    AlertModule.forRoot()*/
  ],
  providers: [TaskService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

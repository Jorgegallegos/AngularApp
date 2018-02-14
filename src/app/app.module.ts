import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { LoginComponent } from './auth/login/login.component';

import { AccountService } from './services/account.service';
import { HttpClientJsonpModule } from '@angular/common/http/src/module';
import { BugListComponent } from './bugs/bug-list/bug-list.component';
import { BugService } from './services/bug.service';
import { FromnowPipe } from './pipes/fromnow.pipe';
import { SeverityComponent } from './bugs/severity/severity.component';
import { BugDetailComponent } from './bugs/bug-detail/bug-detail.component';
import { BugGuard } from './guards/bug.guard';
import { AuthGuard } from './guards/auth.guard';
import { AddBugComponent } from './bugs/add-bug/add-bug.component';
import { BugsModule } from './bugs/bugs.module';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    BugListComponent,
    FromnowPipe,
    SeverityComponent,
    BugDetailComponent,
    AddBugComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'welcome',component:WelcomeComponent,canActivate:[AuthGuard]},
      {path:'login',component:LoginComponent},
      {path:'bugs',component:BugListComponent,canActivate:[AuthGuard]},
      {path:'bugs/:id',component:BugDetailComponent,canActivate:[BugGuard,AuthGuard]},
      {path:'addbug',component:AddBugComponent,canActivate:[AuthGuard]},
      {path:'',redirectTo:'welcome',pathMatch:'full'},
      {path:'***',redirectTo:'welcome',pathMatch:'full'}
    ],{useHash:false}),
    BugsModule
  ],
  providers: [AccountService,BugService,BugGuard,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

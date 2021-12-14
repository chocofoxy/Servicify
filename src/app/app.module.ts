import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from './auth/auth.interceptor';
import { ProfileComponent } from './pages/client/profile/profile.component';
import { SettingsComponent } from './pages/client/settings/settings.component';
import { PostComponent } from './pages/client/post/post.component';
import { RequestsComponent } from './pages/admin/requests/requests.component';
import { ReportsComponent } from './pages/admin/reports/reports.component';
import { FeedbacksComponent } from './pages/admin/feedbacks/feedbacks.component';
import { ClientsComponent } from './pages/admin/clients/clients.component';
import { WorkersComponent } from './pages/admin/workers/workers.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { IndexComponent } from './pages/index/index.component';
import { AuthComponent } from './pages/auth/auth.component';
import { ClientIndexComponent } from './pages/client/index/index.component';
import { AdminIndexComponent } from './pages/admin/index/index.component';
import { WorkerIndexComponent } from './pages/worker/index/index.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { HeaderComponent } from './components/header/header.component';
import { AdminLayoutComponent } from './layout/admin/admin.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    SettingsComponent,
    PostComponent,
    ClientIndexComponent,
    AdminIndexComponent,
    WorkerIndexComponent,
    RequestsComponent,
    ReportsComponent,
    FeedbacksComponent,
    ClientsComponent,
    WorkersComponent,
    LoginComponent,
    IndexComponent,
    AuthComponent,
    HeaderComponent,
    AdminLayoutComponent,
  ],
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    //ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

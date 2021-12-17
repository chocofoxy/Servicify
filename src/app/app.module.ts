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
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { MatCardModule } from '@angular/material/card';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PostFormComponent } from './components/post-form/post-form.component';
import { WorkerCardComponent } from './components/worker-card/worker-card.component';
import { MatSelectModule } from '@angular/material/select';
import { HeaderClientComponent } from './components/header-client/header-client.component';
import { ClientCardComponent } from './components/client-card/client-card.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { RequestDialogComponent } from './components/request-dialog/request-dialog.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { ReportUserComponent } from './components/report-user/report-user.component';
import { SendTicketComponent } from './components/send-ticket/send-ticket.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';


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
    CategoriesComponent,
    AddCategoryComponent,
    PostFormComponent,
    WorkerCardComponent,
    HeaderClientComponent,
    ClientCardComponent,
    PostCardComponent,
    FooterComponent,
    RequestDialogComponent,
    AddCommentComponent,
    ReportUserComponent,
    SendTicketComponent,
  ],
  imports: [
    MatChipsModule,
    MatMenuModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCardModule,
    MatPaginatorModule,
    MatListModule,
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
    },
    //{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

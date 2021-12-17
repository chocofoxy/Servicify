import { Component, NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdminGuard } from "./auth/admin.guard";
import { WorkerGuard } from "./auth/worker.guard";
import { GuestGuard } from "./auth/guest.guard";
import { AuthedGuard } from "./auth/authed.guard";
import { AuthComponent } from "./pages/auth/auth.component";
import { IndexComponent } from "./pages/index/index.component";
import { ClientIndexComponent } from "./pages/client/index/index.component";
import { ProfileComponent } from "./pages/client/profile/profile.component";
import { SettingsComponent } from "./pages/client/settings/settings.component";
import { LoginComponent } from "./pages/admin/login/login.component";
import { AdminIndexComponent } from "./pages/admin/index/index.component";
import { ClientsComponent } from "./pages/admin/clients/clients.component";
import { WorkersComponent } from "./pages/admin/workers/workers.component";
import { RequestsComponent } from "./pages/admin/requests/requests.component";
import { ReportsComponent } from "./pages/admin/reports/reports.component";
import { AdminLayoutComponent } from "./layout/admin/admin.component";
import { CategoriesComponent } from "./pages/admin/categories/categories.component";
import { FeedbacksComponent } from "./pages/admin/feedbacks/feedbacks.component";
import { WorkerIndexComponent } from "./pages/worker/index/index.component";


const routes: Routes = [
  { path: "", component: ClientIndexComponent, canActivate: [AuthedGuard] },
  { path: "home", component: ClientIndexComponent, canActivate: [AuthedGuard] },
  { path: "profile", component: ProfileComponent, canActivate: [AuthedGuard] },
  { path: "settings", component: SettingsComponent, canActivate: [AuthedGuard] },
  { path: "worker", component: WorkerIndexComponent, canActivate: [AuthedGuard] },
  //{ path: '', component: IndexComponent, canActivate: [GuestGuard] },
  { path: "auth", component: AuthComponent, canActivate: [GuestGuard] },
  {
    path: "admin/login",
    component: LoginComponent,
    canActivate: [GuestGuard],
  },
  {
    path: "admin",
    component: AdminLayoutComponent ,
    canActivate: [AuthedGuard],
    children: [
      { path: "home", component: AdminIndexComponent, canActivate: [AdminGuard] },
      { path: "clients", component: ClientsComponent, canActivate: [AdminGuard] },
      { path: "feedbacks", component: FeedbacksComponent, canActivate: [AdminGuard] },
      { path: "categories", component: CategoriesComponent, canActivate: [AdminGuard] },
      { path: "workers", component: WorkersComponent, canActivate: [AdminGuard] },
      { path: "requests", component: RequestsComponent, canActivate: [AdminGuard] },
      { path: "reports", component: ReportsComponent, canActivate: [AdminGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }


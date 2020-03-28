import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PagesRoutes } from "./PagesRoutes";
import { PagesComponent } from "./pages.component";
import { AuthGuard } from "../auth/auth-guard";

let adjustedPagesRoutes = PagesRoutes.map(
  ({ menuName, ...keepAttrs }) => keepAttrs
);

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    component: PagesComponent,
    children: [
      ...adjustedPagesRoutes,
      { path: "", redirectTo: "/consultas" },
      { path: "**", redirectTo: "/consultas" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}

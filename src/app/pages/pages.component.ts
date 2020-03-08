import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-pages",
  templateUrl: "./pages.component.html",
  styleUrls: ["./pages.component.scss"]
})
export class PagesComponent implements OnInit {
  sidebarIsHidden: boolean;
  isMobileSidebar: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.setSidebarAttrs(window.innerWidth);
  }

  onResize(): void {
    this.setSidebarAttrs(window.innerWidth);
  }

  setSidebarAttrs(width): void {
    if (width > 991) {
      this.sidebarIsHidden = false;
      this.isMobileSidebar = false;
    } else {
      this.sidebarIsHidden = true;
      this.isMobileSidebar = true;
    }
  }

  getClinicName(): string {
    return environment.clinicName;
  }

  showSidebar(): void {
    this.sidebarIsHidden = false;
  }

  hideSidebar(): void {
    this.sidebarIsHidden = true;
  }

  logout(): void {
    this.authService.logout();
  }

  getUsername(): string {
    return this.authService.getLoginId();
  }
}

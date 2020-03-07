import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-pages",
  templateUrl: "./pages.component.html",
  styleUrls: ["./pages.component.scss"]
})
export class PagesComponent implements OnInit {
  private sidebarIsHidden: boolean;
  private isMobileSidebar: boolean;

  constructor() {}

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

  showSidebar(): void {
    this.sidebarIsHidden = false;
  }

  hideSidebar(): void {
    this.sidebarIsHidden = true;
  }
}

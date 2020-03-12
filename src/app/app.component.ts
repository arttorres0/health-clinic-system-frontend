import { Component } from "@angular/core";
import { LoadingService } from "./loading/loading.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  loading: boolean;
  subscription: Subscription;

  constructor(private loadingService: LoadingService) {
    this.loading = false;
    this.subscription = this.loadingService
      .getLoadingBoolean()
      .subscribe(loading => {
        this.loading = loading;
      });
  }
}

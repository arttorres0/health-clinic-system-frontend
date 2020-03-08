import { Component, OnInit, Input } from "@angular/core";
import { Toast, ToastType } from "./Toast";
import { Subscription } from "rxjs";
import { Router, NavigationStart } from "@angular/router";
import { ToastService } from "./toast.service";

@Component({
  selector: "app-toast",
  templateUrl: "./toast.component.html",
  styleUrls: ["./toast.component.scss"]
})
export class ToastComponent implements OnInit {
  @Input() id = "default-toast";
  @Input() fade = true;

  toasts: Toast[] = [];
  toastSubscription: Subscription;
  routeSubscription: Subscription;

  constructor(private router: Router, private toastService: ToastService) {}

  ngOnInit() {
    this.toastSubscription = this.toastService
      .onToast(this.id)
      .subscribe(toast => {
        if (!toast.message) {
          return;
        }

        this.toasts.push(toast);
        setTimeout(() => this.removeToast(toast), 2000);
      });

    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.toastService.clear(this.id);
      }
    });
  }

  ngOnDestroy() {
    this.toastSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  removeToast(toast: Toast) {
    if (this.fade) {
      this.toasts.find(x => x === toast).fade = true;
      setTimeout(() => {
        this.toasts = this.toasts.filter(x => x !== toast);
      }, 250);
    } else {
      this.toasts = this.toasts.filter(x => x !== toast);
    }
  }

  cssClass(toast: Toast) {
    if (!toast) return;

    const classes = ["alert", "alert-dismissable"];

    const toastTypeClass = {
      [ToastType.Error]: "toast-element alert alert-danger",
      [ToastType.Success]: "toast-element alert alert-success"
    };

    classes.push(toastTypeClass[toast.type]);

    if (toast.fade) {
      classes.push("fade");
    }

    return classes.join(" ");
  }
}

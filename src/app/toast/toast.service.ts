import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { Toast, ToastType } from "./Toast";

@Injectable({
  providedIn: "root"
})
export class ToastService {
  private subject = new Subject<Toast>();
  private defaultId = "default-toast";

  onToast(id = this.defaultId): Observable<Toast> {
    return this.subject.asObservable().pipe(filter(x => x && x.id === id));
  }

  error(message: string) {
    this.toast(new Toast({ type: ToastType.Error, message }));
  }

  success(message: string) {
    this.toast(new Toast({ type: ToastType.Success, message }));
  }

  toast(toast: Toast) {
    toast.id = toast.id || this.defaultId;
    this.subject.next(toast);
  }

  clear(id = this.defaultId) {
    this.subject.next(new Toast({ id }));
  }
}

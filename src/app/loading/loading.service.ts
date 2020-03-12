import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LoadingService {
  private subject = new Subject<boolean>();

  constructor() {}

  setLoadingBoolean(isLoading): void {
    setTimeout(() => {
      this.subject.next(isLoading);
    }, 0);
  }

  getLoadingBoolean(): Observable<boolean> {
    return this.subject.asObservable();
  }
}

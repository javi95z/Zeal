import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LayoutService {
  private sidebarCollapsed: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private mobileNavCollapsed: BehaviorSubject<boolean> = new BehaviorSubject(false);

  getSidebar(): Observable<boolean> {
    return this.sidebarCollapsed.asObservable();
  }

  setSidebar(value: boolean) {
    this.sidebarCollapsed.next(value);
  }

  getMobileNav(): Observable<boolean> {
    return this.mobileNavCollapsed.asObservable();
  }

  setMobileNav(value: boolean) {
    this.mobileNavCollapsed.next(value);
  }
}

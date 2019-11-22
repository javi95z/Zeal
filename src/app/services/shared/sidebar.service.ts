import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SidebarService {
  private isCollapsed: BehaviorSubject<boolean> = new BehaviorSubject(false);

  getSidebarCollapsed(): Observable<boolean> {
    return this.isCollapsed.asObservable();
  }

  setSidebarCollapsed(value: boolean) {
    this.isCollapsed.next(value);
  }
}

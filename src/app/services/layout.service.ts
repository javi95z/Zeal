import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LayoutService {
  private sidebar: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private mobileNav: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private fullScreen: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private elem: any;

  constructor(@Inject(DOCUMENT) private document: any) {
    this.elem = document.documentElement;
  }

  getSidebar(): Observable<boolean> {
    return this.sidebar.asObservable();
  }

  setSidebar(value: boolean) {
    this.sidebar.next(value);
  }

  getMobileNav(): Observable<boolean> {
    return this.mobileNav.asObservable();
  }

  setMobileNav(value: boolean) {
    this.mobileNav.next(value);
  }

  getFullscreen(): Observable<boolean> {
    return this.fullScreen.asObservable();
  }
  setFullscreen(value: boolean) {
    value ? this.openFullscreen() : this.closeFullscreen();
    this.fullScreen.next(value);
  }

  /**
   * Open full screen depending on the browser
   */
  private openFullscreen = () =>
    this.document.documentElement.requestFullscreen() || null;

  /**
   * Close full screen depending on the browser
   */
  private closeFullscreen = () => this.document.exitFullscreen() || null;
}

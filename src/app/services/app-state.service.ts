import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  sidenavOpen$: Observable<boolean>;
  filterPanelOpen$: Observable<boolean>;

  private sidenavOpenSubject: BehaviorSubject<boolean>;
  private filterPanelOpenSubject: BehaviorSubject<boolean>;
  constructor() {
    this.sidenavOpenSubject = new BehaviorSubject(true);
    this.sidenavOpen$ = this.sidenavOpenSubject.asObservable();
    this.filterPanelOpenSubject = new BehaviorSubject(false);
    this.filterPanelOpen$ = this.filterPanelOpenSubject.asObservable();
  }

  openSidenav() {
    this.sidenavOpenSubject.next(true);
  }

  closeSidenav() {
    this.sidenavOpenSubject.next(false);
  }

  openFilterPanel() {
    this.filterPanelOpenSubject.next(true);
  }

  closeFilterPanel() {
    this.filterPanelOpenSubject.next(false);
  }
}

import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../services/app-state.service';
import { WindowSizeService, FullScreenWidthEnum } from '../services/window-size.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss']
})
export class TitleBarComponent implements OnInit {
  sideNavOpen: boolean;
  currentSize$: Observable<FullScreenWidthEnum>;

  constructor(private state: AppStateService, private windowSizeService: WindowSizeService) { }

  ngOnInit() {
    this.currentSize$ = this.windowSizeService.currentSize$;
    this.state.sidenavOpen$.subscribe((isOpen) => {
      this.sideNavOpen = isOpen;
    });
  }

  toggleMenu() {
    if (this.sideNavOpen) {
      this.state.closeSidenav();
    } else {
      this.state.openSidenav();
    }
  }

}

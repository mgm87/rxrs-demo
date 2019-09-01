import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { WindowSizeService, FullScreenWidths, FullScreenWidthEnum } from './services/window-size.service';
import { Observable } from 'rxjs';
import { AppStateService } from './services/app-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rxrs-demo';
  currentSize$: Observable<FullScreenWidthEnum>;
  sideNavOpen$: Observable<boolean>;
  sizes: FullScreenWidths;
  splitObj;
  constructor(private windowSizeService: WindowSizeService, private state: AppStateService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.sideNavOpen$ = this.state.sidenavOpen$;

    this.windowSizeService.sizes$.subscribe((size) => {
      if (size.xSmall) {
        this.state.closeSidenav();
      }

      this.sizes = size;
    });

    this.currentSize$ = this.windowSizeService.currentSize$;

  }
}

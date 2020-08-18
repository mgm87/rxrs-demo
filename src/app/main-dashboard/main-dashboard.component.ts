import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { WindowSizeService, FullScreenWidthEnum } from '../services/window-size.service';
import { Observable } from 'rxjs';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  viewState: Observable<MainDashboardViewState>;
  filterPanelOpen$: Observable<boolean>;

  constructor(private windowSizeService: WindowSizeService, private state: AppStateService) {}

  ngOnInit() {
    this.filterPanelOpen$ = this.state.filterPanelOpen$;
    this.viewState = combineLatest(
      this.windowSizeService.sizes$,
      this.windowSizeService.isMobileState,
      this.state.sidenavOpen$,
      this.state.filterPanelOpen$
    ).pipe(
      map(([sizes, isMobile, sidenavOpen, filtersOpen]) => {
        let viewToReturn: MainDashboardViewState;
        if (sizes.xSmall || sizes.small && sidenavOpen) {
          viewToReturn = {
            cards: [
              { title: 'Card 1', cols: 2, rows: 1 },
              { title: 'Card 2', cols: 2, rows: 1 },
              { title: 'Card 3', cols: 2, rows: 1 },
              { title: 'Card 4', cols: 2, rows: 1 }
            ],
            filterClass: FullScreenWidthEnum.xSmall,
            isMobile
          };
        } else if (sizes.small && !sidenavOpen && filtersOpen) {
          viewToReturn = {
            cards: [
              { title: 'Card 1', cols: 2, rows: 1 },
              { title: 'Card 2', cols: 2, rows: 1 },
              { title: 'Card 3', cols: 2, rows: 1 },
              { title: 'Card 4', cols: 2, rows: 1 }
            ],
            filterClass: FullScreenWidthEnum.medium,
            isMobile
          };
        } else if (sizes.medium && sidenavOpen && filtersOpen) {
          viewToReturn = {
            cards: [
              { title: 'Card 1', cols: 2, rows: 1 },
              { title: 'Card 2', cols: 2, rows: 1 },
              { title: 'Card 3', cols: 2, rows: 1 },
              { title: 'Card 4', cols: 2, rows: 1 }
            ],
            filterClass: FullScreenWidthEnum.medium,
            isMobile
          };
        } else {
          viewToReturn = {
            cards: [
              { title: 'Card 1', cols: 2, rows: 1 },
              { title: 'Card 2', cols: 1, rows: 1 },
              { title: 'Card 3', cols: 1, rows: 2 },
              { title: 'Card 4', cols: 1, rows: 1 }
            ],
            filterClass: FullScreenWidthEnum.medium,
            isMobile
          };
        }

        return viewToReturn;
      })
    );
  }

  openFilters() {
    this.state.openFilterPanel();
  }

  closeFilters() {
    this.state.closeFilterPanel();
  }
}

interface MainDashboardViewState {
  cards: Card[];
  filterClass: FullScreenWidthEnum;
  isMobile: boolean;
}

interface Card {
  title: string;
  cols: number;
  rows: number;
}

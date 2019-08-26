import { Component, OnInit } from '@angular/core';

import { WindowSizeService } from './services/window-size.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rxrs-demo';

  constructor(private windowSizeService: WindowSizeService) {}

  ngOnInit() {
    this.windowSizeService.sizes.subscribe((size) => {
      console.log(size);
    });
  }
}

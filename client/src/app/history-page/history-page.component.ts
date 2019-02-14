import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MaterialHelperService, MaterialModalInstance } from '../shared/services/materialHelperService';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, AfterViewInit, OnDestroy {
  isFilterVisible = false;

  @ViewChild('tooltipRef') tooltipRef: ElementRef;
  tooltip: MaterialModalInstance;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.tooltip = MaterialHelperService.initTooltip(this.tooltipRef);
  }

  ngOnDestroy() {
    this.tooltip.destroy();
  }

}

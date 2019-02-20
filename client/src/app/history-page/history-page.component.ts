import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MaterialHelperService, MaterialModalInstance } from '../shared/services/materialHelperService';
import { OrdersService } from '../shared/services/orders.service';
import { Subscription } from 'rxjs';
import { Order } from '../shared/models/entities.interface';
import { Filter } from '../shared/models/helper.interface';

const STEP = 2;

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, AfterViewInit, OnDestroy {
  isFilterVisible = false;

  @ViewChild('tooltipRef') tooltipRef: ElementRef;
  tooltip: MaterialModalInstance;

  offset = 0;
  limit = STEP;
  filterData: Filter = {};

  orders: Order[] = [];
  gettingOrders = false;
  noMoreOrders = false;

  sub$: Subscription;

  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    this.getAllOrders();
  }

  private getAllOrders() {
    const params = Object.assign({}, this.filterData, {
      offset: this.offset,
      limit: this.limit
    });
    this.gettingOrders = true;
    this.sub$ = this.ordersService.getAllOrders(params).subscribe(
      (orders: Order[]) => {
        this.orders = this.orders.concat(orders);
        this.gettingOrders = false;
        this.noMoreOrders = orders.length < STEP;
      }
    );
  }

  ngAfterViewInit() {
    this.tooltip = MaterialHelperService.initTooltip(this.tooltipRef);
  }

  ngOnDestroy() {
    this.tooltip.destroy();
    this.sub$.unsubscribe();
  }

  loadMore() {
    this.offset += STEP;
    this.getAllOrders();
  }

  applyFilter(filterData: Filter) {
    this.orders = [];
    this.offset = 0;
    this.filterData = filterData;
    this.getAllOrders();
  }

  isApplied(): boolean {
    return !!Object.keys(this.filterData).length;
  }
}

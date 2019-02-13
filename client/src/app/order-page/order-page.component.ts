import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MaterialHelperService, MaterialModalInstance } from '../shared/services/materialHelperService';
import { OrderService } from '../shared/services/order.service';
import { Order, OrderPosition } from '../shared/models/entities.interface';
import { OrdersService } from '../shared/services/orders.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  providers: [ OrderService ]
})
export class OrderPageComponent implements OnInit, AfterViewInit, OnDestroy {
  isRootPage = true;

  @ViewChild('orderModal') orderModal: ElementRef;
  modalWindow: MaterialModalInstance;

  constructor(private router: Router,
              private orderService: OrderService,
              private ordersService: OrdersService) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.isRootPage = this.router.url === '/order');
  }

  showModal() {
    this.modalWindow.open();
  }

  onModalSubmit() {
    const newOrder: Order = {
      list: this.orderService.list.map(item => {
        delete item._id;
        return item;
      })
    };
    this.ordersService.create(newOrder).subscribe(
      (order: Order) => MaterialHelperService.showToastMessage(`The order #${order.order} was added`),
      (error: HttpErrorResponse) => {
        MaterialHelperService.showToastMessage(error.message);
        this.orderService.clear();
      },
      () => this.modalWindow.close()

    );
  }

  ngAfterViewInit() {
    this.modalWindow = MaterialHelperService.initModal(this.orderModal);
  }

  ngOnDestroy() {
    this.modalWindow.destroy();
  }

  removePosition(orderPosition: OrderPosition) {
    const deletingConfirmed = window.confirm(`You are removing ${orderPosition.name}. Sure?`);
    if (deletingConfirmed) this.orderService.removeOrder(orderPosition);
  }
}

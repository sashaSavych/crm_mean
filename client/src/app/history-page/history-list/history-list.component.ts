import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { Order } from '../../shared/models/entities.interface';
import { MaterialHelperService, MaterialModalInstance } from '../../shared/services/materialHelperService';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements AfterViewInit, OnDestroy {
  @Input() orders: Order[] = [];
  @ViewChild('modalRef') modalRef: ElementRef;
  modal: MaterialModalInstance;

  currentOrder: Order;
  constructor() { }

  ngAfterViewInit() {
    this.modal = MaterialHelperService.initModal(this.modalRef);
  }

  computePrice(order: Order) {
    return order.list.reduce((total, item) => {
      return total + item.quantity * item.cost;
    }, 0);
  }

  selectOrder(order: Order) {
    this.currentOrder = order;
    this.modal.open();
  }

  ngOnDestroy() {
    this.modal.destroy();
  }

  closeModal() {
    this.modal.close();
  }
}

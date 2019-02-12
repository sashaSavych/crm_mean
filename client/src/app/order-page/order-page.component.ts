import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MaterialHelperService, MaterialModalInstance } from '../shared/services/materialHelperService';
import { OrderService } from '../shared/services/order.service';

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
              private orderService: OrderService) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.isRootPage = this.router.url === '/order');
  }

  showModal() {
    this.modalWindow.open();
  }

  onModalSubmit() {
    this.modalWindow.close();
  }

  ngAfterViewInit() {
    this.modalWindow = MaterialHelperService.initModal(this.orderModal);
  }

  ngOnDestroy() {
    this.modalWindow.destroy();
  }
}

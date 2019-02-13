import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PositionsService } from '../../shared/services/positions.service';
import { Observable } from 'rxjs';
import { Position } from '../../shared/models/entities.interface';
import { map, switchMap } from 'rxjs/operators';
import { OrderService } from '../../shared/services/order.service';
import { MaterialHelperService } from '../../shared/services/materialHelperService';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.scss']
})
export class OrderPositionsComponent implements OnInit {
  positions$: Observable<Position[]>;

  constructor(private route: ActivatedRoute,
              private positionsService: PositionsService,
              private orderService: OrderService) { }

  ngOnInit() {
    this.positions$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.positionsService.getAllByCategoryId(params['id']);
      }),
      map((positions: Position[]) => {
        return positions.map(position => {
          position.quantity = 1;
          return position;
        })
      })
    );
  }

  addOrder(position: Position): void {
    MaterialHelperService.showToastMessage(`Added ${position.quantity} orders`);
    this.orderService.addOrder(position);
  }
}

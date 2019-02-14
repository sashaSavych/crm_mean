import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../shared/models/entities.interface';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit {
  @Input() orders: Order[] = [];

  constructor() { }

  ngOnInit() {
  }

}

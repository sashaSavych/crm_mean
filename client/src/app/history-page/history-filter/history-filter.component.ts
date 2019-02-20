import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';
import { Filter } from '../../shared/models/helper.interface';
import { MaterialDatepicker, MaterialHelperService } from '../../shared/services/materialHelperService';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements AfterViewInit, OnDestroy {
  @Output() onFilter: EventEmitter<Filter> = new EventEmitter<Filter>();
  order: number;
  startDatepicker: MaterialDatepicker;
  endDatepicker: MaterialDatepicker;

  @ViewChild('start') startRef: ElementRef;
  @ViewChild('end') endRef: ElementRef;

  isValid = true;

  constructor() { }

  ngAfterViewInit() {
    this.startDatepicker = MaterialHelperService.initDatepicker(this.startRef, this.validateDate.bind(this));
    this.endDatepicker = MaterialHelperService.initDatepicker(this.endRef, this.validateDate.bind(this));
  }

  validateDate() {
    if (!this.startDatepicker.date || !this.endDatepicker.date) {
      this.isValid = false;
    } else {
      this.isValid = this.startDatepicker.date < this.endDatepicker.date;
    }
  }

  submitFilter() {
    const filterData: Filter = {};
    if (this.order) filterData.order = this.order;
    if (this.startDatepicker.date) filterData.start = this.startDatepicker.date;
    if (this.endDatepicker.date) filterData.end = this.endDatepicker.date;
    this.onFilter.emit(filterData);
  }

  ngOnDestroy() {
    this.startDatepicker.destroy();
    this.endDatepicker.destroy();
  }
}


import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PositionsService } from '../../../shared/services/positions.service';
import { Position } from '../../../shared/models/entities.interface';
import { MaterialHelperService, MaterialModalInstance } from '../../../shared/services/materialHelperService';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseMessage } from '../../../shared/models/helper.interface';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() categoryId: string;

  positions: Position[];
  currentPositionId: string;
  loading = true;
  form: FormGroup;

  @ViewChild('positionModal') positionModal: ElementRef;
  private modalWindow: MaterialModalInstance;

  constructor(private positionsService: PositionsService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      cost: new FormControl(null, [Validators.required])
    });

    this.positionsService.getAllByCategoryId(this.categoryId).subscribe(
      positions => {
        this.positions = positions;
        this.loading = false;
      }
    )
  }

  ngAfterViewInit() {
    this.modalWindow = MaterialHelperService.initModal(this.positionModal);
  }

  ngOnDestroy() {
    this.modalWindow.destroy();
  }

  onSelectPosition(position: Position) {
    this.currentPositionId = position._id;
    this.form.patchValue({
      name: position.name,
      cost: position.cost
    });
    this.modalWindow.open();
    MaterialHelperService.updateTextFields();
  }

  onAddPosition() {
    this.currentPositionId = null;
    this.form.reset({
      name: null,
      cost: null
    });
    this.modalWindow.open();
    MaterialHelperService.updateTextFields();
  }

  onCancel() {
    this.modalWindow.close();
  }

  onSubmit(): void {
    this.form.disable();
    const newPosition: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId
    };

    if (this.currentPositionId) {
      newPosition._id = this.currentPositionId;
      this.positionsService.update(newPosition).subscribe(
        (position: Position) => {
          const updatedIndex = this.positions.findIndex(p => position._id === p._id);
          this.positions[updatedIndex] = position;
          MaterialHelperService.showToastMessage('The position was saved.');
        },
        (error: HttpErrorResponse) => MaterialHelperService.showToastMessage(error.message),
        () => this.onComplete()
      )
    } else {
      this.positionsService.create(newPosition).subscribe(
        (position: Position) => {
          MaterialHelperService.showToastMessage('The position was created.');
          this.positions.push(position);
        },
        (error: HttpErrorResponse) => MaterialHelperService.showToastMessage(error.message),
        () => this.onComplete()
      )
    }
  }

  private onComplete() {
    this.form.enable();
    this.form.reset() ;
    this.modalWindow.close();
  }

  onDeletePosition(event: Event, position: Position) {
    event.stopPropagation();
    const deleteConfirmed = window.confirm(`You are removing position ${position.name}. Sure?`);
    if (deleteConfirmed) {
      this.positionsService.delete(position._id).subscribe(
        (result: ResponseMessage) => {
          const deletedIndex = this.positions.findIndex(p => p._id === position._id);
          this.positions.splice(deletedIndex, 1);
          MaterialHelperService.showToastMessage(result.message);
        },
        (error: HttpErrorResponse) => MaterialHelperService.showToastMessage(error.message)
      )
    }
  }
}

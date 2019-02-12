import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { CategoriesService } from '../../shared/services/categories.service';
import { of } from 'rxjs';
import { Category } from '../../shared/models/entities.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { MaterialHelperService } from '../../shared/services/materialHelperService';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {
  isNew = true;
  form: FormGroup;

  constructor(private route: ActivatedRoute,
              private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required])
    });
    this.form.disable();

    this.route.params.pipe(
      switchMap((params: Params) => {
        if(params['id']) {
          this.isNew = false;
          return this.categoriesService.getOneById(params['id']);
        } else {
          return of(null);
        }
      })
    ).subscribe(
      (category: Category) => {
        if (category) {
          this.form.enable();
          this.form.patchValue({
            name: category.name
          });
          MaterialHelperService.updateTextFields();
        }
      },
      (error: HttpErrorResponse) => MaterialHelperService.showToastMessage(error.message)
    );
  }

  onSubmit() {

  }

}

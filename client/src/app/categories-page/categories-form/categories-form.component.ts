import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { CategoriesService } from '../../shared/services/categories.service';
import { Observable, of } from 'rxjs';
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
  currentFile: File;
  currentFilePreview = '';
  currentCategory: Category;

  @ViewChild('pictureInput') pictureInput: ElementRef;

  constructor(private route: ActivatedRoute,
              private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required])
    });

    this.route.params.pipe(
      switchMap((params: Params) => {
        if(params['id']) {
          this.isNew = false;
          return this.categoriesService.getOneById(params['id']);
        } else {
          return of(null);
        }
      }),
      tap(() => this.form.disable())
    ).subscribe(
      (category: Category) => {
        this.form.enable();
        if (category) {
          this.currentCategory = category;
          this.form.patchValue({
            name: category.name
          });
          this.currentFilePreview = category.imageSrc;
          MaterialHelperService.updateTextFields();
        }
      },
      (error: HttpErrorResponse) => MaterialHelperService.showToastMessage(error.message)
    );
  }

  onSubmit() {
    let obs$: Observable;
    if (this.isNew) {
      obs$ = this.categoriesService.create(this.form.value.name, this.currentFile);
    } else {
      obs$ =this.categoriesService.update(this.currentCategory._id, this.form.value.name, this.currentFile);
    }
    obs$.pipe(
      tap(() => this.form.enable())
    ).subscribe(
      (category: Category) => {
        this.currentCategory = category;
        MaterialHelperService.showToastMessage('The changes were saved.')
      },
      (error: HttpErrorResponse) => MaterialHelperService.showToastMessage(error.message)
    )
  }

  pictureInputClick() {
    this.pictureInput.nativeElement.click();
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    this.currentFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.currentFilePreview = <string>reader.result;
    };
    reader.readAsDataURL(file);
  }
}

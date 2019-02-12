import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../shared/models/entities.interface';
import { CategoriesService } from '../../shared/services/categories.service';

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.scss']
})
export class OrderCategoriesComponent implements OnInit {
  categories$: Observable<Category[]>;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.categories$ = this.categoriesService.getAll();
  }
}

import { Component, OnInit } from '@angular/core';
import { CATEGORY } from 'src/app/common/apiRoutes';
import { ERROR_MESSAGE } from 'src/app/common/errorMessage';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categoryList;
  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.getCategoryList();
  }

  /**
   * @purpose Get Category List
   */
  async getCategoryList() {
    this.apiService.startLoader();
    const result: any = await this.apiService.get(CATEGORY.GET);
    this.categoryList = result.data;
  }
}

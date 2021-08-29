import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CATEGORY, CONTENT } from 'src/app/common/apiRoutes';
import { ERROR_MESSAGE } from 'src/app/common/errorMessage';
import { ApiService } from 'src/app/shared/services/api.service';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-add-edit-content',
  templateUrl: './add-edit-content.component.html',
  styleUrls: ['./add-edit-content.component.scss']
})
export class AddEditContentComponent implements OnInit {
  isLoading = false;
  error: any = null;
  form: FormGroup;
  categoryList;
  messageList: any = {};
  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private formService: FormService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.contentFormInit();
    this.getErrorMessage();
    this.getCategoryList();
  }

  /**
  * @purpose To Form Initialize
  */
  contentFormInit() {
    this.form = this.formBuilder.group({
      content: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
  }

  /**
  * @purpose To get all static error message
  */
  getErrorMessage() {
    this.messageList.content = {
      required: ERROR_MESSAGE.CONTENT.REQUIRED.CONTENT,
    };
    this.messageList.category = {
      required: ERROR_MESSAGE.CONTENT.REQUIRED.CATEGORY,
    };
  }

  /**
   * @purpose Get Category List
   */
  async getCategoryList() {
    this.apiService.startLoader();
    const result: any = await this.apiService.get(CATEGORY.GET);
    console.log(result);
    this.categoryList = result.data;
  }

  /**
   * @purpose To Add New Category
   */
  async submit() {
    this.formService.markFormGroupTouched(this.form);
    if (this.form.valid) {
      const requestBody = this.form.value;
      requestBody.category = +requestBody.category;
      console.log(requestBody);
      this.apiService.startLoader();
      const result: any = await this.apiService.post(CONTENT.ADD, requestBody);
      console.log(result);

      this.apiService.success(result.message);
      this.router.navigate(['/content']);
    }
  }
}

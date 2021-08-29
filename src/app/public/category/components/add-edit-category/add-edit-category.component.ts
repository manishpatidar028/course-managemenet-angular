import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CATEGORY } from 'src/app/common/apiRoutes';
import { ERROR_MESSAGE } from 'src/app/common/errorMessage';
import { ApiService } from 'src/app/shared/services/api.service';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss']
})
export class AddEditCategoryComponent implements OnInit {
  isLoading = false;
  error: any = null;
  form: FormGroup;
  messageList: any = {};

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private formService: FormService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.categoryFormInit();
    this.getErrorMessage();
  }

  /**
  * @purpose To Form Initialize
  */
  categoryFormInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  /**
  * @purpose To get all static error message
  */
  getErrorMessage() {
    this.messageList.name = {
      required: ERROR_MESSAGE.CATEGORY.REQUIRED.NAME,
    };
  }

  /**
   * @purpose To Add New Category
   */
  async submit() {
    this.formService.markFormGroupTouched(this.form);
    if (this.form.valid) {
      const requestBody = this.form.value;
      this.apiService.startLoader();
      const result: any = await this.apiService.post(CATEGORY.ADD, requestBody);
      this.apiService.success(result.message);
      this.router.navigate(['/category']);
    }
  }

}


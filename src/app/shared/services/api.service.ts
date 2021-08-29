import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { ERROR_HANDLER_MESSAGE, LOCAL_STORAGE_KEYS } from 'src/app/common/constant';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private hostUrl = environment.API_URL;
  constructor(
    public http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService,
    private ngxLoader: NgxSpinnerService,
  ) { }

  async getHeader(headerOptions, doNotSendAuthorizationParam) {
    const headerParams = { Authorization: '' };
    const token: any = await this.localStorageService.getDataFromIndexedDB(LOCAL_STORAGE_KEYS.TOKEN);

    /* START -> Used for multilingual */
    const lang: any = await this.localStorageService.getDataFromIndexedDB(LOCAL_STORAGE_KEYS.LANGUAGE);
    if (lang) {
      headerParams['X-L10N-Locale'] = lang;
    } else {
      headerParams['X-L10N-Locale'] = 'en';
    }
    /* END */

    if (doNotSendAuthorizationParam !== true && token) {
      headerParams.Authorization = `Bearer ${token}`;
    }
    if (headerOptions) {
      Object.assign(headerParams, headerOptions);
    }
    const headers = new HttpHeaders(headerParams);
    return { headers };
  }

  post(
    url: string, body: any, doNotSendAuthorizationParam: boolean = false, headerOptions: any = {}, loaderContinue?) {
    return new Promise(async (resolve, reject) => {
      const options = await this.getHeader(headerOptions, doNotSendAuthorizationParam);
      this.http.post(`${this.hostUrl}${url}`, body, options).pipe(map((res) => {
        if (!loaderContinue) {
          this.stopLoader();
        }
        return res;
      })).subscribe((res) => {
        resolve(res);
      }, (err) => {
        this.handleError(err);
        reject(err);
      });
    });
  }

  get(url: string, doNotSendAuthorizationParam: boolean = false, headerOptions: any = {}, loaderContinue?) {
    return new Promise(async (resolve, reject) => {
      const options = await this.getHeader(headerOptions, doNotSendAuthorizationParam);
      this.http.get(`${this.hostUrl}${url}`, options).pipe(map((res) => {
        if (!loaderContinue) {
          this.stopLoader();
        }
        return res;
      }))
        .subscribe((res) => {
          resolve(res);
        }, (err) => {
          this.handleError(err);
          reject(err);
        });
    });
  }

  async handleError(err) {
    if (err.status === 400) {
      this.error(err.error.error.message);
    } else if (err.status === 404) {
      this.error(err.error.error.message);
    } else if (err.status === 401) {
      this.error(err.error.error.message);
      this.localStorageService.clearDataFromIndexedDB();
      this.router.navigate(['/']);
    } else if (err.status === 412) {
      this.error(err.error.error.message);
    } else if (err.status === 422) {
      this.error(err.error.error.message);
    } else if (err.status === 500) {
      this.error(ERROR_HANDLER_MESSAGE.INTERNAL_SERVER_ERROR);
    } else if (err.status === 0) {
      this.error(ERROR_HANDLER_MESSAGE.SERVER_ERROR_OR_NO_INTERNET);
    }
  }
  error(message) {
    this.stopLoader();
    Swal.fire({
      title: ERROR_HANDLER_MESSAGE.ERROR_TITLE,
      text: message,
      icon: 'error',
      timer: 3000,
      confirmButtonText: ERROR_HANDLER_MESSAGE.OKAY_TEXT
    });
  }

  async success(message) {
    this.stopLoader();
    Swal.fire({
      title: ERROR_HANDLER_MESSAGE.SUCCESS_TITLE,
      text: message,
      icon: 'success',
      timer: 3000,
      confirmButtonText: ERROR_HANDLER_MESSAGE.OKAY_TEXT
    });
  }

  async warning(message) {
    this.stopLoader();
    Swal.fire({
      title: ERROR_HANDLER_MESSAGE.WARNING_TITLE,
      text: message,
      icon: 'warning',
      timer: 3000,
      confirmButtonText: ERROR_HANDLER_MESSAGE.OKAY_TEXT
    });
  }

  startLoader() {
    this.ngxLoader.show();
  }

  stopLoader() {
    this.ngxLoader.hide();
  }

}

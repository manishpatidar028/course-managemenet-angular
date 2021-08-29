import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SocialAuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { ApiService } from 'src/app/shared/services/api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  error: any = null;
  loginForm: FormGroup;
  constructor(
    private authService: SocialAuthService,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
  }

  /**
  * @purpose To get all static error message
  */
  async signInWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
      console.log(data)
      this.apiService.startLoader();
    });
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { ApiService } from './services/api.service';
import { LocalStorageService } from './services/local-storage.service';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ValidationMessageComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ValidationMessageComponent
  ],
  providers: [
    ApiService,
    LocalStorageService,
  ]
})
export class SharedModule { }

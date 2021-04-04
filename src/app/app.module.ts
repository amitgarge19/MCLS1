import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { UserService } from './user.service';
import { CustomerService } from './customer.service';

import { filterPipe } from './filter.pipe';

import { NgxSpinnerModule } from "ngx-spinner";

import { DataTablesModule } from 'angular-datatables';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button'
import { ToastrModule, ToastNoAnimationModule } from 'ngx-toastr';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { PanelComponent } from './panel/panel.component';
import { ErrorComponent } from './error/error.component';
import { ProfileComponent } from './profile/profile.component';

import { FranFormComponent } from './fran-form/fran-form.component';
import { FranBasicFormComponent } from './fran-basic-form/fran-basic-form.component';
import { FranFormEditComponent } from './fran-form-edit/fran-form-edit.component';

import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustBasicFormComponent } from './cust-basic-form/cust-basic-form.component';
import { CustomerAdditionalComponent } from './customer-additional/customer-additional.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { FranProfileComponent } from './fran-profile/fran-profile.component';
import { EmiComponent } from './emi/emi.component';
import { LeadsComponent } from './leads/leads.component';
import { FranchiseesComponent } from './franchisees/franchisees.component';
import { SidebarNavbarComponent } from './sidebar-navbar/sidebar-navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarAndFooterComponent } from './navbar-and-footer/navbar-and-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    filterPipe,
    LoginComponent,
    SignupComponent,
    PanelComponent,
    ErrorComponent,
    ProfileComponent,
    FranFormComponent,
    FranBasicFormComponent,
    FranFormEditComponent,
    CustomerEditComponent,
    CustBasicFormComponent,
    CustomerAdditionalComponent,
    CustomerProfileComponent,
    FranProfileComponent,
    EmiComponent,
    LeadsComponent,
    FranchiseesComponent,
    SidebarNavbarComponent,
    FooterComponent,
    NavbarAndFooterComponent    
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    DataTablesModule,
    BackButtonDisableModule.forRoot({ preserveScrollPosition: true }),
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
    NgxSliderModule,
    RouterModule.forRoot([

      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'signup', component: SignupComponent },

      { path: 'panel', component: PanelComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'leads', component: LeadsComponent },
      { path: 'franchisees', component: FranchiseesComponent },

      { path: 'emi', component: EmiComponent },

      { path: 'franbasicforms', component: FranBasicFormComponent },
      { path: 'franaddionform', component: FranFormComponent },
      { path: 'franProfileEdit/:FranchiseeId', component: FranFormEditComponent },
      { path: 'franProfile/:FranchiseeId', component: FranProfileComponent },

      { path: 'addCustomerBasic', component: CustBasicFormComponent },
      { path: 'addCustAdditonal/:custId', component: CustomerAdditionalComponent },
      { path: 'custProfile/:custId', component: CustomerProfileComponent },
      { path: 'custEdit/:custId', component: CustomerEditComponent },

      { path: 'error/:error_number', component: ErrorComponent },
      { path: '*', component: LoginComponent },
      { path: '**', component: LoginComponent }
    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [UserService, CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
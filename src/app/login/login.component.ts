import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from "ng2-cookies";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: any;
  public password: any;

  constructor(public router: Router, private toastr: ToastrService, public userService: UserService) { }

  ngOnInit(): void {
  }
  public goToSignUp: any = () => {
    this.router.navigate(['/signup']);
  } 

  public loginFunction: any = () => {

    if (!this.email)
      this.toastr.warning('enter email')

    else if (!this.password)
      this.toastr.warning('enter password')

    else {

      let data = {
        email: this.email,
        password: this.password
      }

      this.userService.loginFunction(data)
        .subscribe((apiResponse) => {

          if (apiResponse.status === 200) {
            console.log(apiResponse)

            Cookie.set('authToken', apiResponse.data.authToken);

            Cookie.set('FranchiseeId', apiResponse.data.FranchiseeDetails.FranchiseeId);

            Cookie.set('FranchiseeName', apiResponse.data.FranchiseeDetails.firstName + ' ' + apiResponse.data.FranchiseeDetails.lastName);

            Cookie.set('userType', apiResponse.data.FranchiseeDetails.userType);

            this.userService.setUserInfoInLocalStorage(apiResponse.data.FranchiseeDetails)
            
            this.router.navigate(['/panel'])

          } else
            this.toastr.error(apiResponse.message)

        }, (err) => {
          this.router.navigate(['/error/',500]);
        });
    } // end condition
  }
}
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public firstName: any;
  public middleName: any;
  public lastName: any;
  public mobileNumber: any;
  public email: any;
  public password: any;
  public cnfPassword: any;

  constructor(public router: Router, public toastr: ToastrService, public userService: UserService) { }

  ngOnInit(): void {
  }
  public goToLogin: any = () => {
    this.router.navigate(['/login']);
  }

  public signUpFunction: any = () => {
    if (!this.firstName) {
      this.toastr.warning('enter first name')


    } else if (!this.middleName) {
      this.toastr.warning('enter middle name')

    } else if (!this.lastName) {
      this.toastr.warning('enter last name')

    } else if (!this.mobileNumber) {
      this.toastr.warning('enter mobile number')

    } else if (!this.email) {
      this.toastr.warning('enter email')

    } else if (!this.password) {
      this.toastr.warning('enter password')

    } else if (this.password != this.cnfPassword) {
      this.toastr.error('Passwords do not match');
    }

    else {

      let data = {
        firstName: this.firstName,
        middleName: this.middleName,
        lastName: this.lastName,
        mobile: this.mobileNumber,
        email: this.email,
        password: this.password
      }

      console.log(data);

      this.userService.signUpFunction(data).subscribe((apiResponse) => {

        console.log(apiResponse);

        if (apiResponse.status === 200) {

          this.toastr.success('User created successfully.', 'Success!');

          setTimeout(() => {

            this.goToLogin();

          }, 2000);

        } else
          this.toastr.error(apiResponse.message);

      }, (err) => {

        this.toastr.error('some error occured');
      });
    }
  }
}
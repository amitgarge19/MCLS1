import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../user.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { interval, Subscription } from "rxjs";
import { Options, LabelType } from '@angular-slider/ngx-slider';


@Component({
  selector: 'app-emi',
  templateUrl: './emi.component.html',
  styleUrls: ['./emi.component.css']
})
export class EmiComponent implements OnInit {

  private updateSubscription: Subscription;

  public authToken: any;
  public FranchiseeDetails: any;
  public FranchiseeId: any;
  public FranchiseeName: any;
  public UserType: any;

  public visible: boolean = true;

  constructor(public router: Router, public toastr: ToastrService, public userService: UserService) {
    this.updateSubscription = interval(1000).subscribe(
      (val) => {
        this.checkStatus()
      }
    );
    this.authToken = Cookie.get('authToken');
    this.FranchiseeDetails = this.userService.getUserInfoFromLocalstorage();
    this.FranchiseeId = Cookie.get('FranchiseeId');
    this.FranchiseeName = Cookie.get('FranchiseeName');
    this.UserType = Cookie.get('userType');

    console.log(this.FranchiseeId, this.FranchiseeName, this.UserType)

    //this.checkStatus();    
  }

  ngOnInit() {
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload')
      location.reload()
    } else {
      localStorage.removeItem('foo')
    }
  }

  public checkStatus: any = () => {

    if (Cookie.get('authToken') === undefined || Cookie.get('authToken') === '' || Cookie.get('authToken') === null) {

      this.router.navigate(['/']);
      return false;

    } else
      return true;

  }

  public goToProfile: any = () => {
    this.router.navigate(['/profile'])
  }

  public goToTables: any = () => {
    this.router.navigate(['/tables'])
  }

  public goToAddCustBasicDetails: any = () => {
    this.router.navigate(['/addCustomerBasic']);
  }

  public logout: any = () => {
    this.userService.logout()
      .subscribe((apiResponse) => {

        if (apiResponse.status === 200) {

          console.log("logout called");

          this.router.navigate(['/']);

          Cookie.delete('authToken');

          Cookie.delete('FranchiseeId');

          Cookie.delete('FranchiseeName');

          Cookie.delete('userType');

        } else {
          this.toastr.error(apiResponse.message)

        } // end condition

      }, (err) => {
        this.toastr.error('some error occured')
      });
  }
}
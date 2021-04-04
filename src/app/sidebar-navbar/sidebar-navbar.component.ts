import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../user.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { interval, Subscription } from "rxjs";

@Component({
  selector: 'app-sidebar-navbar',
  templateUrl: './sidebar-navbar.component.html',
  styleUrls: ['./sidebar-navbar.component.css']
})
export class SidebarNavbarComponent implements OnInit {

  private updateSubscription: Subscription;
  public authToken: any;
  public FranchiseeDetails: any;
  public FranchiseeId: any;
  public FranchiseeName: any;
  public UserType: any;
  public imageUrl: string;
  public ProfilePicture: any;
  public flag: number = 0;

  public visible: boolean = true;

  constructor(public router: Router, public toastr: ToastrService, public userService: UserService, public spinner: NgxSpinnerService) { }

  ngOnInit() {


    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);

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
    this.imageUrl = this.getProfilePicture();
  }

  public checkStatus: any = () => {

    if (Cookie.get('authToken') === undefined || Cookie.get('authToken') === '' || Cookie.get('authToken') === null) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  } // end checkStatus */

  public getProfilePicture: any = () => {
    this.userService.getProfilePicture(this.FranchiseeId).subscribe(
      data => {
        console.log("logging data");
        console.log(data);
        this.ProfilePicture = data["data"];
        console.log(this.ProfilePicture);
        this.imageUrl = this.ProfilePicture.url;
      },
      error => {
        console.log("Some error occured");
        console.log(error.errorMessage);
      }
    )
  }

  public goToProfile: any = () => {
    this.router.navigate(['/profile'])
  }

  public goToFranchisees: any = () => {
    this.router.navigate(['/franchisees'])
  }

  public goToLeads: any = () => {
    this.router.navigate(['/leads'])
  }

  public goToAddCustBasicDetails: any = () => {
    this.router.navigate(['/addCustomerBasic']);
  }

  public goToEMiCalculator: any = () => {
    this.router.navigate(['/emi']);
  }

  public goToDashBoard: any = () => {
    this.router.navigate(['/panel']);
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
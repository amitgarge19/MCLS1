import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../user.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { interval, Subscription } from "rxjs";

declare var jQuery: any;

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})

export class PanelComponent implements OnInit, OnChanges {

  private updateSubscription: Subscription;

  public authToken: any;
  public FranchiseeDetails: any;
  public FranchiseeId: any;
  public FranchiseeName: any;
  public UserType: any;
  public flag: number = 0;


  public visible: boolean = true;

  constructor(public router: Router, public toastr: ToastrService, public userService: UserService, public spinner: NgxSpinnerService) { }
  ngOnChanges(changes: SimpleChanges): void {
    jQuery().LoadAll();
  }

  ngOnInit() {

    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload')
      location.reload()
    } else {
      localStorage.removeItem('foo')
    }
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);

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
  }


  public checkStatus: any = () => {

    if (Cookie.get('authToken') === undefined || Cookie.get('authToken') === '' || Cookie.get('authToken') === null) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  } // end checkStatus */

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
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from "../customer.service";
import { UserService } from "../user.service";
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {

  public authToken: any;
  public FranchiseeName: any;
  public FranchiseeId: any;
  public UserType: any;

  public custId: any;
  public currentCustomer: any;
  public currentCustOccupation: any;
  public currentCustFinancial: any;
  public currentCustBank: any;
  public currentCustCC: any;
  public currentCustIns: any;
  public currentCustProperty: any;
  public currentCustExtLoan: any;
  public currentCustLoanReq: any;
  public currentcustLoanAmt: any;

  constructor(private _route: ActivatedRoute, public router: Router, public toastr: ToastrService, public userService: UserService, public customerService: CustomerService) { }

  ngOnInit(): void {
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload')
      location.reload()
    } else {
      localStorage.removeItem('foo')
    }
    this.authToken = Cookie.get('authToken');
    this.FranchiseeName = Cookie.get('FranchiseeName');
    this.FranchiseeId = Cookie.get('FranchiseeId');
    this.UserType = Cookie.get('userType');

    this.custId = this._route.snapshot.paramMap.get('custId');
    console.log(this.custId);

    this.customerService.getCustomerBasicById(this.custId).subscribe(
      data => {
        console.log(data);
        this.currentCustomer = data["data"];
      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage);
      }
    )

    this.customerService.getCustomerOccupationalDetails(this.custId).subscribe(
      data => {
        console.log(data);
        this.currentCustOccupation = data["data"];
      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage);
      }
    )    

    this.customerService.getCustomerFinancialDetails(this.custId).subscribe(
      data => {
        console.log(data);
        this.currentCustFinancial = data["data"];
      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage);
      }
    )

    this.customerService.getCustomerBankDetails(this.custId).subscribe(
      data => {
        console.log(data);
        this.currentCustBank = data["data"];
      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage);
      }
    )

    this.customerService.getCustomerExistLoanDetails(this.custId).subscribe(
      data => {
        console.log(data);
        this.currentCustExtLoan = data["data"];
      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage);
      }
    )

    this.customerService.getCustomerCreditCardDetails(this.custId).subscribe(
      data => {
        console.log(data);
        this.currentCustCC = data["data"];
      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage);
      }
    )

    this.customerService.getCustomerPropertyDetails(this.custId).subscribe(
      data => {
        console.log(data);
        this.currentCustProperty = data["data"];
      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage);
      }
    )

    this.customerService.getCustomerInsuranceDetails(this.custId).subscribe(
      data => {
        console.log(data);
        this.currentCustIns = data["data"];
      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage);
      }
    )

    this.customerService.getCustomerLoanReqDetails(this.custId).subscribe(
      data => {
        console.log(data);
        this.currentCustLoanReq = data["data"];
      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage);
      }
    )

    this.customerService.getCustomerLoanAmtDetails(this.custId).subscribe(
      data => {
        console.log(data);
        this.currentcustLoanAmt = data["data"];
      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage);
      }
    )
  }

  //for franchisee
  public goToProfile: any = () => {
    this.router.navigate(['/profile'])
  }

  public goToTables: any = () => {
    this.router.navigate(['/tables'])
  }

  public goToAdditionalDetails: any = () => {
    this.router.navigate(['/addCustAdditonal/', this.custId])
  }

  public goToEditCustProfile: any = () => {
    this.router.navigate(['/custEdit/', this.custId])
  }

  public logout: any = () => {

    this.userService.logout()
      .subscribe((apiResponse) => {

        if (apiResponse.status === 200) {

          console.log("logout called");

          Cookie.delete('authToken');

          Cookie.delete('FranchiseeId');

          Cookie.delete('FranchiseeName');

          Cookie.delete('userType');

          this.router.navigate(['/']);

        } else
          this.toastr.error(apiResponse.message)

      }, (err) => {

        this.toastr.error('some error occured')
      });
  }
}
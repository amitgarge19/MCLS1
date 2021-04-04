import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../user.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fran-form',
  templateUrl: './fran-form.component.html',
  styleUrls: ['./fran-form.component.css']
})
export class FranFormComponent implements OnInit {
  public authToken: any;
  public FranchiseeDetails: any;
  public FranchiseeId: any;
  public FranchiseeName: any;
  public UserType: any;

  public newOffice: boolean;
  public newBank: boolean;

  public FranOffice: any;
  public FranBank: any;

  //Franchisee Office details
  public OfficeName: any
  public OffNumber: any
  public OffType: any
  public OffAddress: any
  public OffCity: any
  public OffTaluka: any
  public OffDistrict: any
  public OffPinCode: any
  public OffState: any

  //Franchisee Bank details
  public bankName: any;
  public AccountNumber: any;
  public AccountType: any;
  public IFSC: any;
  public Branch_Address: any;
  public BankCity: any;
  public BankTaluka: any;
  public BankDistrict: any;
  public BankPinCode: any;
  public BankState: any;

  constructor(public router: Router, public toastr: ToastrService, public userService: UserService) { }

  ngOnInit(): void {
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload')
      location.reload()
    } else {
      localStorage.removeItem('foo')
    }
    this.authToken = Cookie.get('authToken');
    this.FranchiseeDetails = this.userService.getUserInfoFromLocalstorage();
    this.FranchiseeId = Cookie.get('FranchiseeId');
    this.FranchiseeName = Cookie.get('FranchiseeName');
    this.UserType = Cookie.get('userType');

    console.log(this.FranchiseeId, this.FranchiseeName, this.UserType)
  }

  public goToProfile: any = () => {
    this.router.navigate(['/profile'])
  }

  public goToTables: any = () => {
    this.router.navigate(['/tables'])
  }

  public addFranchiseeOfficeDetails: any = () => {

    if (!this.OfficeName)
      this.toastr.warning('Enter office name')

    else if (!this.OffNumber)
      this.toastr.warning('Enter office number')

    else if (!this.OffType)
      this.toastr.warning('Select Office Type')

    else if (!this.OffAddress)
      this.toastr.warning('Enter office Address')

    else if (!this.OffCity)
      this.toastr.warning('Enter Office City')

    else if (!this.OffTaluka)
      this.toastr.warning('Enter Office Taluka')

    else if (!this.OffDistrict)
      this.toastr.warning('Enter Office District')

    else if (!this.OffPinCode)
      this.toastr.warning('Enter Office Pin Code')

    else if (!this.OffState)
      this.toastr.warning('Enter Office State')

    else {

      let OfficeData = {

        OfficeName: this.OfficeName,
        OffNumber: this.OffNumber,
        OffType: this.OffType,
        OffAddress: this.OffAddress,
        OffCity: this.OffCity,
        OffTaluka: this.OffTaluka,
        OffDistrict: this.OffDistrict,
        OffPinCode: this.OffPinCode,
        OffState: this.OffState,
      }

      console.log(OfficeData);

      this.userService.addFranOfficeDetails(OfficeData).subscribe((apiResponse) => {
        console.log(apiResponse);

        if (apiResponse.status === 200) {

          this.toastr.success('Franchisee office details updated successfully.', 'Success!');

          setTimeout(() => {

            this.addFranBankDetails();

          }, 1000);

        } else
          this.toastr.error(apiResponse.message)

      }, (err) => {

        this.toastr.error('some error occured in fran office details');
      });
    }
  }

  public addFranBankDetails: any = () => {

    if (!this.bankName)
      this.toastr.warning('Enter Bank Name')

    else if (!this.AccountNumber)
      this.toastr.warning('Enter Account Number')

    else if (!this.AccountType)
      this.toastr.warning('Enter Account Type')

    else if (!this.IFSC)
      this.toastr.warning('Enter IFSC')

    else if (!this.Branch_Address)
      this.toastr.warning('Enter Branch Address')

    else if (!this.BankCity)
      this.toastr.warning('Enter Bank City name')

    else if (!this.BankTaluka)
      this.toastr.warning('Enter Bank Taluka name')

    else if (!this.BankDistrict)
      this.toastr.warning('Enter Bank District name')

    else if (!this.BankPinCode)
      this.toastr.warning('Enter Bank Pin-code')

    else if (!this.BankState)
      this.toastr.warning('Enter Bank State name')

    //Franchisee Bank details
    let BankDetails = {

      bankName: this.bankName,
      AccountNumber: this.AccountNumber,
      AccountType: this.AccountType,
      IFSC: this.IFSC,
      Branch_Address: this.Branch_Address,
      BankCity: this.BankCity,
      BankTaluka: this.BankTaluka,
      BankDistrict: this.BankDistrict,
      BankPinCode: this.BankPinCode,
      BankState: this.BankState
    }

    console.log(BankDetails);

    this.userService.addFranBankDetails(BankDetails).subscribe((apiResponse) => {
      console.log(apiResponse);

      if (apiResponse.status === 200) {

        this.toastr.success('Franchisee Bank details updated successfully.', 'Success!');

        setTimeout(() => {

          this.goToProfile();

        }, 2000);

      } else
        this.toastr.error(apiResponse.message)

    }, (err) => {

      console.log(err.message);
      this.toastr.error('some error occured in fran bank details');
    });
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

        } else {
          this.toastr.error(apiResponse.message)

        } // end condition

      }, (err) => {
        this.toastr.error('some error occured')
      });
  }
}
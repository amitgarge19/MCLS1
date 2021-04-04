import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from '../user.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fran-form-edit',
  templateUrl: './fran-form-edit.component.html',
  styleUrls: ['./fran-form-edit.component.css']
})

export class FranFormEditComponent implements OnInit {
  public authToken: any;
  public FranchiseeDetails: any;
  public FranchiseeId: any;
  public currentFranchiseeId: any;
  public FranchiseeName: any;
  public UserType: any;

  public newOffice: boolean;
  public newBank: boolean;

  public Personal: any;
  public FranOffice: any;
  public FranBank: any;

  public isPersonal: boolean;
  public isOffice: boolean;
  public isBank: boolean;

  constructor(public _route: ActivatedRoute, public router: Router, public toastr: ToastrService, public userService: UserService) { }

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
    this._route.snapshot.paramMap.get('custId');
    this.currentFranchiseeId = this._route.snapshot.paramMap.get('FranchiseeId');

    this.userService.getFranchiseeDetailsbyId(this.currentFranchiseeId).subscribe(

      data => {
        console.log("logging data");
        console.log(data);
        this.Personal = data["data"];
        console.log(this.Personal);
        this.isPersonal = true;
      },

      error => {

        console.log("Some error occured");
        console.log(error.errorMessage);
      }
    )

    this.userService.getFranchiseeOfficeDetails(this.currentFranchiseeId).subscribe(

      data => {

        console.log("logging data");
        console.log(data);
        this.FranOffice = data["data"];
        console.log(this.FranOffice);
        this.isOffice = true;

      },
      error => {

        console.log("Some error occured");
        console.log(error.errorMessage);
      }
    );

    this.userService.getFranchiseeBankDetails(this.currentFranchiseeId).subscribe(

      data => {

        console.log("logging data");
        console.log(data);
        this.FranBank = data["data"];
        console.log(this.FranBank);
        this.isPersonal = true;

      },
      error => {

        console.log("Some error occured");
        console.log(error.errorMessage);
      }
    );
  }

  public updateFranPersonalDetails: any = () => {
    if (!this.Personal.firstName)
      this.toastr.warning('Enter first name')

    else if (!this.Personal.middleName)
      this.toastr.warning('Enter middle name')

    else if (!this.Personal.lastName)
      this.toastr.warning('Enter last name')

    else if (!this.Personal.dateOfBirth)
      this.toastr.warning('Select Date of birth')

    else if (!this.Personal.gender)
      this.toastr.warning('Select Gender')

    else if (!this.Personal.PAN)
      this.toastr.warning('Enter PAN')

    else if (!this.Personal.Aadhar)
      this.toastr.warning('Enter Aadhar')

    else if (!this.Personal.homeAddress)
      this.toastr.warning('Enter Home Address')

    else if (!this.Personal.city)
      this.toastr.warning('Enter Current City')

    else if (!this.Personal.taluka)
      this.toastr.warning('Enter personal address Taluka name')

    else if (!this.Personal.district)
      this.toastr.warning('Enter personal address district name')

    else if (!this.Personal.pinCode)
      this.toastr.warning('Enter personal address pinCode')

    else if (!this.Personal.AddState)
      this.toastr.warning('Enter personal address state name')

    else {

      let personaldata = {

        firstName: this.Personal.firstName,
        FranchiseeId: this.currentFranchiseeId,
        middleName: this.Personal.middleName,
        lastName: this.Personal.lastName,
        dateOfBirth: this.Personal.dateOfBirth,
        gender: this.Personal.gender,
        PAN: this.Personal.PAN,
        Aadhar: this.Personal.Aadhar,
        homeAddress: this.Personal.homeAddress,
        city: this.Personal.city,
        taluka: this.Personal.taluka,
        district: this.Personal.district,
        pinCode: this.Personal.pinCode,
        AddState: this.Personal.AddState
      }

      console.log(personaldata);

      this.userService.updateFranchiseeDetails(personaldata).subscribe((apiResponse) => {

        console.log(apiResponse);

        if (apiResponse.status === 200) {

          this.toastr.success('Franchisee personal details updated successfully.', 'Success!');

          setTimeout(() => {

            if (this.currentFranchiseeId === this.FranchiseeId)
              this.userService.setUserInfoInLocalStorage(personaldata);

            this.updateFranOfficeDetails();
          }, 1000);

        } else
          this.toastr.error(apiResponse.message)

      }, (err) => {

        this.toastr.error('some error occured');
      });
    }
  }

  public updateFranOfficeDetails: any = () => {
    if (!this.FranOffice.franOffName)
      this.toastr.warning('Enter office name')

    else if (!this.FranOffice.OffNumber)
      this.toastr.warning('Enter office number')

    else if (!this.FranOffice.OffType)
      this.toastr.warning('Select Office Type')

    else if (!this.FranOffice.OfficeAddress)
      this.toastr.warning('Enter office Address')

    else if (!this.FranOffice.Officecity)
      this.toastr.warning('Enter Office City')

    else if (!this.FranOffice.Officetaluka)
      this.toastr.warning('Enter Office Taluka')

    else if (!this.FranOffice.Officedistrict)
      this.toastr.warning('Enter Office District')

    else if (!this.FranOffice.OfficepinCode)
      this.toastr.warning('Enter Office Pin Code')

    else if (!this.FranOffice.OfficeState)
      this.toastr.warning('Enter Office State')

    else {

      let OfficeData = {

        franOffName: this.FranOffice.franOffName,
        FranchiseeId: this.currentFranchiseeId,
        OffNumber: this.FranOffice.OffNumber,
        OffType: this.FranOffice.OffType,
        OfficeAddress: this.FranOffice.OfficeAddress,
        Officecity: this.FranOffice.Officecity,
        Officetaluka: this.FranOffice.Officetaluka,
        Officedistrict: this.FranOffice.Officedistrict,
        OfficepinCode: this.FranOffice.OfficepinCode,
        OfficeState: this.FranOffice.OfficeState,
      }

      console.log(OfficeData);

      this.userService.updateFranOfficeDetails(OfficeData).subscribe((apiResponse) => {
        console.log(apiResponse);

        if (apiResponse.status === 200) {

          this.toastr.success('Franchisee office details updated successfully.', 'Success!');

          setTimeout(() => {

            this.updateFranBankDetails();

          }, 1000);

        } else
          this.toastr.error(apiResponse.message)

      }, (err) => {

        this.toastr.error('some error occured in fran office details');
      });
    }
  }

  public updateFranBankDetails: any = () => {
    if (!this.FranBank.Bank_Name)
      this.toastr.warning('Enter Bank Name')

    else if (!this.FranBank.Account_Number)
      this.toastr.warning('Enter Account Number')

    else if (!this.FranBank.Account_Type)
      this.toastr.warning('Enter Account Type')

    else if (!this.FranBank.IFSC)
      this.toastr.warning('Enter IFSC')

    else if (!this.FranBank.Branch_Address)
      this.toastr.warning('Enter Branch Address')

    else if (!this.FranBank.Bank_City)
      this.toastr.warning('Enter Bank City name')

    else if (!this.FranBank.Bank_Taluka)
      this.toastr.warning('Enter Bank Taluka name')

    else if (!this.FranBank.Bank_District)
      this.toastr.warning('Enter Bank District name')

    else if (!this.FranBank.Bank_PinCode)
      this.toastr.warning('Enter Bank Pin-code')

    else if (!this.FranBank.Bank_State)
      this.toastr.warning('Enter Bank State name')
    else {
      //Franchisee Bank details
      let BankDetails = {

        Bank_Name: this.FranBank.Bank_Name,
        FranchiseeId: this.currentFranchiseeId,
        Account_Number: this.FranBank.Account_Number,
        Account_Type: this.FranBank.Account_Type,
        IFSC: this.FranBank.IFSC,
        Branch_Address: this.FranBank.Branch_Address,
        Bank_City: this.FranBank.Bank_City,
        Bank_Taluka: this.FranBank.Bank_Taluka,
        Bank_District: this.FranBank.Bank_District,
        Bank_PinCode: this.FranBank.Bank_PinCode,
        Bank_State: this.FranBank.Bank_State
      }

      console.log(BankDetails);

      this.userService.updateFranBankDetails(BankDetails).subscribe((apiResponse) => {
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
  }

  public goToProfile: any = () => {
    this.router.navigate(['/profile'])
  }

  public goToTables: any = () => {
    this.router.navigate(['/tables'])
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
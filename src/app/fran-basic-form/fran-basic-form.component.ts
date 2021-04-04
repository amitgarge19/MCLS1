import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../user.service';
import { StateandDistrictsService } from '../stateand-districts.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fran-basic-form',
  templateUrl: './fran-basic-form.component.html',
  styleUrls: ['./fran-basic-form.component.css']
})
export class FranBasicFormComponent implements OnInit {
  public authToken: any;
  public FranchiseeDetails: any;
  public FranchiseeId: any;
  public FranchiseeName: any;
  public UserType: any;

  //Franchisee Basic information
  public firstName: any;
  public middleName: any;
  public lastName: any;
  public dateOfBirth: any;
  public gender: any;
  public PAN: any;
  public PAN_PDF: any;
  public Aadhar_PDF: any;
  public Aadhar: any;
  public mobileNumber: any;
  public email: any;
  public homeAddress: any;
  public city: any;
  public taluka: any;
  public district: any;
  public pinCode: any;
  public AddState: any;
  public stateList: Array<any>;
  public districts: Array<any>;

  constructor(public router: Router, public toastr: ToastrService, public userService: UserService, public stateService: StateandDistrictsService) { }

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

    this.firstName = this.FranchiseeDetails.firstName;
    this.middleName = this.FranchiseeDetails.middleName;
    this.lastName = this.FranchiseeDetails.lastName;
    this.mobileNumber = this.FranchiseeDetails.mobileNumber;
    this.email = this.FranchiseeDetails.email;

    this.dateOfBirth = this.FranchiseeDetails.dateOfBirth;
    this.gender = this.FranchiseeDetails.gender;
    this.PAN = this.FranchiseeDetails.pan;
    this.Aadhar = this.FranchiseeDetails.aadhar;
    this.homeAddress = this.FranchiseeDetails.homeAddress;

    this.AddState = this.FranchiseeDetails.AddState;
    this.district = this.FranchiseeDetails.district;
    this.taluka = this.FranchiseeDetails.taluka;
    this.city = this.FranchiseeDetails.city;
    this.pinCode = this.FranchiseeDetails.pinCode;

    console.log(this.FranchiseeId, this.FranchiseeName, this.UserType)

  }

  /*this.getStateandDistrictList();

  public getStateandDistrictList() {
    this.stateService.getStateandDistrictList().subscribe(
      data => {
        console.log(data);
        this.stateList = data;
      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage);
      }
    )
  }

  public changeState(count) {
    this.districts = this.stateList.find(con => con.state == count).districts;
  }*/

  public goToProfile: any = () => {
    this.router.navigate(['/profile'])
  }

  public goToTables: any = () => {
    this.router.navigate(['/tables'])
  }

  public addFranchiseeDetails: any = () => {

    if (!this.firstName)
      this.toastr.warning('Enter first name')

    else if (!this.middleName)
      this.toastr.warning('Enter middle name')

    else if (!this.lastName)
      this.toastr.warning('Enter last name')

    else if (!this.dateOfBirth)
      this.toastr.warning('Select Date of birth')

    else if (!this.gender)
      this.toastr.warning('Select Gender')

    else if (!this.PAN)
      this.toastr.warning('Enter PAN')

    else if (!this.Aadhar)
      this.toastr.warning('Enter Aadhar')

    else if (!this.homeAddress)
      this.toastr.warning('Enter Home Address')

    else if (!this.city)
      this.toastr.warning('Enter Current City')

    else if (!this.taluka)
      this.toastr.warning('Enter personal address Taluka name')

    else if (!this.district)
      this.toastr.warning('Enter personal address district name')

    else if (!this.pinCode)
      this.toastr.warning('Enter personal address pinCode')

    else if (!this.AddState)
      this.toastr.warning('Enter personal address state name')

    else {

      let personaldata = {

        firstName: this.firstName,
        middleName: this.middleName,
        lastName: this.lastName,
        dateOfBirth: this.dateOfBirth,
        gender: this.gender,
        PAN: this.PAN,
        Aadhar: this.Aadhar,
        homeAddress: this.homeAddress,
        city: this.city,
        taluka: this.city,
        district: this.district,
        pinCode: this.pinCode,
        AddState: this.AddState
      }

      console.log(personaldata);

      this.userService.updateFranchiseeDetails(personaldata).subscribe((apiResponse) => {

        console.log(apiResponse);

        if (apiResponse.status === 200) {

          this.toastr.success('Franchisee details updated successfully.', 'Success!');

          setTimeout(() => {
            this.goToProfile();
          }, 1000);

        } else
          this.toastr.error(apiResponse.message)

      }, (err) => {

        this.toastr.error('some error occured');
      });
    }
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
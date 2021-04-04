import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from "../customer.service";
import { UserService } from "../user.service";
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cust-basic-form',
  templateUrl: './cust-basic-form.component.html',
  styleUrls: ['./cust-basic-form.component.css']
})
export class CustBasicFormComponent implements OnInit {
  public authToken: any;
  public FranchiseeName: any;
  public FranchiseeId: any;
  public UserType: any;

  //Customer Basic Details
  public firstName: any;
  public middleName: any;
  public lastName: any;
  public Mother_name: any;
  public Father_name: any;
  public Spouse_name: any;
  public dateOfBirth: any;
  public category: any;
  public Gender: any;
  public Qualification: any;
  public PAN: any;
  public Aadhar: any;
  public Mobile: any;
  public Email: any;
  public Passport: any;
  public Voter_ID: any;
  public Current_Address: any;
  public C_City: any;
  public C_Taluka: any;
  public C_District: any;
  public C_PinCode: any;
  public C_State: any;
  public C_Add_SameAs_P_Add: any;
  public Permanent_Address: any;
  public P_City: any;
  public P_Taluka: any;
  public P_District: any;
  public P_PinCode: any;
  public P_State: any;
  public Period_of_stay: any;
  public DL_No: any;
  public C_KYC_No: any;

  constructor(public router: Router, public toastr: ToastrService, public userService: UserService, public customerService: CustomerService) { }

  ngOnInit(): void {
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload')
      location.reload()
    } else {
      localStorage.removeItem('foo')
    }
    this.authToken = Cookie.get('authToken');
    this.FranchiseeName = Cookie.get('FranchiseeName');
    this.FranchiseeId = Cookie.get('FranchiseeId')
    this.UserType = Cookie.get('userType');
  }

  public onNgModelChange(e: boolean) {

    if (e) {
      this.Permanent_Address = this.Current_Address
      this.P_City = this.C_City
      this.P_Taluka = this.C_Taluka
      this.P_District = this.C_District
      this.P_PinCode = this.C_PinCode
      this.P_State = this.C_State

    } else {
      this.Permanent_Address = ""
      this.P_City = ""
      this.P_Taluka = ""
      this.P_District = ""
      this.P_PinCode = ""
      this.P_State = ""
    }
  }

  public clear: any = () => { 
    
  }

  public goToProfile: any = () => {
    this.router.navigate(['/profile'])
  }

  public goToTables: any = () => {
    this.router.navigate(['/tables'])
  }

  public goToCustomerProfile: any = (custId: any) => {
    this.router.navigate(['/custProfile', custId])
  }

  public addNewCustomer: any = () => {

    if (!this.firstName)
      this.toastr.warning('Enter first name')

    else if (!this.middleName)
      this.toastr.warning('Enter middle name')

    else if (!this.lastName)
      this.toastr.warning('Enter last name')

    else if (!this.Mother_name)
      this.toastr.warning("Enter mother's name")

    else if (!this.Father_name)
      this.toastr.warning("Enter father's name name")

    else if (!this.dateOfBirth)
      this.toastr.warning('Select Date of birth')

    else if (!this.category)
      this.toastr.warning('select the category')

    else if (!this.Gender)
      this.toastr.warning('Select the Gender')

    else if (!this.Qualification)
      this.toastr.warning('Enter the Qualification')

    else if (!this.PAN)
      this.toastr.warning('Enter the PAN')

    else if (!this.Aadhar)
      this.toastr.warning('Enter Aadhar number')

    else if (!this.Mobile)
      this.toastr.warning('Enter Mobile Number')

    else if (!this.Email)
      this.toastr.warning('Enter email id')

    else if (!this.Current_Address)
      this.toastr.warning('Enter Current Address')

    else if (!this.C_City)
      this.toastr.warning('Enter Current Address City')

    else if (!this.C_Taluka)
      this.toastr.warning('Enter Current Address Taluka')

    else if (!this.C_District)
      this.toastr.warning('Enter Current Address District')

    else if (!this.C_PinCode)
      this.toastr.warning('Enter Current Address Pincode')

    else if (!this.C_State)
      this.toastr.warning('Enter Current Address State')

    else if (!this.Permanent_Address)
      this.toastr.warning('Enter Permanent Address')

    else if (!this.P_City)
      this.toastr.warning('Enter Permanent Address City')

    else if (!this.P_Taluka)
      this.toastr.warning('Enter Permanent Address Taluka')

    else if (!this.P_District)
      this.toastr.warning('Enter Permanent Address District')

    else if (!this.P_PinCode)
      this.toastr.warning('Enter Permanent Address Pincode')

    else if (!this.P_State)
      this.toastr.warning('Enter Permanent Address State')

    else if (!this.Period_of_stay)
      this.toastr.warning('Enter Period of stay')

    else {
      let customerBasicData = {
        FranchiseeName: this.FranchiseeName,
        firstName: this.firstName,
        middleName: this.middleName,
        lastName: this.lastName,
        Mother_name: this.Mother_name,
        Father_name: this.Father_name,
        Spouse_name: this.Spouse_name || 'Not Given',
        Date_of_birth: this.dateOfBirth,
        Gender: this.Gender,
        Category: this.category,
        Current_Address: this.Current_Address,
        C_City: this.C_City,
        C_Taluka: this.C_Taluka,
        C_District: this.C_District,
        C_PinCode: this.C_PinCode,
        c_state: this.C_State,
        Permanent_Address: this.Permanent_Address,
        P_City: this.P_City,
        P_Taluka: this.P_Taluka,
        P_District: this.P_District,
        P_PinCode: this.P_PinCode,
        P_State: this.P_State,
        PAN: this.PAN,
        Aadhar: this.Aadhar,
        Qualification: this.Qualification,
        Mobile: this.Mobile,
        Email: this.Email,
        Passport: this.Passport || 'Not Given',
        DL_No: this.DL_No || 'Not Given',
        C_KYC_No: this.C_KYC_No || 'Not Given',
        Voter_ID: this.Voter_ID || 'Not Given',
        Period_of_stay: this.Period_of_stay
      }

      console.log(customerBasicData);

      this.customerService.addCustomer(customerBasicData).subscribe((apiResponse) => {

        console.log(apiResponse);

        if (apiResponse.status === 200) {
          let custId: any;
          this.toastr.success('Customer created successfully.', 'Success!');

          setTimeout(() => {
            custId = apiResponse.data.custId
            this.goToCustomerProfile(custId);
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
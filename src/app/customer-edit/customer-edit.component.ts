import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from "../customer.service";
import { UserService } from "../user.service";
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})

export class CustomerEditComponent implements OnInit {

  public authToken: any;
  public FranchiseeName: any;
  public FranchiseeId: any;
  public UserType: any;

  public custId: any;
  public currentCustomer: any;
  public custOccupation: any;
  public custBank: any;
  public custFinance: any;
  public custCrediCard: any;
  public custProperty: any;
  public custExistLoan: any;
  public custInsurance: any;
  public custLoanReq: any;
  public custLoanAmt: any;

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
    this.FranchiseeId = Cookie.get('FranchiseeId')
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
        this.custOccupation = data["data"];
      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage);
      }
    )

    this.customerService.getCustomerFinancialDetails(this.custId).subscribe(
      data => {
        console.log(data);
        this.custFinance = data["data"];
      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage);
      }
    )

    this.customerService.getCustomerBankDetails(this.custId).subscribe(
      data => {
        console.log(data);
        this.custBank = data["data"];
      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage);
      }
    )

    this.customerService.getCustomerExistLoanDetails(this.custId).subscribe(
      data => {
        console.log(data);
        this.custExistLoan = data["data"];
      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage);
      }
    )

    this.customerService.getCustomerCreditCardDetails(this.custId).subscribe(
      data => {
        console.log(data);
        this.custCrediCard = data["data"];
      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage);
      }
    )

    this.customerService.getCustomerPropertyDetails(this.custId).subscribe(
      data => {
        console.log(data);
        this.custProperty = data["data"];
      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage);
      }
    )

    this.customerService.getCustomerInsuranceDetails(this.custId).subscribe(
      data => {
        console.log(data);
        this.custInsurance = data["data"];
      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage);
      }
    )

    this.customerService.getCustomerLoanReqDetails(this.custId).subscribe(
      data => {
        console.log(data);
        this.custLoanReq = data["data"];
      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage);
      }
    )

    this.customerService.getCustomerLoanAmtDetails(this.custId).subscribe(
      data => {
        console.log(data);
        this.custLoanAmt = data["data"];
      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage);
      }
    )
  }

  public onNgModelChange(e: boolean) {

    if (e) {
      this.currentCustomer.Permanent_Address = this.currentCustomer.Current_Address
      this.currentCustomer.P_City = this.currentCustomer.C_City
      this.currentCustomer.P_Taluka = this.currentCustomer.C_Taluka
      this.currentCustomer.P_District = this.currentCustomer.C_District
      this.currentCustomer.P_PinCode = this.currentCustomer.C_PinCode
      this.currentCustomer.P_State = this.currentCustomer.C_State

    } else {
      this.currentCustomer.Permanent_Address = ""
      this.currentCustomer.P_City = ""
      this.currentCustomer.P_Taluka = ""
      this.currentCustomer.P_District = ""
      this.currentCustomer.P_PinCode = ""
      this.currentCustomer.P_State = ""
    }
  }

  //for franchisee
  public goToProfile: any = () => {
    this.router.navigate(['/profile'])
  }

  public goToTables: any = () => {
    this.router.navigate(['/tables'])
  }

  public goToCustomerProfile: any = () => {
    this.router.navigate(['/custProfile/', this.custId])
  }

  public findSumofLiabilities: any = () => {
    this.custFinance.Total_Liabilities = 0;
    this.custFinance.Total_Liabilities = parseInt(this.custFinance.Credit_Society_Loan) + parseInt(this.custFinance.Employer_Loan) + parseInt(this.custFinance.Home_Loan) + parseInt(this.custFinance.PF_Loan) + parseInt(this.custFinance.Vehicle_Loan) + parseInt(this.custFinance.Personal_Loan) + parseInt(this.custFinance.Other_Liabilities);
  }

  public findSumofAssets(): void {
    this.custFinance.Total_Assets = 0;
    this.custFinance.Total_Assets = parseInt(this.custFinance.Assets_SB_Account) + parseInt(this.custFinance.Immovable_Property) + parseInt(this.custFinance.Current_balance_PF) + parseInt(this.custFinance.Shares_Securities) + parseInt(this.custFinance.Fixed_Deposits) + parseInt(this.custFinance.Others_Assets);
  }

  public getBankDetails() {

    this.customerService.getBankDetailsbyIFSC(this.custBank.IFSC).subscribe(
      data => {
        console.log(data);

        this.custBank.Bank_Name = data.BANK;
        this.custBank.Branch = data.BRANCH;

      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage);
      }
    )
  } 

  public editCustPersonalDetails: any = () => {
    if (!this.currentCustomer.firstName)
      this.toastr.warning('Enter first name')

    else if (!this.currentCustomer.middleName)
      this.toastr.warning('Enter middle name')

    else if (!this.currentCustomer.lastName)
      this.toastr.warning('Enter last name')

    else if (!this.currentCustomer.Mother_name)
      this.toastr.warning("Enter mother's name")

    else if (!this.currentCustomer.Father_name)
      this.toastr.warning("Enter father's name name")

    else if (!this.currentCustomer.Date_of_birth)
      this.toastr.warning('Select Date of birth')

    else if (!this.currentCustomer.Category)
      this.toastr.warning('select the category')

    else if (!this.currentCustomer.Gender)
      this.toastr.warning('Select the Gender')

    else if (!this.currentCustomer.Qualification)
      this.toastr.warning('Enter the Qualification')

    else if (!this.currentCustomer.PAN)
      this.toastr.warning('Enter the PAN')

    else if (!this.currentCustomer.Aadhar)
      this.toastr.warning('Enter Aadhar number')

    else if (!this.currentCustomer.Mobile)
      this.toastr.warning('Enter Mobile Number')

    else if (!this.currentCustomer.Email)
      this.toastr.warning('Enter email id')

    else if (!this.currentCustomer.Current_Address)
      this.toastr.warning('Enter Current Address')

    else if (!this.currentCustomer.C_City)
      this.toastr.warning('Enter Current Address City')

    else if (!this.currentCustomer.C_Taluka)
      this.toastr.warning('Enter Current Address Taluka')

    else if (!this.currentCustomer.C_District)
      this.toastr.warning('Enter Current Address District')

    else if (!this.currentCustomer.C_PinCode)
      this.toastr.warning('Enter Current Address Pincode')

    else if (!this.currentCustomer.C_State)
      this.toastr.warning('Enter Current Address State')

    else if (!this.currentCustomer.Permanent_Address)
      this.toastr.warning('Enter Permanent Address')

    else if (!this.currentCustomer.P_City)
      this.toastr.warning('Enter Permanent Address City')

    else if (!this.currentCustomer.P_Taluka)
      this.toastr.warning('Enter Permanent Address Taluka')

    else if (!this.currentCustomer.P_District)
      this.toastr.warning('Enter Permanent Address District')

    else if (!this.currentCustomer.P_PinCode)
      this.toastr.warning('Enter Permanent Address Pincode')

    else if (!this.currentCustomer.P_State)
      this.toastr.warning('Enter Permanent Address State')

    else if (!this.currentCustomer.Period_of_stay)
      this.toastr.warning('Enter Period of stay')

    else {
      let customerBasicData = {
        custId: this.custId,
        firstName: this.currentCustomer.firstName,
        middleName: this.currentCustomer.middleName,
        lastName: this.currentCustomer.lastName,
        Mother_name: this.currentCustomer.Mother_name,
        Father_name: this.currentCustomer.Father_name,
        Spouse_name: this.currentCustomer.Spouse_name || 'Not Given',
        Date_of_birth: this.currentCustomer.Date_of_birth,
        Gender: this.currentCustomer.Gender,
        Category: this.currentCustomer.Category,
        Current_Address: this.currentCustomer.Current_Address,
        C_City: this.currentCustomer.C_City,
        C_Taluka: this.currentCustomer.C_Taluka,
        C_District: this.currentCustomer.C_District,
        C_PinCode: this.currentCustomer.C_PinCode,
        c_state: this.currentCustomer.C_State,
        Permanent_Address: this.currentCustomer.Permanent_Address,
        P_City: this.currentCustomer.P_City,
        P_Taluka: this.currentCustomer.P_Taluka,
        P_District: this.currentCustomer.P_District,
        P_PinCode: this.currentCustomer.P_PinCode,
        P_State: this.currentCustomer.P_State,
        PAN: this.currentCustomer.PAN,
        Aadhar: this.currentCustomer.Aadhar,
        Qualification: this.currentCustomer.Qualification,
        Mobile: this.currentCustomer.Mobile,
        Email: this.currentCustomer.Email,
        Passport: this.currentCustomer.Passport || 'Not Given',
        DL_No: this.currentCustomer.DL_No || 'Not Given',
        C_KYC_No: this.currentCustomer.C_KYC_No || 'Not Given',
        Voter_ID: this.currentCustomer.Voter_ID || 'Not Given',
        Period_of_stay: this.currentCustomer.Period_of_stay
      }

      console.log(customerBasicData);

      this.customerService.updateCustomerBasicDetails(customerBasicData).subscribe((apiResponse) => {

        console.log(apiResponse);

        if (apiResponse.status === 200) {

          this.toastr.success('Customer basic data edited successfully.', 'Success!');
          this.editCustOccupationalDetails();

        } else
          this.toastr.error(apiResponse.message)

      }, (err) => {
        this.toastr.error('some error occured while updating customer basic details', 'Error!');
        console.log(err);
      });
    }
  }

  public editCustOccupationalDetails: any = () => {

    if (!this.custOccupation.Occupational_Category)
      this.toastr.warning('Enter occupational category')

    else if (!this.custOccupation.Employer_Business_Name)
      this.toastr.warning('Enter employer business name')

    else if (!this.custOccupation.Address)
      this.toastr.warning('Enter office address')

    else if (!this.custOccupation.City)
      this.toastr.warning('Enter office city')

    else if (!this.custOccupation.Taluka)
      this.toastr.warning('Enter office taluka')

    else if (!this.custOccupation.District)
      this.toastr.warning('Enter office district')

    else if (!this.custOccupation.State)
      this.toastr.warning('Enter office state')

    else if (!this.custOccupation.PinCode)
      this.toastr.warning('Enter office pin code')

    else if (!this.custOccupation.Phone_No)
      this.toastr.warning('Enter office phone number')

    else if (!this.custOccupation.Employer_Business_Type)
      this.toastr.warning('Enter employer business type')

    else if (!this.custOccupation.Legal_Status)
      this.toastr.warning('Enter legal status')

    else if (!this.custOccupation.Designation)
      this.toastr.warning('Enter designation')

    else if (!this.custOccupation.Department)
      this.toastr.warning('Enter department')

    else if (!this.custOccupation.Date_of_Joining_Commencement)
      this.toastr.warning('Enter date of joining/ Date of commencement')

    else if (!this.custOccupation.Total_work_experience)
      this.toastr.warning('Enter total work experience')

    else {
      let customerOccupationData = {
        custId: this.custId,
        Occupational_Category: this.custOccupation.Occupational_Category,
        Employer_Business_Name: this.custOccupation.Employer_Business_Name,
        Address: this.custOccupation.Address,
        City: this.custOccupation.City,
        Taluka: this.custOccupation.Taluka,
        District: this.custOccupation.District,
        State: this.custOccupation.State,
        PinCode: this.custOccupation.PinCode,
        Phone_No: this.custOccupation.Phone_No,
        Employer_Business_Type: this.custOccupation.Employer_Business_Type,
        Legal_Status: this.custOccupation.Legal_Status || 'Not Given',
        Designation: this.custOccupation.Designation,
        Department: this.custOccupation.Department,
        Employee_Code: this.custOccupation.Employee_Code || 'Not Given',
        Date_of_Joining_Commencement: this.custOccupation.Date_of_Joining_Commencement,
        Total_work_experience: this.custOccupation.Total_work_experience,
        GSTIN: this.custOccupation.GSTIN || 'Not Given'
      }
      console.log(customerOccupationData);

      this.customerService.updateCustomerOccupationalData(customerOccupationData).subscribe((apiResponse) => {

        console.log(apiResponse);

        if (apiResponse.status === 200) {

          this.toastr.success('Customer occupational information updated successfully.', 'Success');

          this.editCustFinancialDetails();

        } else
          this.toastr.error(apiResponse.message)

      }, (err) => {
        this.toastr.error('some error occured while updating customer occupational details', 'Error!');
        console.log(err);
      });
    }
  }

  public editCustFinancialDetails: any = () => {

    if (!this.custFinance.Gross_monthly_income)
      this.toastr.warning('Enter gross monthly income')

    else if (!this.custFinance.Average_monthly_expenses)
      this.toastr.warning('Enter average monthly expenses')

    else {
      let customerFinancialData = {
        custId: this.custId,
        Gross_monthly_income: this.custFinance.Gross_monthly_income,
        Average_monthly_expenses: this.custFinance.Average_monthly_expenses,
        Assets_SB_Account: this.custFinance.Assets_SB_Account,
        Immovable_Property: this.custFinance.Immovable_Property,
        Current_balance_PF: this.custFinance.Current_balance_PF || '0',
        Shares_Securities: this.custFinance.Shares_Securities || '0',
        Fixed_Deposits: this.custFinance.Fixed_Deposits || '0',
        Others_Assets: this.custFinance.Others_Assets || '0',
        Total_Assets: this.custFinance.Total_Assets,
        Net_Monthly_Income: this.custFinance.Net_Monthly_Income,
        Credit_Society_Loan: this.custFinance.Credit_Society_Loan || '0',
        Employer_Loan: this.custFinance.Employer_Loan || '0',
        Home_Loan: this.custFinance.Home_Loan || '0',
        PF_Loan: this.custFinance.PF_Loan || '0',
        Vehicle_Loan: this.custFinance.Vehicle_Loan || '0',
        Personal_Loan: this.custFinance.Personal_Loan || '0',
        Other_Liabilities: this.custFinance.Other_Liabilities || '0',
        Total_Liabilities: this.custFinance.Total_Liabilities
      }
      console.log(customerFinancialData);

      this.customerService.updateCustFinancialDetails(customerFinancialData).subscribe((apiResponse) => {

        console.log(apiResponse);

        if (apiResponse.status === 200) {

          this.toastr.success('Customer financial information updated successfully.', 'Success!');
          this.editCustBankDetails();

        } else
          this.toastr.error(apiResponse.message)

      }, (err) => {
        this.toastr.error('some error occured while updating customer financial details', 'Error!');
        console.log(err);
      });
    }
  }

  public editCustBankDetails: any = () => {
    if (!this.custBank.Bank_Name)
      this.toastr.warning('Enter the bank name')

    else if (!this.custBank.IFSC)
      this.toastr.warning('Enter IFSC')

    else if (!this.custBank.Branch)
      this.toastr.warning('Enter Branch Name')

    else if (!this.custBank.ACC_Type)
      this.toastr.warning('Select Accont Type')

    else if (!this.custBank.Account_No)
      this.toastr.warning('Enter Account Number')

    else {
      let custbankDetails = {
        custId: this.custId,
        Bank_Name: this.custBank.Bank_Name,
        IFSC: this.custBank.IFSC,
        Branch: this.custBank.Branch,
        ACC_Type: this.custBank.ACC_Type,
        Account_No: this.custBank.Account_No,
        Opening_Date: this.custBank.Opening_Date,
        Balance: this.custBank.Balance
      }
      console.log(custbankDetails);

      this.customerService.updateCustBankDetails(custbankDetails).subscribe((apiResponse) => {

        console.log(apiResponse);

        if (apiResponse.status === 200) {

          this.toastr.success('Customer bank details updated successfully.', 'Success!');

          setTimeout(() => {
            this.editCustCCDetails();
          }, 1000);

        } else this.toastr.error(apiResponse.message)

      }, (err) => {
        this.toastr.error('some error occured while updating customer bank details', 'Error!');
        console.log(err);
      });
    }
  }

  public editCustCCDetails: any = () => {
    let custCrediCardDetails = {
      custId: this.custId,
      Credit_Card_no: this.custCrediCard.Credit_Card_no || '000',
      Since: this.custCrediCard.Since || new Date(),
      Bank_name: this.custCrediCard.CreditCard_Bank_name || 'Not Given',
      Credit_Limit: this.custCrediCard.Credit_Limit,
      Outstanding_Amount: this.custCrediCard.CreditCard_Outstanding_Amount || 0,
      Balance_Term: this.custCrediCard.CreditCard_Balance_Term || 0,
      Balance_Outstanding: this.custCrediCard.CreditCard_Balance_Outstanding || 0
    }
    console.log(custCrediCardDetails);

    this.customerService.updateCustCCDetails(custCrediCardDetails).subscribe((apiResponse) => {

      console.log(apiResponse);

      if (apiResponse.status === 200) {

        this.toastr.success('Customer credit card details updated successfully.', 'Success!');

        setTimeout(() => {
          this.editcustPropertyDetails();
        }, 1000);

      } else
        this.toastr.error(apiResponse.message)

    }, (err) => {
      this.toastr.error('some error occured while updating customer credit card details', 'Error!');
      console.log(err);
    });
  }

  public editcustPropertyDetails: any = () => {
    if (!this.custProperty.Address)
      this.toastr.warning("Enter Property Address")

    else if (!this.custProperty.City)
      this.toastr.warning("Enter Property City")

    else if (!this.custProperty.Taluka)
      this.toastr.warning("Enter Property Taluka")

    else if (!this.custProperty.District)
      this.toastr.warning("Enter Property District")

    else if (!this.custProperty.State)
      this.toastr.warning("Enter Property State")

    else if (!this.custProperty.Pin_code)
      this.toastr.warning("Enter Property Pincode")

    else if (!this.custProperty.Land_mark)
      this.toastr.warning("Enter Property land mark")

    else if (!this.custProperty.Property_Type)
      this.toastr.warning("Enter Property type")

    else if (!this.custProperty.Land_Area)
      this.toastr.warning("Enter Property land Area")

    else if (!this.custProperty.Built_up_area)
      this.toastr.warning("Enter Builtup Area")

    else if (!this.custProperty.Ownership_type)
      this.toastr.warning("Enter Property ownership type")

    else if (!this.custProperty.Land_type)
      this.toastr.warning("Enter Property land Type")

    else if (!this.custProperty.Construction_stage)
      this.toastr.warning("Enter Property Cosntruction stage")

    else if (!this.custProperty.ConstructionStagePercent)
      this.toastr.warning("Enter Property Cosntruction stage percentage")

    else if (!this.custProperty.Approx_value)
      this.toastr.warning("Enter property's Approx. value")

    else {
      let custPropertyDetails = {
        custId: this.custId,
        Address: this.custProperty.Address,
        City: this.custProperty.City,
        Taluka: this.custProperty.Taluka,
        District: this.custProperty.District,
        State: this.custProperty.State,
        Pin_code: this.custProperty.Pin_code,
        Land_mark: this.custProperty.Land_mark,
        Property_Type: this.custProperty.Property_Type,
        Land_Area: this.custProperty.Land_Area,
        Built_up_area: this.custProperty.Built_up_area,
        Ownership_type: this.custProperty.Ownership_type,
        Land_type: this.custProperty.Land_type,
        Construction_stage: this.custProperty.Construction_stage,
        ConstructionStagePercent: this.custProperty.ConstructionStagePercent,
        Approx_value: this.custProperty.Approx_value
      }

      console.log(custPropertyDetails);

      this.customerService.updateCustPropertyDetails(custPropertyDetails).subscribe((apiResponse) => {

        console.log(apiResponse);

        if (apiResponse.status === 200) {

          this.toastr.success('Customer property details updated successfully.', 'Success!');

          setTimeout(() => {
            this.editCustExistLoan();
          }, 1000);

        } else
          this.toastr.error(apiResponse.message)

      }, (err) => {
        this.toastr.error('some error occured while updating customer property details', 'Error!');
        console.log(err);
      });
    }
  }

  public editCustExistLoan: any = () => {
    let custExistingLoanDetails = {
      custId: this.custId,
      Name_of_Institution: this.custExistLoan.Name_of_Institution || 'Not Given',
      Purpose_of_Loan: this.custExistLoan.ExistingLoan_Purpose_of_Loan || 'Not Given',
      Disbursed_Loan_Amount: this.custExistLoan.ExistingLoan_Disbursed_Loan_Amount || 'Not Given',
      Emi: this.custExistLoan.ExistingLoan_Emi || 'Not Given',
      Balance_Term: this.custExistLoan.ExistingLoan_Balance_Term || 'Not Given',
      Balance_Outstanding: this.custExistLoan.ExistingLoan_Balance_Outstanding || 'Not Given'
    }
    console.log(custExistingLoanDetails);

    this.customerService.updateCustExistLoan(custExistingLoanDetails).subscribe((apiResponse) => {

      console.log(apiResponse);

      if (apiResponse.status === 200) {

        this.toastr.success('Customer existing loan details updated successfully.', 'Success!');

        setTimeout(() => {
          this.editCustInsuranceDetails();
        }, 1000);

      } else
        this.toastr.error(apiResponse.message)

    }, (err) => {
      this.toastr.error('some error occured while updating customer existing loan details', 'Error!');
      console.log(err);
    });
  }

  public editCustInsuranceDetails: any = () => {
    let custInsurancePolicyDetails = {
      custId: this.custId,
      Policy_no: this.custInsurance.Policy_no || 'Not Given',
      Policy_name: this.custInsurance.Policy_name || 'Not Given',
      Issued_By: this.custInsurance.Issued_By || 'Not Given',
      Maturity_date: this.custInsurance.Maturity_date || new Date(),
      Policy_value: this.custInsurance.Policy_value || 0,
      Policy_Type: this.custInsurance.Policy_Type || 'Not Given',
      Premium: this.custInsurance.Premium || 0,
    }
    console.log(custInsurancePolicyDetails);

    this.customerService.updateCustInsuranceDetails(custInsurancePolicyDetails).subscribe((apiResponse) => {

      console.log(apiResponse);

      if (apiResponse.status === 200) {

        this.toastr.success('Customer Insurance Policy details updated successfully.', 'Success!');

        setTimeout(() => {
          this.editLoanReq();
        }, 1000);

      } else
        this.toastr.error(apiResponse.message)

    }, (err) => {
      this.toastr.error('some error occured while updating Customer Insurance Policy details', 'Error!');
      console.log(err);
    });
  }

  public editLoanReq: any = () => {
    if (!this.custLoanReq.Purpose_of_Loan)
      this.toastr.warning("Enter purpose of loan")

    else if (!this.custLoanReq.Loan_Amount)
      this.toastr.warning("Enter Loan Amount Required")

    else if (!this.custLoanReq.Loan_Tenure)
      this.toastr.warning("Enter Loan Tenure")

    else if (!this.custLoanReq.Interest_Option)
      this.toastr.warning("Enter Required Loan Interest Option")

    else if (!this.custLoanReq.Payment_Method)
      this.toastr.warning("Enter Required loan's payment method")

    else {
      let custLoanReqDetails = {
        custId: this.custId,
        Purpose_of_Loan: this.custLoanReq.Purpose_of_Loan,
        Loan_Amount: this.custLoanReq.Loan_Amount,
        Loan_Tenure: this.custLoanReq.Loan_Tenure,
        Interest_Option: this.custLoanReq.Interest_Option,
        Payment_Method: this.custLoanReq.Payment_Method
      }
      console.log(custLoanReqDetails);

      this.customerService.updateLoanReq(custLoanReqDetails).subscribe((apiResponse) => {

        console.log(apiResponse);

        if (apiResponse.status === 200) {

          this.toastr.success('Customer Loan Requirement details updated successfully.', 'Success!');

          setTimeout(() => {
            this.editLoanAmtDetails();
          }, 1000);

        } else
          this.toastr.error(apiResponse.message)

      }, (err) => {
        this.toastr.error('Some error occured while updating customer Loan Requirement details', 'Error!');
        console.log(err);
      });
    }
  }

  public editLoanAmtDetails: any = () => {

    if (!this.custLoanAmt.Land_cost)
      this.toastr.warning("Enter land cost")

    else if (!this.custLoanAmt.Agreement_value)
      this.toastr.warning("Enter agreement value")

    else if (!this.custLoanAmt.Amenities_agreement)
      this.toastr.warning("Enter Amenities agreement value")

    else if (!this.custLoanAmt.Stamp_Duty_Reg_Charge)
      this.toastr.warning("Enter stamp duty registry charge")

    else if (!this.custLoanAmt.Cost_of_Contruction_Ext_Imp)
      this.toastr.warning("Enter Cost of construction Ext Imp")

    else if (!this.custLoanAmt.Incidental)
      this.toastr.warning("Enter Incidental")

    else if (!this.custLoanAmt.Total_Requirement_funds)
      this.toastr.warning("Enter Total Requirement funds")

    else if (!this.custLoanAmt.Amount_spent)
      this.toastr.warning("Enter Amount Spent")

    else if (!this.custLoanAmt.Balance_fund)
      this.toastr.warning("Enter Balance Fund")

    else if (!this.custLoanAmt.Savings)
      this.toastr.warning("Enter Savings")

    else if (!this.custLoanAmt.Disposal_of_asset)
      this.toastr.warning("Enter Disposal of assets")

    else if (!this.custLoanAmt.Family)
      this.toastr.warning("Enter Family Amount")

    else if (!this.custLoanAmt.Others)
      this.toastr.warning("Enter Other Sources")

    else if (!this.custLoanAmt.Total_balance_fund)
      this.toastr.warning("Enter Total balance funds")

    else if (!this.custLoanAmt.Loan_requirement)
      this.toastr.warning("Enter loan requirement")

    else if (!this.custLoanAmt.Total_source_of_funds)
      this.toastr.warning("Enter Total source of funds")

    else {
      let custLoanAmountDetails = {
        custId: this.custId,
        Land_cost: this.custLoanAmt.Land_cost,
        Agreement_value: this.custLoanAmt.Agreement_value,
        Amenities_agreement: this.custLoanAmt.Amenities_agreement,
        Stamp_Duty_Reg_Charge: this.custLoanAmt.Stamp_Duty_Reg_Charge,
        Cost_of_Contruction_Ext_Imp: this.custLoanAmt.Cost_of_Construction_Ext_Imp,
        Incidental: this.custLoanAmt.Incidental,
        Total_Requirement_funds: this.custLoanAmt.Total_Requirement_funds,
        Amount_spent: this.custLoanAmt.Amount_spent,
        Balance_fund: this.custLoanAmt.Balance_fund,
        Savings: this.custLoanAmt.Savings,
        Disposal_of_asset: this.custLoanAmt.Disposal_of_asset,
        Family: this.custLoanAmt.Family,
        Others: this.custLoanAmt.Others,
        Total_balance_fund: this.custLoanAmt.Total_balance_fund,
        Loan_requirement: this.custLoanAmt.Loan_requirement,
        Total_source_of_funds: this.custLoanAmt.Total_source_of_funds
      }
      console.log(custLoanAmountDetails);

      this.customerService.updateLoanAmtDetails(custLoanAmountDetails).subscribe((apiResponse) => {

        console.log(apiResponse);

        if (apiResponse.status === 200) {

          this.toastr.success('Customer Loan Amount details updated successfully.', 'Success!');

          setTimeout(() => {
            this.goToCustomerProfile(this.custId);
          }, 1000);

        } else
          this.toastr.error(apiResponse.message)

      }, (err) => {
        this.toastr.error('some error occured while updating Customer Loan Amount Details', 'Error!');
        console.log(err);
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
import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CustomerService } from "../customer.service";
import { UserService } from "../user.service";
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-additional',
  templateUrl: './customer-additional.component.html',
  styleUrls: ['./customer-additional.component.css']
})

export class CustomerAdditionalComponent implements OnInit {

  public authToken: any;
  public FranchiseeName: any;
  public FranchiseeId: any;
  public UserType: any;

  //customer occupational details
  public custId: any

  public Occupational_Category: any;
  public Employer_Business_Name: any;
  public Off_Address: any;
  public Off_City: any;
  public Off_Taluka: any;
  public Off_District: any;
  public Off_State: any;
  public Off_PinCode: any;
  public Off_Phone_No: any;
  public Employer_Business_Type: any;
  public Legal_Status: any;
  public Designation: any;
  public Department: any;
  public Employee_Code: any;
  public Date_of_Joining_Commencement: any;
  public Total_work_experience: any;
  public GSTIN: any;

  //customer financial details
  public Gross_monthly_income: any
  public Average_monthly_expenses: any = 0
  public Assets_SB_Account: any = 0
  public Immovable_Property: any = 0
  public Current_balance_PF: any = 0
  public Shares_Securities: any = 0
  public Fixed_Deposits: any = 0
  public Others_Assets: any = 0
  public Total_Assets: any = 0

  public Net_Monthly_Income: any = 0
  public Credit_Society_Loan: any = 0
  public Employer_Loan: any = 0
  public Home_Loan: any = 0
  public PF_Loan: any = 0
  public Vehicle_Loan: any = 0
  public Personal_Loan: any = 0
  public Other_Liabilities: any = 0
  public Total_Liabilities: any = 0

  //customer bank details
  public Bank_Name: any
  public IFSC: any
  public Branch: any
  public ACC_Type: any
  public Account_No: any
  public Opening_Date: any
  public Balance: any

  //customer credit card details
  public Credit_Card_no: any = 0
  public Since: any
  public CreditCard_Bank_name: any
  public Credit_Limit: any = 0
  public CreditCard_Outstanding_Amount: any = 0
  public CreditCard_Balance_Term: any = 0
  public CreditCard_Balance_Outstanding: any = 0

  //customer property details 
  public Property_Address: any
  public Property_City: any
  public Property_Taluka: any
  public Property_District: any
  public Property_State: any
  public Property_Pin_code: any
  public Property_Land_mark: any
  public Property_Type: any
  public Land_Area: any
  public Built_up_area: any
  public Ownership_type: any
  public Land_type: any
  public Construction_stage: any = 0
  public ConstructionStagePercent: any = 0
  public Approx_value: any

  //customer existing loan details
  public Name_of_Institution: any
  public ExistingLoan_Purpose_of_Loan: any
  public ExistingLoan_Disbursed_Loan_Amount: any
  public ExistingLoan_Emi: any
  public ExistingLoan_Balance_Term: any
  public ExistingLoan_Balance_Outstanding: any

  //customer insurance details
  public Policy_no: any
  public Policy_name: any
  public Issued_By: any
  public Maturity_date: any
  public Policy_value: any
  public Policy_Type: any
  public Premium: any

  //public loan requirement
  public Req_Purpose_of_Loan: any
  public Req_Loan_Amount: any
  public Req_Loan_Tenure: any
  public Req_Interest_Option: any
  public Req_Payment_Method: any

  //customer loan amount details
  public Land_cost: any
  public Agreement_value: any
  public Amenities_agreement: any
  public Stamp_Duty_Reg_Charge: any
  public Cost_of_Construction_Ext_Imp: any
  public Incidental: any
  public Total_Requirement_funds: any
  public Amount_spent: any
  public Balance_fund: any
  public Savings: any
  public Disposal_of_asset: any
  public Family: any
  public Others: any
  public Total_balance_fund: any
  public Loan_requirement: any
  public Total_source_of_funds: any

  constructor(public _route: ActivatedRoute, public router: Router, public toastr: ToastrService, public userService: UserService, public customerService: CustomerService) { }

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
    console.log("Customer ID in custId: " + this.custId);
    this.Total_Assets = this.Total_Liabilities = 0;
  }

  //Navigation Method Definitions
  public goToProfile: any = () => {
    this.router.navigate(['/profile'])
  }

  public goToTables: any = () => {
    this.router.navigate(['/tables'])
  }

  public goToCustomerProfile: any = (custId: any) => {
    this.router.navigate(['/custProfile/', custId])
  }

  public findSumofLiabilities: any = () => {
    this.Total_Liabilities = 0;
    this.Total_Liabilities = parseInt(this.Credit_Society_Loan) + parseInt(this.Employer_Loan) + parseInt(this.Home_Loan) + parseInt(this.PF_Loan) + parseInt(this.Vehicle_Loan) + parseInt(this.Personal_Loan) + parseInt(this.Other_Liabilities);
  }

  public findSumofAssets(): void {
    this.Total_Assets = 0;
    this.Total_Assets = parseInt(this.Assets_SB_Account) + parseInt(this.Immovable_Property) + parseInt(this.Current_balance_PF) + parseInt(this.Shares_Securities) + parseInt(this.Fixed_Deposits) + parseInt(this.Others_Assets);
  }

  public getBankDetails() {

    this.customerService.getBankDetailsbyIFSC(this.IFSC).subscribe(
      data => {
        console.log(data);

        this.Bank_Name = data.BANK;
        this.Branch = data.BRANCH;

      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage);
      }
    )
  }  

  //CRUD Method Definitions
  public addCustOccupationalDetails: any = () => {

    if (!this.Occupational_Category)
      this.toastr.warning('Enter occupational category')

    else if (!this.Employer_Business_Name)
      this.toastr.warning('Enter employer business name')

    else if (!this.Off_Address)
      this.toastr.warning('Enter office address')

    else if (!this.Off_City)
      this.toastr.warning('Enter office city')

    else if (!this.Off_Taluka)
      this.toastr.warning('Enter office taluka')

    else if (!this.Off_District)
      this.toastr.warning('Enter office district')

    else if (!this.Off_State)
      this.toastr.warning('Enter office state')

    else if (!this.Off_PinCode)
      this.toastr.warning('Enter office pin code')

    else if (!this.Off_Phone_No)
      this.toastr.warning('Enter office phone number')

    else if (!this.Employer_Business_Type)
      this.toastr.warning('Enter employer business type')

    else if (!this.Legal_Status)
      this.toastr.warning('Enter legal status')

    else if (!this.Designation)
      this.toastr.warning('Enter designation')

    else if (!this.Department)
      this.toastr.warning('Enter department')

    else if (!this.Date_of_Joining_Commencement)
      this.toastr.warning('Enter date of joining/ Date of commencement')

    else if (!this.Total_work_experience)
      this.toastr.warning('Enter total work experience')

    else {
      let customerOccupationData = {
        custId: this.custId,
        Occupational_Category: this.Occupational_Category,
        Employer_Business_Name: this.Employer_Business_Name,
        Off_Address: this.Off_Address,
        Off_City: this.Off_City,
        Off_Taluka: this.Off_Taluka,
        Off_District: this.Off_District,
        Off_State: this.Off_State,
        Off_PinCode: this.Off_PinCode,
        Off_Phone_No: this.Off_Phone_No,
        Employer_Business_Type: this.Employer_Business_Type,
        Legal_Status: this.Legal_Status || 'Not Given',
        Designation: this.Designation,
        Department: this.Department,
        Employee_Code: this.Employee_Code || 'Not Given',
        Date_of_Joining_Commencement: this.Date_of_Joining_Commencement,
        Total_work_experience: this.Total_work_experience,
        GSTIN: this.GSTIN || 'Not Given'
      }
      console.log(customerOccupationData);

      this.customerService.addCustOccupationalDetails(customerOccupationData).subscribe((apiResponse) => {

        console.log(apiResponse);

        if (apiResponse.status === 200) {

          this.toastr.success('Customer occupational information added successfully.', 'Success!');

          this.addcustFinancialDetails();

        } else
          console.log(apiResponse)

      }, (err) => {

        console.log('some error occured while adding customer occupational details');
      });
    }
  }

  public addcustFinancialDetails: any = () => {

    if (!this.Gross_monthly_income)
      this.toastr.warning('Enter gross monthly income')

    else if (!this.Average_monthly_expenses)
      this.toastr.warning('Enter average monthly expenses')

    else {
      let customerFinancialData = {
        custId: this.custId,
        Gross_monthly_income: this.Gross_monthly_income,
        Average_monthly_expenses: this.Average_monthly_expenses,
        Assets_SB_Account: this.Assets_SB_Account,
        Immovable_Property: this.Immovable_Property,
        Current_balance_PF: this.Current_balance_PF || '0',
        Shares_Securities: this.Shares_Securities || '0',
        Fixed_Deposits: this.Fixed_Deposits || '0',
        Others_Assets: this.Others_Assets || '0',
        Total_Assets: this.Total_Assets,
        Net_Monthly_Income: this.Net_Monthly_Income,
        Credit_Society_Loan: this.Credit_Society_Loan || '0',
        Employer_Loan: this.Employer_Loan || '0',
        Home_Loan: this.Home_Loan || '0',
        PF_Loan: this.PF_Loan || '0',
        Vehicle_Loan: this.Vehicle_Loan || '0',
        Personal_Loan: this.Personal_Loan || '0',
        Other_Liabilities: this.Other_Liabilities || '0',
        Total_Liabilities: this.Total_Liabilities
      }
      console.log(customerFinancialData);

      this.customerService.addCustFinancialDetails(customerFinancialData).subscribe((apiResponse) => {

        console.log(apiResponse);

        if (apiResponse.status === 200) {

          this.toastr.success('Customer financial information added successfully.', 'Success!');
          this.addcustBankDetails();

        } else
          console.log("some error occured at backend customer financial details" + apiResponse);

      }, (err) => {

        this.toastr.error('some error occured while adding customer financial details');
      });
    }
  }

  public addcustBankDetails: any = () => {
    if (!this.Bank_Name)
      this.toastr.warning('Enter the bank name')

    else if (!this.IFSC)
      this.toastr.warning('Enter IFSC')

    else if (!this.Branch)
      this.toastr.warning('Enter Branch Name')

    else if (!this.ACC_Type)
      this.toastr.warning('Select Accont Type')

    else if (!this.Account_No)
      this.toastr.warning('Enter Account Number')

    else {
      let custbankDetails = {
        custId: this.custId,
        Bank_Name: this.Bank_Name,
        IFSC: this.IFSC,
        Branch: this.Branch,
        ACC_Type: this.ACC_Type,
        Account_No: this.Account_No,
        Opening_Date: this.Opening_Date,
        Balance: this.Balance
      }
      console.log(custbankDetails);

      this.customerService.addCustBankDetails(custbankDetails).subscribe((apiResponse) => {

        console.log(apiResponse);

        if (apiResponse.status === 200) {

          this.toastr.success('Customer bank details added successfully.', 'Success!');

          setTimeout(() => {
            this.addCustCCDetails();
          }, 1000);

        } else
          console.log("some error occured at backend customer bank details");

      }, (err) => {

        console.log('some error occured while adding customer bank details');
      });
    }
  }
  public addCustCCDetails: any = () => {
    let custCrediCardDetails = {
      custId: this.custId,
      Credit_Card_no: this.Credit_Card_no || '000',
      Since: this.Since || new Date(),
      Bank_name: this.CreditCard_Bank_name || 'Not Given',
      Credit_Limit: this.Credit_Limit,
      Outstanding_Amount: this.CreditCard_Outstanding_Amount,
      Balance_Term: this.CreditCard_Balance_Term,
      Balance_Outstanding: this.CreditCard_Balance_Outstanding
    }
    console.log(custCrediCardDetails);

    this.customerService.addCustCCDetails(custCrediCardDetails).subscribe((apiResponse) => {

      console.log(apiResponse);

      if (apiResponse.status === 200) {

        this.toastr.success('Customer credit card details added successfully.', 'Success!');

        setTimeout(() => {
          this.addcustPropertyDetails();
        }, 1000);

      } else
        console.log("some error occured at backend credit card details");
    }, (err) => {

      console.log('some error occured while adding customer credit card details');
    });
  }

  public addcustPropertyDetails: any = () => {

    if (!this.Property_Address)
      this.toastr.warning("Enter Property Address")

    else if (!this.Property_City)
      this.toastr.warning("Enter Property City")

    else if (!this.Property_Taluka)
      this.toastr.warning("Enter Property Taluka")

    else if (!this.Property_District)
      this.toastr.warning("Enter Property District")

    else if (!this.Property_State)
      this.toastr.warning("Enter Property State")

    else if (!this.Property_Pin_code)
      this.toastr.warning("Enter Property Pincode")

    else if (!this.Property_Land_mark)
      this.toastr.warning("Enter Property land mark")

    else if (!this.Property_Type)
      this.toastr.warning("Enter Property type")

    else if (!this.Land_Area)
      this.toastr.warning("Enter Property land Area")

    else if (!this.Built_up_area)
      this.toastr.warning("Enter Builtup Area")

    else if (!this.Ownership_type)
      this.toastr.warning("Enter Property ownership type")

    else if (!this.Land_type)
      this.toastr.warning("Enter Property land Type")

    else if (!this.Construction_stage)
      this.toastr.warning("Enter Property Cosntruction stage")

    else if (!this.ConstructionStagePercent)
      this.toastr.warning("Enter Property Cosntruction stage percentage")

    else if (!this.Approx_value)
      this.toastr.warning("Enter property's Approx. value")

    else {
      let custPropertyDetails = {
        custId: this.custId,
        Address: this.Property_Address,
        City: this.Property_City,
        Taluka: this.Property_Taluka,
        District: this.Property_District,
        State: this.Property_State,
        Pin_code: this.Property_Pin_code,
        Land_mark: this.Property_Land_mark,
        Property_Type: this.Property_Type,
        Land_Area: this.Land_Area,
        Built_up_area: this.Built_up_area,
        Ownership_type: this.Ownership_type,
        Land_type: this.Land_type,
        Construction_stage: this.Construction_stage,
        ConstructionStagePercent: this.ConstructionStagePercent,
        Approx_value: this.Approx_value
      }

      console.log(custPropertyDetails);

      this.customerService.addCustPropertyDetails(custPropertyDetails).subscribe((apiResponse) => {

        console.log(apiResponse);

        if (apiResponse.status === 200) {

          this.toastr.success('Customer property details added successfully.', 'Success!');

          setTimeout(() => {
            this.addCustExistLoan();
          }, 1000);

        } else
          console.log("some error occured at backend customer property details");
      }, (err) => {

        console.log('some error occured while adding customer property details');
      });
    }
  }

  public addCustExistLoan: any = () => {

    let custExistingLoanDetails = {
      custId: this.custId,
      Name_of_Institution: this.Name_of_Institution || 'Not Given',
      ExistingLoan_Purpose_of_Loan: this.ExistingLoan_Purpose_of_Loan || 'Not Given',
      ExistingLoan_Disbursed_Loan_Amount: this.ExistingLoan_Disbursed_Loan_Amount || 'Not Given',
      ExistingLoan_Emi: this.ExistingLoan_Emi || 'Not Given',
      ExistingLoan_Balance_Term: this.ExistingLoan_Balance_Term || 'Not Given',
      ExistingLoan_Balance_Outstanding: this.ExistingLoan_Balance_Outstanding || 'Not Given'
    }

    console.log(custExistingLoanDetails);

    this.customerService.addCustExistLoan(custExistingLoanDetails).subscribe((apiResponse) => {

      console.log(apiResponse);

      if (apiResponse.status === 200) {

        this.toastr.success('Customer existing loan details added successfully.', 'Success!');

        setTimeout(() => {
          this.addCustInsuranceDetails();
        }, 1000);

      } else
        console.log("some error occured at backend customer existing loan details");

    }, (err) => {

      console.log('some error occured while adding customer existing loan details');
    });
  }

  public addCustInsuranceDetails: any = () => {

    let custInsurancePolicyDetails = {
      custId: this.custId,
      Policy_no: this.Policy_no || 'Not Given',
      Policy_name: this.Policy_name || 'Not Given',
      Issued_By: this.Issued_By || 'Not Given',
      Maturity_date: this.Maturity_date || new Date(),
      Policy_value: this.Policy_value || 0,
      Policy_Type: this.Policy_Type || 'Not Given',
      Premium: this.Premium || 0,
    }
    console.log(custInsurancePolicyDetails);

    this.customerService.addCustInsuranceDetails(custInsurancePolicyDetails).subscribe((apiResponse) => {

      console.log(apiResponse);

      if (apiResponse.status === 200) {

        this.toastr.success('Customer Insurance Policy details added successfully.', 'Success!');

        setTimeout(() => {
          this.addLoanReq();
        }, 1000);

      } else
        console.log("some error occured at backend customer Insurance");

    }, (err) => {

      console.log('some error occured while adding customer Insurance details');
    });
  }

  public addLoanReq: any = () => {
    if (!this.Req_Purpose_of_Loan)
      this.toastr.warning("Enter purpose of loan")

    else if (!this.Req_Loan_Amount)
      this.toastr.warning("Enter Loan Amount Required")

    else if (!this.Req_Loan_Tenure)
      this.toastr.warning("Enter Loan Tenure")

    else if (!this.Req_Interest_Option)
      this.toastr.warning("Enter Required Loan Interest Option")

    else if (!this.Req_Payment_Method)
      this.toastr.warning("Enter Required loan's payment method")

    else {
      let custLoanReqDetails = {
        custId: this.custId,
        Req_Purpose_of_Loan: this.Req_Purpose_of_Loan,
        Req_Loan_Amount: this.Req_Loan_Amount,
        Req_Loan_Tenure: this.Req_Loan_Tenure,
        Req_Interest_Option: this.Req_Interest_Option,
        Req_Payment_Method: this.Req_Payment_Method,
      }
      console.log(custLoanReqDetails);

      this.customerService.addLoanReq(custLoanReqDetails).subscribe((apiResponse) => {

        console.log(apiResponse);

        if (apiResponse.status === 200) {

          this.toastr.success('Customer Loan Requirement details added successfully.', 'Success!');

          setTimeout(() => {
            this.addLoanAmtDetails();
          }, 1000);

        } else
          console.log("some error occured at backend customer Loan requirement");

      }, (err) => {

        console.log('some error occured while adding customer Loan requirement');
      });
    }
  }

  public addLoanAmtDetails: any = () => {
    if (!this.Land_cost)
      this.toastr.warning("Enter land cost")

    else if (!this.Agreement_value)
      this.toastr.warning("Enter agreement value")

    else if (!this.Amenities_agreement)
      this.toastr.warning("Enter Amenities agreement value")

    else if (!this.Stamp_Duty_Reg_Charge)
      this.toastr.warning("Enter stamp duty registry charge")

    else if (!this.Cost_of_Construction_Ext_Imp)
      this.toastr.warning("Enter Cost of construction Ext Imp")

    else if (!this.Incidental)
      this.toastr.warning("Enter Incidental")

    else if (!this.Total_Requirement_funds)
      this.toastr.warning("Enter Total Requirement funds")

    else if (!this.Amount_spent)
      this.toastr.warning("Enter Amount Spent")

    else if (!this.Balance_fund)
      this.toastr.warning("Enter Balance Fund")

    else if (!this.Savings)
      this.toastr.warning("Enter Savings")

    else if (!this.Disposal_of_asset)
      this.toastr.warning("Enter Disposal of assets")

    else if (!this.Family)
      this.toastr.warning("Enter Family Amount")

    else if (!this.Others)
      this.toastr.warning("Enter Other Sources")

    else if (!this.Total_balance_fund)
      this.toastr.warning("Enter Total balance funds")

    else if (!this.Loan_requirement)
      this.toastr.warning("Enter loan requirement")

    else if (!this.Total_source_of_funds)
      this.toastr.warning("Enter Total source of funds")

    else {
      let custLoanAmountDetails = {
        custId: this.custId,
        Land_cost: this.Land_cost,
        Agreement_value: this.Agreement_value,
        Amenities_agreement: this.Amenities_agreement,
        Stamp_Duty_Reg_Charge: this.Stamp_Duty_Reg_Charge,
        Cost_of_Contruction_Ext_Imp: this.Cost_of_Construction_Ext_Imp,
        Incidental: this.Incidental,
        Total_Requirement_funds: this.Total_Requirement_funds,
        Amount_spent: this.Amount_spent,
        Balance_fund: this.Balance_fund,
        Savings: this.Savings,
        Disposal_of_asset: this.Disposal_of_asset,
        Family: this.Family,
        Others: this.Others,
        Total_balance_fund: this.Total_balance_fund,
        Loan_requirement: this.Loan_requirement,
        Total_source_of_funds: this.Total_source_of_funds
      }
      console.log(custLoanAmountDetails);

      this.customerService.addLoanAmtDetails(custLoanAmountDetails).subscribe((apiResponse) => {

        console.log(apiResponse);

        if (apiResponse.status === 200) {

          this.toastr.success('Customer Loan Amount details added successfully.', 'Success!');

          setTimeout(() => {
            this.goToCustomerProfile(this.custId);
          }, 1000);

        } else
          console.log("some error occured at backend Loan Amount details");

      }, (err) => {

        console.log('some error occured while adding customer Loan amount details');
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
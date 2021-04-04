import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Cookie } from "ng2-cookies/ng2-cookies";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  private url = 'http://localhost:3000/api/v1';

  public authToken = Cookie.get('authToken')
  public userType = Cookie.get('userType');
  public FranchiseeId = Cookie.get('FranchiseeId')

  constructor(public http: HttpClient) { }


  public getPincodeDetails(pincode): Observable<any> {
    let myResponse = this.http.get(`https://api.postalpincode.in/pincode/${pincode}`);
    return myResponse;
  }
  /*
  * GET ALL CUSTOMERS
  */

  public getAllCustomers(): any {

    let body = {
      authToken: this.authToken
    }

    let myResponse = this.http.post(`${this.url}/get/customer/all`, body)
    console.log(myResponse);

    return myResponse;
  }

  /**
   * CUSTOMER BASIC DETAILS METHODS
   */

  public getCustomerBasicById(custId): any {
    let body = {
      authToken: this.authToken,

    }
    let myResponse = this.http.post(`${this.url}/get/customer/${custId}`, body);
    console.log(custId);

    return myResponse;
  }

  public addCustomer(data): Observable<any> {

    const params = new HttpParams()
      .set('authToken', this.authToken)
      .set('createdBy', data.FranchiseeName)
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('middleName', data.middleName)
      .set('Mother_name', data.Mother_name)
      .set('Father_name', data.Father_name)
      .set('Spouse_name', data.Spouse_name)
      .set('Date_of_birth', data.Date_of_birth)
      .set('Gender', data.Gender)
      .set('Category', data.Category)
      .set('Current_Address', data.Current_Address)
      .set('C_City', data.C_City)
      .set('C_Taluka', data.C_Taluka)
      .set('C_District', data.C_District)
      .set('c_state', data.c_state)
      .set('C_PinCode', data.C_PinCode)
      .set('Permanent_Address', data.Permanent_Address)
      .set('P_City', data.P_City)
      .set('P_Taluka', data.P_Taluka)
      .set('P_District', data.P_District)
      .set('P_State', data.P_State)
      .set('P_PinCode', data.P_PinCode)
      .set('Qualification', data.Qualification)
      .set('Mobile', data.Mobile)
      .set('Email', data.Email)
      .set('Passport', data.Passport)
      .set('PAN', data.PAN)
      .set('Aadhar', data.Aadhar)
      .set('DL_No', data.DL_No)
      .set('C_KYC_No', data.C_KYC_No)
      .set('Voter_ID', data.Voter_ID)
      .set('Period_of_stay', data.Period_of_stay)

    return this.http.post(`${this.url}/add/customer`, params);
  }

  public updateCustomerBasicDetails(data): Observable<any> {

    console.log(data);

    const params = new HttpParams()

      .set('authToken', Cookie.get('authToken'))
      .set('userType', this.userType)
      .set('custId', data.custId)
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('middleName', data.middleName)
      .set('Mother_name', data.Mother_name)
      .set('Father_name', data.Father_name)
      .set('Spouse_name', data.Spouse_name)
      .set('Date_of_birth', data.Date_of_birth)
      .set('Gender', data.Gender)
      .set('Category', data.Category)
      .set('Current_Address', data.Current_Address)
      .set('C_City', data.C_City)
      .set('C_Taluka', data.C_Taluka)
      .set('C_District', data.C_District)
      .set('c_state', data.c_state)
      .set('C_PinCode', data.C_PinCode)
      .set('Permanent_Address', data.Permanent_Address)
      .set('P_City', data.P_City)
      .set('P_Taluka', data.P_Taluka)
      .set('P_District', data.P_District)
      .set('P_State', data.P_State)
      .set('P_PinCode', data.P_PinCode)
      .set('Qualification', data.Qualification)
      .set('Mobile', data.Mobile)
      .set('Email', data.Email)
      .set('Passport', data.Passport)
      .set('PAN', data.PAN)
      .set('Aadhar', data.Aadhar)
      .set('DL_No', data.DL_No)
      .set('C_KYC_No', data.C_KYC_No)
      .set('Voter_ID', data.Voter_ID)
      .set('Period_of_stay', data.Period_of_stay)

    return this.http.put(`${this.url}/update/customerBasic`, params);
  }

  /**
  * CUSTOMER OCCUPATIONAL DETAILS METHODS
  */

  public getCustomerOccupationalDetails(custId): any {
    let body = {
      authToken: this.authToken
    }
    let myResponse = this.http.post(`${this.url}/get/customerOcc/${custId}`, body);
    console.log(custId);

    return myResponse;
  }

  public addCustOccupationalDetails(data): Observable<any> {
    const params = new HttpParams()
      .set('authToken', this.authToken)
      .set('FranchiseeId', this.FranchiseeId)
      .set('custId', data.custId)
      .set('userType', this.userType)
      .set('Occupational_Category', data.Occupational_Category)
      .set('Employer_Business_Name', data.Employer_Business_Name)
      .set('Address', data.Off_Address)
      .set('City', data.Off_City)
      .set('Taluka', data.Off_Taluka)
      .set('District', data.Off_District)
      .set('State', data.Off_State)
      .set('PinCode', data.Off_PinCode)
      .set('Phone_No', data.Off_Phone_No)
      .set('Employer_Business_Type', data.Employer_Business_Type)
      .set('Legal_Status', data.Legal_Status)
      .set('Designation', data.Designation)
      .set('Department', data.Department)
      .set('Employee_Code', data.Employee_Code)
      .set('Date_of_Joining_Commencement', data.Date_of_Joining_Commencement)
      .set('Total_work_experience', data.Total_work_experience)
      .set('GSTIN', data.GSTIN)

    return this.http.post(`${this.url}/add/custOcc`, params)
  }

  public updateCustomerOccupationalData(data): Observable<any> {
    const params = new HttpParams()
      .set('authToken', this.authToken)
      .set('custId', data.custId)
      .set('userType', this.userType)
      .set('Occupational_Category', data.Occupational_Category)
      .set('Employer_Business_Name', data.Employer_Business_Name)
      .set('Address', data.Address)
      .set('City', data.City)
      .set('Taluka', data.Taluka)
      .set('District', data.District)
      .set('State', data.State)
      .set('PinCode', data.PinCode)
      .set('Phone_No', data.Phone_No)
      .set('Employer_Business_Type', data.Employer_Business_Type)
      .set('Legal_Status', data.Legal_Status)
      .set('Designation', data.Designation)
      .set('Department', data.Department)
      .set('Employee_Code', data.Employee_Code)
      .set('Date_of_Joining_Commencement', data.Date_of_Joining_Commencement)
      .set('Total_work_experience', data.Total_work_experience)
      .set('GSTIN', data.GSTIN)

    return this.http.put(`${this.url}/update/custOcc`, params)
  }

  /**
  * CUSTOMER FINANCIAL DETAILS METHODS
  */
  public getCustomerFinancialDetails(custId): any {
    let body = {
      authToken: this.authToken
    }
    let myResponse = this.http.post(`${this.url}/get/customerFin/${custId}`, body);

    return myResponse;
  }

  public addCustFinancialDetails(data): Observable<any> {
    const params = new HttpParams()
      .set('authToken', this.authToken)
      .set('custId', data.custId)
      .set('userType', this.userType)
      .set('Gross_monthly_income', data.Gross_monthly_income)
      .set('Average_monthly_expenses', data.Average_monthly_expenses)
      .set('Assets_SB_Account', data.Assets_SB_Account)
      .set('Immovable_Property', data.Immovable_Property)
      .set('Current_balance_PF', data.Current_balance_PF)
      .set('Shares_Securities', data.Shares_Securities)
      .set('Fixed_Deposits', data.Fixed_Deposits)
      .set('Others_Assets', data.Others_Assets)
      .set('Total_Assets', data.Total_Assets)
      .set('Net_Monthly_Income', data.Net_Monthly_Income)
      .set('Credit_Society_Loan', data.Credit_Society_Loan)
      .set('Employer_Loan', data.Employer_Loan)
      .set('Home_Loan', data.Home_Loan)
      .set('PF_Loan', data.PF_Loan)
      .set('Vehicle_Loan', data.Vehicle_Loan)
      .set('Personal_Loan', data.Personal_Loan)
      .set('Other_Liabilities', data.Other_Liabilities)
      .set('Total_Liabilities', data.Total_Liabilities)

    return this.http.post(`${this.url}/add/custFin`, params)
  }

  public updateCustFinancialDetails(data): Observable<any> {
    const params = new HttpParams()
      .set('authToken', this.authToken)
      .set('custId', data.custId)
      .set('userType', this.userType)
      .set('Gross_monthly_income', data.Gross_monthly_income)
      .set('Average_monthly_expenses', data.Average_monthly_expenses)
      .set('Assets_SB_Account', data.Assets_SB_Account)
      .set('Immovable_Property', data.Immovable_Property)
      .set('Current_balance_PF', data.Current_balance_PF)
      .set('Shares_Securities', data.Shares_Securities)
      .set('Fixed_Deposits', data.Fixed_Deposits)
      .set('Others_Assets', data.Others_Assets)
      .set('Total_Assets', data.Total_Assets)
      .set('Net_Monthly_Income', data.Net_Monthly_Income)
      .set('Credit_Society_Loan', data.Credit_Society_Loan)
      .set('Employer_Loan', data.Employer_Loan)
      .set('Home_Loan', data.Home_Loan)
      .set('PF_Loan', data.PF_Loan)
      .set('Vehicle_Loan', data.Vehicle_Loan)
      .set('Personal_Loan', data.Personal_Loan)
      .set('Other_Liabilities', data.Other_Liabilities)
      .set('Total_Liabilities', data.Total_Liabilities)

    return this.http.put(`${this.url}/update/custFin`, params)
  }

  /**
   * CUSTOMER BANK DETAILS METHODS   
   */

  public getCustomerBankDetails(custId): any {
    let body = {
      authToken: this.authToken
    }
    let myResponse = this.http.post(`${this.url}/get/customerBank/${custId}`, body);

    return myResponse;
  }

  public addCustBankDetails(data): Observable<any> {
    const params = new HttpParams()
      .set('authToken', this.authToken)
      .set('custId', data.custId)
      .set('userType', this.userType)
      .set('Bank_Name', data.Bank_Name)
      .set('IFSC', data.IFSC)
      .set('Branch', data.Branch)
      .set('ACC_Type', data.ACC_Type)
      .set('Account_No', data.Account_No)
      .set('Opening_Date', data.Opening_Date)
      .set('Balance', data.Balance)

    return this.http.post(`${this.url}/add/custBank`, params)
  }

  public updateCustBankDetails(data): Observable<any> {
    const params = new HttpParams()
      .set('authToken', this.authToken)
      .set('custId', data.custId)
      .set('userType', this.userType)
      .set('Bank_Name', data.Bank_Name)
      .set('IFSC', data.IFSC)
      .set('Branch', data.Branch)
      .set('ACC_Type', data.ACC_Type)
      .set('Account_No', data.Account_No)
      .set('Opening_Date', data.Opening_Date)
      .set('Balance', data.Balance)

    return this.http.put(`${this.url}/update/custBank`, params)
  }

  public getBankDetailsbyIFSC(IFSC): Observable<any> {

    let myResponse = this.http.get(`https://ifsc.razorpay.com/${IFSC}`);

    return myResponse;
  }

  /**
   *  CUSTOMER EXISTING LOAN METHODS
   */

  public getCustomerExistLoanDetails(custId): any {
    let body = {
      authToken: this.authToken
    }
    let myResponse = this.http.post(`${this.url}/get/customerExistLoan/${custId}`, body);

    return myResponse;
  }

  public addCustExistLoan(data): Observable<any> {
    const params = new HttpParams()
      .set('authToken', this.authToken)
      .set('custId', data.custId)
      .set('userType', this.userType)
      .set('Name_of_Institution', data.Name_of_Institution)
      .set('Purpose_of_Loan', data.ExistingLoan_Purpose_of_Loan)
      .set('Disbursed_Loan_Amount', data.ExistingLoan_Disbursed_Loan_Amount)
      .set('Emi', data.ExistingLoan_Emi)
      .set('Balance_Term', data.ExistingLoan_Balance_Term)
      .set('Balance_Outstanding', data.ExistingLoan_Balance_Outstanding)

    return this.http.post(`${this.url}/add/custExistLoan`, params)
  }

  public updateCustExistLoan(data): Observable<any> {
    const params = new HttpParams()
      .set('authToken', this.authToken)
      .set('custId', data.custId)
      .set('userType', this.userType)
      .set('Name_of_Institution', data.Name_of_Institution)
      .set('Purpose_of_Loan', data.Loan_Purpose_of_Loan)
      .set('Disbursed_Loan_Amount', data.Loan_Disbursed_Loan_Amount)
      .set('Emi', data.Emi)
      .set('Balance_Term', data.Balance_Term)
      .set('Balance_Outstanding', data.Balance_Outstanding)

    return this.http.put(`${this.url}/update/custExistLoan`, params)
  }

  /**
   *  CUSTOMER CREDIT CARD DETAILS METHODS   
   */

  public getCustomerCreditCardDetails(custId): any {
    let body = {
      authToken: this.authToken
    }
    let myResponse = this.http.post(`${this.url}/get/customerCC/${custId}`, body);

    return myResponse;
  }

  public addCustCCDetails(data): Observable<any> {
    const params = new HttpParams()
      .set('authToken', this.authToken)
      .set('custId', data.custId)
      .set('userType', this.userType)
      .set('Credit_Card_no', data.Credit_Card_no)
      .set('Since', data.Since)
      .set('Bank_name', data.CreditCard_Bank_name)
      .set('Credit_Limit', data.Credit_Limit)
      .set('Outstanding_Amount', data.Outstanding_Amount)
      .set('Balance_Term', data.Balance_Term)
      .set('Balance_Outstanding', data.Balance_Outstanding)

    return this.http.post(`${this.url}/add/ccDetails`, params)
  }

  public updateCustCCDetails(data): Observable<any> {
    const params = new HttpParams()
      .set('authToken', this.authToken)
      .set('custId', data.custId)
      .set('userType', this.userType)
      .set('Credit_Card_no', data.Credit_Card_no)
      .set('Since', data.Since)
      .set('Bank_name', data.Bank_name)
      .set('Credit_Limit', data.Credit_Limit)
      .set('Outstanding_Amount', data.Outstanding_Amount)
      .set('Balance_Term', data.Balance_Term)
      .set('Balance_Outstanding', data.Balance_Outstanding)

    return this.http.put(`${this.url}/update/ccDetails`, params)
  }

  /**
   * CUSTOMER PROPERTY DETAILS METHODS
   */

  public getCustomerPropertyDetails(custId): any {
    let body = {
      authToken: this.authToken
    }
    let myResponse = this.http.post(`${this.url}/get/customerProperty/${custId}`, body);

    return myResponse;
  }

  public addCustPropertyDetails(data): Observable<any> {
    const params = new HttpParams()

      .set('authToken', this.authToken)
      .set('custId', data.custId)
      .set('userType', this.userType)
      .set('Address', data.Address)
      .set('City', data.City)
      .set('Taluka', data.Taluka)
      .set('District', data.District)
      .set('State', data.State)
      .set('Pin_code', data.Pin_code)
      .set('Land_mark', data.Land_mark)
      .set('Property_Type', data.Property_Type)
      .set('Land_Area', data.Land_Area)
      .set('Built_up_area', data.Built_up_area)
      .set('Ownership_type', data.Ownership_type)
      .set('Land_type', data.Land_type)
      .set('Construction_stage', data.Construction_stage)
      .set('ConstructionStagePercent', data.ConstructionStagePercent)
      .set('Approx_value', data.Approx_value)

    return this.http.post(`${this.url}/add/custProperty`, params)
  }

  public updateCustPropertyDetails(data): Observable<any> {
    const params = new HttpParams()

      .set('authToken', this.authToken)
      .set('custId', data.custId)
      .set('userType', this.userType)
      .set('Address', data.Address)
      .set('City', data.City)
      .set('Taluka', data.Taluka)
      .set('District', data.District)
      .set('State', data.State)
      .set('Pin_code', data.Pin_code)
      .set('Land_mark', data.Land_mark)
      .set('Property_Type', data.Property_Type)
      .set('Land_Area', data.Land_Area)
      .set('Built_up_area', data.Built_up_area)
      .set('Ownership_type', data.Ownership_type)
      .set('Land_type', data.Land_type)
      .set('Construction_stage', data.Construction_stage)
      .set('ConstructionStagePercent', data.ConstructionStagePercent)
      .set('Approx_value', data.Approx_value)

    return this.http.put(`${this.url}/udpate/custProperty`, params)
  }

  /**
   * CUSTOMER INSURANCE DETAILS METHODS
   */

  public getCustomerInsuranceDetails(custId): any {
    let body = {
      authToken: this.authToken
    }
    let myResponse = this.http.post(`${this.url}/get/customerIns/${custId}`, body);

    return myResponse;
  }

  public addCustInsuranceDetails(data): Observable<any> {
    const params = new HttpParams()
      .set('authToken', this.authToken)
      .set('custId', data.custId)
      .set('userType', this.userType)
      .set('Policy_no', data.Policy_no)
      .set('Policy_name', data.Policy_name)
      .set('Issued_By', data.Issued_By)
      .set('Maturity_date', data.Maturity_date)
      .set('Policy_value', data.Policy_value)
      .set('Policy_Type', data.Policy_Type)
      .set('Premium', data.Premium)

    return this.http.post(`${this.url}/add/custIns`, params)
  }

  public updateCustInsuranceDetails(data): Observable<any> {
    const params = new HttpParams()
      .set('authToken', this.authToken)
      .set('custId', data.custId)
      .set('userType', this.userType)
      .set('Policy_no', data.Policy_no)
      .set('Policy_name', data.Policy_name)
      .set('Issued_By', data.Issued_By)
      .set('Maturity_date', data.Maturity_date)
      .set('Policy_value', data.Policy_value)
      .set('Policy_Type', data.Policy_Type)
      .set('Premium', data.Premium)

    return this.http.put(`${this.url}/udpate/custIns`, params)
  }

  /**
   * CUSTOMER LOAN REQUIREMENT DETAILS METHODS
   */

  public getCustomerLoanReqDetails(custId): any {
    let body = {
      authToken: this.authToken
    }
    let myResponse = this.http.post(`${this.url}/get/customerLoanReq/${custId}`, body);

    return myResponse;
  }

  public addLoanReq(data): Observable<any> {
    const params = new HttpParams()
      .set('authToken', this.authToken)
      .set('custId', data.custId)
      .set('userType', this.userType)
      .set('Purpose_of_Loan', data.Req_Purpose_of_Loan)
      .set('Loan_Amount', data.Req_Loan_Amount)
      .set('Loan_Tenure', data.Req_Loan_Amount)
      .set('Interest_Option', data.Req_Interest_Option)
      .set('Payment_Method', data.Req_Payment_Method)

    return this.http.post(`${this.url}/add/custLoanreq`, params)
  }

  public updateLoanReq(data): Observable<any> {
    const params = new HttpParams()
      .set('authToken', this.authToken)
      .set('custId', data.custId)
      .set('userType', this.userType)
      .set('Purpose_of_Loan', data.Purpose_of_Loan)
      .set('Loan_Amount', data.Loan_Amount)
      .set('Loan_Tenure', data.Loan_Amount)
      .set('Interest_Option', data.Interest_Option)
      .set('Payment_Method', data.Payment_Method)

    return this.http.put(`${this.url}/update/custLoanreq`, params)
  }

  /**
   * CUSTOMER LOAN AMOUNT DETAILS METHODS
   */

  public getCustomerLoanAmtDetails(custId): any {
    let body = {
      authToken: this.authToken
    }
    let myResponse = this.http.post(`${this.url}/get/customerLoanAmt/${custId}`, body);

    return myResponse;
  }

  public addLoanAmtDetails(data): Observable<any> {
    const params = new HttpParams()
      .set('authToken', this.authToken)
      .set('custId', data.custId)
      .set('userType', this.userType)
      .set('Land_cost', data.Land_cost)
      .set('Agreement_value', data.Agreement_value)
      .set('Amenities_agreement', data.Amenities_agreement)
      .set('Stamp_Duty_Reg_Charge', data.Stamp_Duty_Reg_Charge)
      .set('Cost_of_Contruction_Ext_Imp', data.Cost_of_Contruction_Ext_Imp)
      .set('Incidental', data.Incidental)
      .set('Total_Requirement_funds', data.Total_Requirement_funds)
      .set('Amount_spent', data.Amount_spent)
      .set('Balance_fund', data.Balance_fund)
      .set('Savings', data.Savings)
      .set('Disposal_of_asset', data.Disposal_of_asset)
      .set('Family', data.Family)
      .set('Others', data.Others)
      .set('Total_balance_fund', data.Total_balance_fund)
      .set('Loan_requirement', data.Loan_requirement)
      .set('Total_source_of_funds', data.Total_source_of_funds)

    return this.http.post(`${this.url}/add/custLoanAmt`, params)
  }

  public updateLoanAmtDetails(data): Observable<any> {
    const params = new HttpParams()
      .set('authToken', this.authToken)
      .set('custId', data.custId)
      .set('userType', this.userType)
      .set('Land_cost', data.Land_cost)
      .set('Agreement_value', data.Agreement_value)
      .set('Amenities_agreement', data.Amenities_agreement)
      .set('Stamp_Duty_Reg_Charge', data.Stamp_Duty_Reg_Charge)
      .set('Cost_of_Contruction_Ext_Imp', data.Cost_of_Contruction_Ext_Imp)
      .set('Incidental', data.Incidental)
      .set('Total_Requirement_funds', data.Total_Requirement_funds)
      .set('Amount_spent', data.Amount_spent)
      .set('Balance_fund', data.Balance_fund)
      .set('Savings', data.Savings)
      .set('Disposal_of_asset', data.Disposal_of_asset)
      .set('Family', data.Family)
      .set('Others', data.Others)
      .set('Total_balance_fund', data.Total_balance_fund)
      .set('Loan_requirement', data.Loan_requirement)
      .set('Total_source_of_funds', data.Total_source_of_funds)

    return this.http.put(`${this.url}/update/custLoanAmt`, params)
  }
}
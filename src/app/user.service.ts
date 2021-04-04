import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient, HttpEventType, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { Cookie } from "ng2-cookies/ng2-cookies";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private url = 'http://localhost:3000/api/v1';

  public authToken = Cookie.get('authToken')
  public FranchiseeId = Cookie.get('FranchiseeId')
  public userType = Cookie.get('userType');

  percentDone: number;
  uploadSuccess: boolean;

  constructor(public http: HttpClient) { }

  public getUserInfoFromLocalstorage = () => {
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  public setUserInfoInLocalStorage = (data) => {
    localStorage.setItem('userInfo', JSON.stringify(data))
  }

  public loginFunction(data): Observable<any> {

    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);

    return this.http.post(`${this.url}/login`, params);
  }

  public logout(): Observable<any> {

    const params = new HttpParams()
      .set('FranchiseeId', this.FranchiseeId)
      .set('authToken', this.authToken)

    return this.http.post(`${this.url}/logout`, params);
  }

  public signUpFunction(data): Observable<any> {

    const params = new HttpParams()
      .set('firstName', data.firstName)
      .set('middleName', data.middleName)
      .set('lastName', data.lastName)
      .set('mobile', data.mobile)
      .set('email', data.email)
      .set('password', data.password)

    return this.http.post(`${this.url}/signup`, params);
  }

  public getProfilePicture(FranchiseeId): any {
    let body = {
      authToken: this.authToken,
      userType: this.userType,
      FranchiseeId: FranchiseeId
    }

    let myResponse = this.http.post(`${this.url}/get/ProfilePicture`, body)
    console.log(myResponse);

    return myResponse;
  }

  public UploadProfilePicture(files: File): any {
    console.log(files)

    var formData = new FormData();
    formData.append("image", files)
    console.log(this.FranchiseeId);

    formData.append("FranchiseeId", this.FranchiseeId)

    let myResponse = this.http.post(`${this.url}/uploadProfilePic`, formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
          return myResponse;
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
          console.log(myResponse);

          return myResponse;
        }
      });
  }

  public UpdateProfilePicture(files: File, AssetToDelete: string): any {
    console.log(files)

    var formData = new FormData();
    formData.append("image", files)
    console.log(this.FranchiseeId);

    formData.append("FranchiseeId", this.FranchiseeId)
    formData.append("AssetToDelete", AssetToDelete)

    let myResponse = this.http.put(`${this.url}/updateProfilePic`, formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
          return myResponse;
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
          console.log(myResponse);

          return myResponse;
        }
      });
  }

  public getAllFranchisee(): any {

    let body = {
      authToken: this.authToken,
      userType: this.userType
    }

    let myResponse = this.http.post(`${this.url}/franchisee/all`, body)
    console.log(myResponse);

    return myResponse;
  }

  public getFranchiseeDetailsbyId(id): any {
    let body = {
      authToken: this.authToken,
      userType: this.userType,
      FranchiseeId: id
    }
    let myResponse = this.http.post(`${this.url}/get/franchisee`, body);
    console.log(id);

    return myResponse;
  }

  public updateFranchiseeDetails(data): Observable<any> {

    console.log(data);

    const params = new HttpParams()

      .set('authToken', this.authToken)
      .set('FranchiseeId', data.FranchiseeId)
      .set('firstName', data.firstName)
      .set('middleName', data.middleName)
      .set('lastName', data.lastName)
      .set('dateOfBirth', data.dateOfBirth)
      .set('gender', data.gender)
      .set('pan', data.PAN)
      .set('aadhar', data.Aadhar)
      .set('homeAddress', data.homeAddress)
      .set('city', data.city)
      .set('taluka', data.taluka)
      .set('district', data.district)
      .set('pinCode', data.pinCode)
      .set('AddState', data.AddState)

    return this.http.put(`${this.url}/FranAdditional`, params);
  }

  public getFranchiseeOfficeDetails(id): any {

    let body = {
      authToken: this.authToken,
      FranchiseeId: id
    }

    let myResponse = this.http.post(`${this.url}/get/FranOfficeDetails`, body);
    console.log(myResponse);

    return myResponse;
  }

  public addFranOfficeDetails(data): Observable<any> {

    const params = new HttpParams()

      .set('authToken', Cookie.get('authToken'))
      .set('FranchiseeId', Cookie.get('FranchiseeId'))
      .set('franOffName', data.OfficeName)
      .set('OffNumber', data.OffNumber)
      .set('OffType', data.OffType)
      .set('OfficeAddress', data.OffAddress)
      .set('Officecity', data.OffCity)
      .set('Officetaluka', data.OffTaluka)
      .set('Officedistrict', data.OffDistrict)
      .set('OfficepinCode', data.OffPinCode)
      .set('OfficeState', data.OffState)

    return this.http.post(`${this.url}/FranOfficeDetails`, params)
  }

  public updateFranOfficeDetails(data): any {
    console.log(data);

    const params = new HttpParams()

      .set('authToken', this.authToken)
      .set('FranchiseeId', data.FranchiseeId)
      .set('franOffName', data.franOffName)
      .set('OffNumber', data.OffNumber)
      .set('OffType', data.OffType)
      .set('OfficeAddress', data.OfficeAddress)
      .set('Officecity', data.Officecity)
      .set('Officetaluka', data.Officetaluka)
      .set('Officedistrict', data.Officedistrict)
      .set('OfficepinCode', data.OfficepinCode)
      .set('OfficeState', data.OfficeState)

    return this.http.put(`${this.url}/updateFranOfficeDetails`, params);
  }

  public getFranchiseeBankDetails(id): any {

    let body = {
      authToken: this.authToken,
      FranchiseeId: id
    }

    let myResponse = this.http.post(`${this.url}/get/FranBankDetails`, body);
    console.log(myResponse);

    return myResponse;
  }

  public addFranBankDetails(data): Observable<any> {
    const params = new HttpParams()

      .set('authToken', this.authToken)
      .set('FranchiseeId', data.FranchiseeId)
      .set('Bank_Name', data.bankName)
      .set('Account_Number', data.AccountNumber)
      .set('Account_Type', data.AccountType)
      .set('IFSC', data.IFSC)
      .set('Branch_Address', data.Branch_Address)
      .set('Bank_City', data.BankCity)
      .set('Bank_Taluka', data.BankTaluka)
      .set('Bank_District', data.BankDistrict)
      .set('Bank_PinCode', data.BankPinCode)
      .set('Bank_State', data.BankState)

    return this.http.post(`${this.url}/FranBankDetails`, params);
  }

  public updateFranBankDetails(data): any {
    console.log(data);

    const params = new HttpParams()

      .set('authToken', this.authToken)
      .set('FranchiseeId', data.FranchiseeId)
      .set('Account_Number', data.Account_Number)
      .set('Bank_Name', data.Bank_Name)
      .set('IFSC', data.IFSC)
      .set('Branch_Address', data.Branch_Address)
      .set('Bank_Taluka', data.Bank_Taluka)
      .set('Bank_City', data.Bank_City)
      .set('Bank_District', data.Bank_District)
      .set('Bank_PinCode', data.Bank_PinCode)
      .set('Bank_State', data.Bank_State)
      .set('Account_Type', data.Account_Type)

    return this.http.put(`${this.url}/updateFranBankDetails`, params);
  }
}
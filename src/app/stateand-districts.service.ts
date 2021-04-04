import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StateandDistrictsService { 

  constructor(public http: HttpClient) { }

  public getStateandDistrictList(): Observable<any> {

    let List = this.http.get("assets/State_Districts.json")
    console.log(List);
    
    return List;
  }
}

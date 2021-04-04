import { Component, OnInit, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { UserService } from "../user.service";
import { CustomerService } from "../customer.service";
import { Cookie } from "ng2-cookies";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit, OnDestroy {
  @ViewChildren(DataTableDirective)
  dtElements: QueryList<unknown>;

  dtTrigger: Subject<unknown> = new Subject();
  dtOptions: DataTables.Settings[] = [];

  public authToken: any;
  public FranchiseeDetails: any;
  public FranchiseeId: any;
  public FranchiseeName: any;
  public UserType: any;

  public allCustomers: any = [];

  constructor(private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute, public customerService: CustomerService, public userService: UserService) { }


  ngOnInit(): void {
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload')
      location.reload()
    } else {
      localStorage.removeItem('foo')
    }
    this.authToken = Cookie.get('authToken');
    this.FranchiseeId = Cookie.get('FranchiseeId')
    this.FranchiseeDetails = this.userService.getUserInfoFromLocalstorage();
    this.FranchiseeName = Cookie.get('FranchiseeName');
    this.UserType = Cookie.get('userType');

    this.dtOptions = [{
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true
    }];

    this.getAllCustomers();
  }

  public getAllCustomers: any = () => {

    this.allCustomers = [];

    this.customerService.getAllCustomers().subscribe(

      data => {

        console.log("logging data");
        console.log(data);
        this.allCustomers = data['data'];

        this.dtTrigger.next();

      }, error => {

        console.log("Some error occured");
        console.log(error.errorMessage);
      }
    );
  }

  public goToTables: any = () => {

    this.router.navigate(['/tables'])
  }

  public goToDashBoard = () => {
    this.router.navigate(['/panel'])
  }

  public goToFranchisees=()=>{
    this.router.navigate(['/franchisees'])
  }

  public goToAddCustBasicDetails=()=>{
    this.router.navigate(['/addCustomerBasic'])
  }

  public goToProfile=()=>{
    this.router.navigate(['/profile'])
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

  ngOnDestroy(): void {

    // Do not forget to unsubscribe the event    
    this.dtTrigger.unsubscribe();
  }
}
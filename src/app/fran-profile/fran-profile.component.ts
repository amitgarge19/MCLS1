import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fran-profile',
  templateUrl: './fran-profile.component.html',
  styleUrls: ['./fran-profile.component.css']
})
export class FranProfileComponent implements OnInit {
  public authToken: any;
  public currentBank: any;
  public currentOffice: any;
  public currentFranchisee: any;
  public UserType: any;
  public FranchiseeId: any;  // <- FranchiseeId of the current logged in franchisee/admin.
  public currentFranchiseeId: any; // <- FranchiseeId of the franchisee to Search
  public FranchiseeName: any;
  public imageUrl: string;
  public ProfilePicture: any;

  constructor(private _route: ActivatedRoute, public router: Router, public toastr: ToastrService, public userService: UserService) { }

  ngOnInit(): void {
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload')
      location.reload()
    } else {
      localStorage.removeItem('foo')
    }

    this.imageUrl = this.getProfilePicture();

    this.currentFranchiseeId = this._route.snapshot.paramMap.get('FranchiseeId');
    console.log(this.currentFranchiseeId);

    this.userService.getFranchiseeDetailsbyId(this.currentFranchiseeId).subscribe(

      data => {
        console.log("logging data");
        console.log(data);
        this.currentFranchisee = data["data"];
        console.log(this.currentFranchisee);

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
        this.currentOffice = data["data"];
        console.log(this.currentOffice);

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
        this.currentBank = data["data"];
        console.log(this.currentBank);

      },
      error => {

        console.log("Some error occured");
        console.log(error.errorMessage);
      }
    );
  }


  public getProfilePicture: any = () => {
    this.userService.getProfilePicture(this.currentFranchiseeId).subscribe(
      data => {
        console.log("logging data");
        console.log(data);
        this.ProfilePicture = data["data"];
        console.log(this.ProfilePicture);
        this.imageUrl = this.ProfilePicture.url;
      },
      error => {
        console.log("Some error occured");
        console.log(error.errorMessage);
      }
    )
  }
  public goToProfile: any = () => {
    this.router.navigate(['/profile'])
  }

  public goToTables: any = () => {
    this.router.navigate(['/tables'])
  }
  public goToEditFranProfile: any = () => {
    this.router.navigate(['/franProfileEdit', this.currentFranchiseeId]);
  }

  public goToAdditionalDetails: any = () => { }

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
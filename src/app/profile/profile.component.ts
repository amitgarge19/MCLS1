import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from "../user.service";
import { Cookie } from "ng2-cookies";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnChanges {

  public authToken: any;
  public FranchiseeDetails: any;

  public currentBank: any;
  public currentOffice: any;

  public file: File;
  public imageUrl1: string;

  public formData: FormData;
  public fileId: any;
  public fileSelected: FileList;
  public ProfilePicture1: any;

  public FranchiseeId: any;
  public FranchiseeName: any;
  public UserType: any;
  public City: any;
  public District: any;
  public State: any;

  constructor(private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute, public userService: UserService) { }

  ngOnInit(): void {

    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload');
      location.reload();
    } else {
      localStorage.removeItem('foo');
    }
    
    this.authToken = Cookie.get('authToken');
    this.FranchiseeId = Cookie.get('FranchiseeId');
    this.FranchiseeDetails = this.userService.getUserInfoFromLocalstorage();

    this.FranchiseeName = Cookie.get('FranchiseeName');
    this.UserType = Cookie.get('userType');
    this.City = this.FranchiseeDetails.city;
    this.District = this.FranchiseeDetails.district;
    this.State = this.FranchiseeDetails.AddState;
    this.imageUrl1 = this.getProfilePicture();

    this.userService.getFranchiseeOfficeDetails(this.FranchiseeId).subscribe(

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
    this.userService.getFranchiseeBankDetails(this.FranchiseeId).subscribe(

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

  ngOnChanges(): void {
    this.imageUrl1 = this.ProfilePicture1.url;
  }



  public goToTables: any = () => {
    this.router.navigate(['/tables'])
  }

  public goToAdditionalDetails: any = () => {
    this.router.navigate(['/franaddionform']);
  }

  public goToEditProfile: any = () => {
    this.router.navigate(['/franProfileEdit/', this.FranchiseeId])
  }

  public getProfilePicture: any = () => {
    this.userService.getProfilePicture(this.FranchiseeId).subscribe(
      data => {
        console.log("logging data");
        console.log(data);
        this.ProfilePicture1 = data["data"];
        console.log(this.ProfilePicture1);
        this.imageUrl1 = this.ProfilePicture1.url;
      },
      error => {
        console.log("Some error occured");
        console.log(error.errorMessage);
      } 
    )
  }

  public fileChange: any = (event) => {

    this.fileSelected = event.target.files;

    if (this.fileSelected.length > 0) {
      this.file = this.fileSelected[0];
      console.log(this.file);
      this.upload();
    }
  }

  public upload: any = () => {

    if (this.imageUrl1) {

      this.userService.UpdateProfilePicture(this.file, this.ProfilePicture1.public_id)

      this.getProfilePicture();


    } else {
      this.userService.UploadProfilePicture(this.file)

      this.getProfilePicture();

    }
  }

  public goToProfile: any = () => {
    this.router.navigate(['/profile']);
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
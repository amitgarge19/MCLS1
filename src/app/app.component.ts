import { Component,OnInit } from '@angular/core';
import { CookieService } from 'ng2-cookies';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { interval, Subscription } from "rxjs";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'admin';

  private updateSubscription: Subscription;
  public check:boolean;
  public authToken: any;

  ngOnInit(){
    this.check=this.checkStatus();
  }

  public checkStatus: any = () => {

    if (Cookie.get('authToken') === undefined || Cookie.get('authToken') === '' || Cookie.get('authToken') === null) {      
      return false;
    } else {
      return true;
    }
  } // end checkStatus */
}

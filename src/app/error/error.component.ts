import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit{  
  public error_number: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    let num= this.route.snapshot.params.error_number;
    this.error_number=num;    
    console.log(this.error_number);
    
  }
}
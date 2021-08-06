import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit {
  isExpanded: boolean = true;
  isExpanded1: boolean = false;
  name:any;
  constructor() {
    this.name =localStorage.getItem("username")
   }

  ngOnInit(): void {
  }

}

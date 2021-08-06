import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  gridColumns = 3;
  isExpanded: boolean = true;
  isExpanded1: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit {
  @ViewChild(MatSidenav)
 sidenav!: MatSidenav;
  isExpanded: boolean = true;
  isExpanded1: boolean = false;
  
  constructor(private authservice: AuthService,public router:Router) { }

  ngOnInit(): void {
  }

}

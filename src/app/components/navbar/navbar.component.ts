import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {


  routes:any = [
    {
      id:1,
      url:'http://localhost:4200?id=1'
    },
    {
      id:2,
      url:'http://localhost:4200?id=1'
    },
    {
      id:3,
      url:'http://localhost:4200?id=1'
    },
  ]
  id:any

  constructor(
    private _router: Router,
    ) {}

  ngOnInit(){
     this.id = window.location.search?.split('=')[1]
  }
}
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { CommentsComponent } from './features/comments/components/comments/comments.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommentsComponent,
    NavbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angular-app';
  constructor(private router: Router) {}

  
  ngOnInit(): void {
    initFlowbite();
    const id = window.location.search.split('=')[1];
    if(!id){
      this.router.navigate(['/'], { queryParams: { id: 1 } });
    }
  }
}

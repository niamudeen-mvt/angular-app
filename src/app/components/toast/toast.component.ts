import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";




@Component({
  selector:'custom-modal',
  standalone:true,
  imports:[CommonModule],
  templateUrl:'./toast.component.html'
})
export class CustomModalComponent implements OnInit{
  
  
  @Input() activeComment:any
  @Output() closeModal  = new EventEmitter<any>()
  @Output() deleteComment = new EventEmitter<any>();


  ngOnInit(): void {
  }
}
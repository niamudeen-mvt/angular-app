import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import moment from "moment";
import { CommentFormComponent } from "../commentForm/comment-form.component";
import { ActivatedRoute } from "@angular/router";


@Component({
  selector:'comment',
  standalone:true,
  imports:[CommonModule,CommentFormComponent],
  templateUrl:'./comment.component.html'
})
export class CommentComponent implements OnInit{
  @Input() comment:any
  @Input() currentUserId:any
  @Input() activeComment:any
  @Input() canReply:any
  
  
  @Output() setActiveComment = new EventEmitter<any>();
  @Output() updateComment = new EventEmitter<any>();
  @Output() addComment = new EventEmitter<any>();
  @Output() showModal = new EventEmitter<any>();
  
  showActionButtons:boolean = false
  showCommentForm:boolean = false
  showReplies:boolean = false
  
  constructor(private _router: ActivatedRoute){}
  
  ngOnInit(): void {
   
  }

  convertDate(date:string){
    const currentTime = moment();
    const pastTime = moment(date);
    return pastTime.from(currentTime)
    // return new Date(date).toLocaleString()
  }

  edit(comment_id:number){
   this.setActiveComment.emit({
        id:comment_id,
        type: 'EDIT'
   })
   this.showActionButtons = false
   this.showCommentForm = true
  }
  
  
  reply( comment_id:any){
    this.setActiveComment.emit({
      id:comment_id,
      type: 'REPLY'
  })
  this.showActionButtons = false
  this.showCommentForm = true
  }

  isEditing(comment_id:number):boolean{
    if (!this.activeComment) {
      return false;
    }
    return this.activeComment?.id == comment_id && this.activeComment?.type == 'EDIT'
  }


  isReplying(comment_id:number):boolean{
    if (!this.activeComment) {
      return false;
    }
    return this.activeComment?.id == comment_id && this.activeComment?.type == 'REPLY'
  }
  
  showButtons(){
    this.showActionButtons = !this.showActionButtons
  }

}
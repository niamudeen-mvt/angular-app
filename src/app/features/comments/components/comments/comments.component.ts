import { Component, OnInit } from "@angular/core";
import { CommentFormComponent } from "../commentForm/comment-form.component";
import { CommentsService } from "../../../../services/comments.service";
import { Subject, takeUntil } from "rxjs";
import { CommentComponent } from "../comment/comment.component";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { CustomModalComponent } from "../../../../components/toast/toast.component";


@Component({
  selector:'comments',
  imports:[CommentFormComponent,CommentComponent,CommonModule,CustomModalComponent],
  standalone:true,
  templateUrl:'./comments.component.html'
})
export class CommentsComponent implements OnInit{

  private destroy$ = new Subject<void>();


  comments:any
  currentUserId:number = 0;
  activeComment: any;
  showModal:boolean = false

  constructor(
    private _commentService: CommentsService,
    private _router : ActivatedRoute
    ){}

  ngOnInit(): void {
    const id = window.location.search?.split('=')[1]
    if(id){
      this.currentUserId = parseInt(id)
    }
    this.getComments()
  }

  getComments(){
    this._commentService
    .fetchComments()
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (data)=>{
        this.comments = data?.comments.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    )
  }


  addComment(event:any){
    const {comment, parent_id, type, tag_id} = event

    console.log('comment: ', comment);
    console.log('this.currentUserId: ', this.currentUserId);
    if(this.currentUserId && comment){
      this._commentService
      .postComments(comment,this.currentUserId,parent_id,type,tag_id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data)=>{
          this.getComments()
          this.activeComment = null
        },
        (error) => {
          console.error('An error occurred:', error);
        }
      )
    }
  }

  updateComment(event:any){
    const { comment_id, comment} = event
    if(comment_id && comment){
      this._commentService
        .editComments(comment_id,comment)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data)=>{
            this.getComments()
            this.activeComment = null
          },
          (error) => {
            console.error('An error occurred:', error);
          }
        )
    }

  }

  deleteComment(comment_id:any):void{
    if(comment_id){
      this._commentService
        .deleteComments(comment_id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data)=>{
            this.getComments()
            this.showModal = false
          },
          (error) => {
            console.error('An error occurred:', error);
          }
        )
    }
  }

  setActiveComment(activeComment:any): void {
    this.activeComment = activeComment;
  }

  closeModal(event:any){
    this.showModal = event
  }
  
  openModal(event:any){
    this.showModal = event?.show
    this.activeComment = event?.comment
  }
}
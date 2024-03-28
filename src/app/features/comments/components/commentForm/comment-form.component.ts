import { Component, EventEmitter, Input, OnInit, Output, input } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";



@Component({
  selector:'comment-form',
  standalone:true,
  imports:[ReactiveFormsModule],
  templateUrl:'./comment-form.component.html'
})
export class CommentFormComponent implements OnInit{
  
  @Input() showCommentForm:any;
  @Input() submitLabel!: string;
  @Input() initialText: string = '';



  @Output() handleSubmit = new EventEmitter<any>();
  @Output() close = new EventEmitter<any>();
  @Output() handleCancel = new EventEmitter<void>();
  
  form!:FormGroup;
  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
      this.form = this.fb.group({
        title:[this.initialText,Validators.required]
      })
  }

  onSubmit(): void {
    this.handleSubmit.emit(this.form.value.title);
    this.form.reset();
  }

  closeForm(){
    this.close.emit(false)
  }
}
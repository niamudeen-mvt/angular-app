import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FETCH_COMMENTS } from '../utils/api-constants';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private headers: HttpHeaders

  constructor(private _http:HttpClient) {
    this.headers = new HttpHeaders({
      "Content-Type":"application/json"
    })
   }

   
  fetchComments():Observable<any>{
       return this._http.get(`${FETCH_COMMENTS}`,{
         headers:this.headers
       }).pipe(map(res =>res));
  }

  getCommentById(comment_id:any):Observable<any>{
    return this._http.get(`${FETCH_COMMENTS}/${comment_id}`,{
      headers:this.headers
    }).pipe(map(res =>res));
  }

  postComments(body:string='', user_id:number = 2, parent_id:number = 0,type:any,tag_id:any): Observable<any>{
    return this._http.post(`${FETCH_COMMENTS}`,{body,user_id,parent_id,type,tag_id},{
      headers:this.headers
    }).pipe(map(res =>res));
  }

  editComments(comment_id:any, body:string=''): Observable<any>{
    return this._http.patch(`${FETCH_COMMENTS}/${comment_id}`,{body},{
      headers:this.headers
    }).pipe(map(res =>res));
  }

  deleteComments(comment_id:any): Observable<any>{
    return this._http.delete(`${FETCH_COMMENTS}/${comment_id}`,{
      headers:this.headers
    }).pipe(map(res =>res));
  }

}

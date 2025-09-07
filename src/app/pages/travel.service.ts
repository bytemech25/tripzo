import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface tripzoContact {
  name:string;
  email:string;
  phone:string;
  destination:string;
  message:string;
}

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  private apiUrl = 'http://localhost:8080/contact';

  constructor(private http: HttpClient) { }


addContact (payload: tripzoContact):Observable<any>{
  return this.http.post(this.apiUrl, payload,{ responseType: 'text'});
}


}

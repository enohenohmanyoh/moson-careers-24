import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({providedIn: 'root'})
export class ContactService {

  private apiUrl = 'http://localhost:8080/api/mail';


  constructor(private http: HttpClient) {
  }

  sendMail(mail: any) {
    return this.http.post(`${this.apiUrl}`, mail)
  }


}

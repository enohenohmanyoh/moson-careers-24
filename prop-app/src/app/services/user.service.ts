import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({providedIn: 'root'})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/user';


  constructor(private http: HttpClient) {
  }

  saveUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, user)
  }

  updateUser(user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}`, user)
  }

  getUserByEmail(userEmail: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?email=${userEmail}`)
  }
}

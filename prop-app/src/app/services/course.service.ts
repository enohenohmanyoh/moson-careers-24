import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({providedIn: 'root'})
export class CourseService {

  private apiUrl = 'http://localhost:8080/api/courses';


  constructor(private http: HttpClient) {
  }

  getAllCourses(page = 0, size = 25, sort = 'createdAt,desc'): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}&size=${size}&sort=${sort}`)
  }

  createCourse(course: any) {
    return this.http.post(`${this.apiUrl}`, course)
  }

  updateCourse(course: any) {
    return this.http.put(`${this.apiUrl}`, course)
  }

  getCourseById(courseId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${courseId}`)
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {CourseService} from "../../services/course.service";
import {SweetAlertMessage} from "../../services/sweet.alert";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';


@Component({
  selector: 'app-view-course',
  standalone: true,
  providers: [CourseService, SweetAlertMessage],
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './view-course.component.html',
  styleUrl: './view-course.component.css'
})
export class ViewCourseComponent implements OnInit {

  @Input() course: any = null;
  selectedModuleIndex = 0;
  existingCourseId: string = ''

  constructor(private courseService: CourseService, private sweetAlertMessage: SweetAlertMessage,
              private router: Router, private activatedRouter: ActivatedRoute,
              private sanitizer: DomSanitizer) {
    this.existingCourseId = this.activatedRouter.snapshot.paramMap.get('courseId')!;
  }

  ngOnInit(): void {

    if (this.existingCourseId) {
      this.getCourseById(this.existingCourseId);
    }
    if (this.course && this.course.modules.length > 0) {
      this.selectedModuleIndex = 0;
    }
  }

  selectModule(index: number) {
    this.selectedModuleIndex = index;
  }

  getCourseById(id: string) {
    this.courseService.getCourseById(id).subscribe(response => {
      this.course = response.data;
    }, error => {
      const errorMessage = error?.error?.error;
      this.sweetAlertMessage.bannerMessage(errorMessage, 'warning');
    });
  }

  getSafeYouTubeUrl(url: string): SafeResourceUrl {
    let videoId = '';
    if (url.includes('youtu.be')) {
      videoId = url.split('youtu.be/')[1];
    } else if (url.includes('v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    }
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
}

import {Component} from '@angular/core';
import {SweetAlertMessage} from "../../services/sweet.alert";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ContactService} from "../../services/contact.service";

@Component({
  selector: 'app-about',
  standalone: true,
  providers: [SweetAlertMessage, ContactService],
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  contactData = {
    fullName: '',
    email: '',
    phone: '',
    message: ''
  };


  constructor(private contactService: ContactService, private sweetAlertMessage: SweetAlertMessage) {
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  onSubmit() {
    this.sweetAlertMessage.showLoading();
    if (this.isValidEmail(this.contactData.email)) {
      this.contactService.sendMail(this.contactData).subscribe(response => {
        this.sweetAlertMessage.bannerMessage('Email sent successful', 'success')
        this.contactData = {
          fullName: '',
          email: '',
          phone: '',
          message: ''
        };
      }, error => {
        const errorMessage = error?.error?.error;
        this.sweetAlertMessage.bannerMessage(errorMessage, 'warning')
      });
    } else {
      this.sweetAlertMessage.bannerMessage('Invalid Email', 'warning')
    }

  }
}

import {Injectable} from "@angular/core";
import Swal, {SweetAlertIcon} from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class SweetAlertMessage {


  showSuccessMessage(message: string) {
    return Swal.fire({
      title: "Success",
      text: message,
      icon: "success"
    });
  }

  confirmation(title: string, message: string) {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    });
  }


  bannerMessage(message: string, type: SweetAlertIcon = 'success') {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: type,
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }

  showLoading() {
    Swal.fire({
      title: 'Please wait...',
      html: 'Processing your request',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  }

  closeBox() {
    Swal.close();
  }

}

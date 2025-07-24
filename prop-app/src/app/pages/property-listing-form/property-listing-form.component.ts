// property-listing-form.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-property-listing-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './property-listing-form.component.html',
  styleUrls: ['./property-listing-form.component.css']
})
export class PropertyListingFormComponent {
  userTypeOptions = ['Landlord', 'Seller', 'Investor', 'Other'];
  branchOptions = ['Head Office', 'Cape Town', 'Johannesburg', 'Durban', 'Pretoria'];
  listingTypeOptions = ['For Sale', 'For Rent', 'Commercial Lease'];
  
  formData = {
    userType: '',
    branch: '',
    name: '',
    contactNumber: '',
    email: '',
    listingType: '',
    askingPrice: '',
    propertyAddress: '',
    propertyDescription: '',
    subscribeToNewsletter: false,
    images: [] as File[]
  };

  showPreview = false;
  imagePreviews: string[] = [];
  maxImages = 50;

  isFormValid(): boolean {
    return (
      this.formData.userType !== '' &&
      this.formData.branch !== '' &&
      this.formData.name !== '' &&
      this.formData.contactNumber !== '' &&
      this.formData.email !== '' &&
      this.formData.listingType !== '' &&
      this.formData.askingPrice !== '' &&
      this.formData.propertyAddress !== '' &&
      this.formData.propertyDescription !== ''
    );
  }

  onImageUpload(event: any) {
    const files = event.target.files;
    const remainingSlots = this.maxImages - this.formData.images.length;
    
    if (files.length > remainingSlots) {
      alert(`You can only upload ${remainingSlots} more images.`);
      return;
    }

    for (let i = 0; i < Math.min(files.length, remainingSlots); i++) {
      const file = files[i];
      this.formData.images.push(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(index: number) {
    this.formData.images.splice(index, 1);
    this.imagePreviews.splice(index, 1);
  }

  onSubmit() {
    // Here you would typically send the formData to your backend
    console.log('Form submitted:', this.formData);
    alert('Your property has been listed successfully!');
    
    // Reset form
    this.resetForm();
  }

  resetForm() {
    this.formData = {
      userType: '',
      branch: '',
      name: '',
      contactNumber: '',
      email: '',
      listingType: '',
      askingPrice: '',
      propertyAddress: '',
      propertyDescription: '',
      subscribeToNewsletter: false,
      images: []
    };
    this.imagePreviews = [];
    this.showPreview = false;
  }

  goBackToEdit() {
    this.showPreview = false;
  }
}
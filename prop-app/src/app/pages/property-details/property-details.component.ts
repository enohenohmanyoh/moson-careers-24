import { Component, inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { ActivatedRoute } from '@angular/router';
import { Property } from '../../model/property.model';
import { CommonModule } from '@angular/common';
import { GalleryModule, GalleryItem, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [CommonModule, GalleryModule],
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css'],
})
export class PropertyDetailsComponent implements OnInit {
  private propertyService = inject(PropertyService);
  private route = inject(ActivatedRoute);

  @ViewChild('printSection') printSectionRef!: ElementRef;

  property: Property | undefined;
  galleryItems: GalleryItem[] = [];

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.property = this.propertyService.getPropertyById(id);

    if (this.property?.images && this.property.images.length > 0) {
      this.galleryItems = this.property.images.map(
        (url) => new ImageItem({ src: url, thumb: url })
      );
    }
  }

  printPage(): void {
    const printContents = this.printSectionRef.nativeElement.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  }

  sharePage(): void {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        text: 'Check out this property!',
        url: window.location.href,
      }).catch((err) => {
        console.error('Sharing failed', err);
      });
    } else {
      alert('Sharing is not supported in this browser.');
    }
  }

  downloadPDF(): void {
   
    this.printPage();
  }
}

import { Component, OnInit } from '@angular/core';
import { PropertySliderComponent } from "../../component/property-slider/property-slider.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone:true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [PropertySliderComponent,CommonModule]
})
export class HomeComponent implements OnInit {
  heroImages: string[] = [
    '/assets/images/header-image.jpg',
    '/assets/images/header-image2.jpg',
    '/assets/images/header-image3.jpg',
    '/assets/images/header-image4.jpg',
    '/assets/images/header-image5.jpg',
    '/assets/images/header-image6.jpg'
  ];
  currentImageIndex = 0;

  ngOnInit(): void {
    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.heroImages.length;
    }, 4000); 
  }

  getHeroBackground(): string {
    return `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${this.heroImages[this.currentImageIndex]}')`;
  }
}

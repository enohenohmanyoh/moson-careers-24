import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertySliderComponent } from "../../component/property-slider/property-slider.component";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, PropertySliderComponent]
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

  heroImages1: string[] = [
    '/assets/images/sell.jpg',
    '/assets/images/sell1.jpg',
    '/assets/images/sell5.jpg',
    '/assets/images/sell2.jpg',
    '/assets/images/sell3.jpg',
    '/assets/images/sell7.jpg',
  ];

  currentImageIndex = 0;
  currentImageIndex1 = 0;

  ngOnInit(): void {
    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.heroImages.length;
    }, 4000);

    setInterval(() => {
      this.currentImageIndex1 = (this.currentImageIndex1 + 1) % this.heroImages1.length;
    }, 4000);
  }

  getHeroBackground(): string {
    return `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${this.heroImages[this.currentImageIndex]}')`;
  }

  getHeroBackground1(): string {
    return `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${this.heroImages1[this.currentImageIndex1]}')`;
  }
}


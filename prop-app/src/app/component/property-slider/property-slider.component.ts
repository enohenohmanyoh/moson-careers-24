
import { Component, inject } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../model/property.model';
import { PropertyCardComponent } from '../property-card/property-card.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-property-slider',
  standalone: true,
  imports: [CommonModule, PropertyCardComponent, FontAwesomeModule],
  templateUrl: './property-slider.component.html',
  styleUrls: ['./property-slider.component.css']
})
export class PropertySliderComponent {
  private propertyService = inject(PropertyService);
  
  properties: Property[] = this.propertyService.getAllProperties();
  currentSlide = 0;
  currentPosition = 0;
  slideWidth = 0;
  maxSlide = 0;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  constructor() {
    this.calculateSliderMetrics();
  }

  calculateSliderMetrics() {
    // This would ideally be calculated based on viewport width
    // For simplicity, we're using fixed values
    const screenWidth = window.innerWidth;
    
    if (screenWidth >= 992) {
      this.slideWidth = 33.333; // 3 slides visible
    } else if (screenWidth >= 768) {
      this.slideWidth = 50; // 2 slides visible
    } else {
      this.slideWidth = 100; // 1 slide visible
    }
    
    this.maxSlide = Math.ceil(this.properties.length / (100 / this.slideWidth)) - 1;
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.currentPosition += (this.slideWidth / 100) * window.innerWidth;
    }
  }

  nextSlide() {
    if (this.currentSlide < this.maxSlide) {
      this.currentSlide++;
      this.currentPosition -= (this.slideWidth / 100) * window.innerWidth;
    }
  }
}
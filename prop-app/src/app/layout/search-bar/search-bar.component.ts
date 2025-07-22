import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  searchTerm: string = '';
  selectedType: string = 'all';
  selectedLocation: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;

  @Output() searchSubmitted = new EventEmitter<any>();

  propertyTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'house', label: 'Houses' },
    { value: 'apartment', label: 'Apartments' },
    { value: 'townhouse', label: 'Townhouses' },
    { value: 'land', label: 'Land' },
    { value: 'commercial', label: 'Commercial' }
  ];

  locations = [
    'Centurion',
    'Pretoria',
    'Johannesburg',
    'Cape Town',
    'Durban',
    'Bloemfontein',
    'Port Elizabeth'
  ];

  onSubmit() {
    const searchFilters = {
      term: this.searchTerm,
      type: this.selectedType,
      location: this.selectedLocation,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice
    };
    this.searchSubmitted.emit(searchFilters);
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedType = 'all';
    this.selectedLocation = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.onSubmit();
  }
}
import { Injectable } from '@angular/core';
import { Property } from '../model/property.model';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private selectedPropertyId: number | null = null;

  private properties: Property[] = [
    {
      id: 100,
      title: 'Beautiful Sectional Title in Zapiro',
      location: 'Zapiro, George',
      price: 14000,
      type: 'Sectional Title',
      bedrooms: 3,
      bathrooms: 2,
      area: '150m²',
      garages: '2',  
      address: '306 village garden',
      description: 'This stunning property in Irene offers modern living...',
      features: ['Swimming Pool', 'Secure Parking', 'Garden', 'Fibre Ready'],
      images: [
        'assets/images/1.jpg',
        'assets/images/2.jpg',
        'assets/images/3.jpg',
         'assets/images/1.jpg',
         'assets/images/2.jpg'
      ],
      agent: {
        name: 'Abraham Licon',
        phone: '012 345 6789',
        email: 'john@vartrust.co.za'
      }
    },
    {
      id: 102,
      title: 'Beautiful Sectional Title in Tabi',
      location: 'Tabi, Centurion',
      price: 15000,
      type: 'Sectional Title',
      bedrooms: 3,
      bathrooms: 2,
      area: '150m²',
      garages: '2',
      address: '306 village garden',
      description: 'This stunning property in Irene offers modern living...',
      features: ['Swimming Pool', 'Secure Parking', 'Garden', 'Fibre Ready'],
      images: [
        'assets/images/4.jpg',
        'assets/images/5.jpg',
        'assets/images/6.jpg',
           'assets/images/4.jpg',
        'assets/images/5.jpg',
      ],
      agent: {
        name: 'Chris Chat',
        phone: '012 345 6789',
        email: 'john@vartrust.co.za'
      }
    },
    {
      id: 103,
      title: 'Beautiful Sectional Title in Irene',
      location: 'Victoria, Centurion',
      price: 20000,
      type: 'Sectional Title',
      bedrooms: 3,
      bathrooms: 2,
      area: '150m²',
      garages: '2',
      address: '306 village garden',
      description: 'This stunning property in Irene offers modern living...',
      features: ['Swimming Pool', 'Secure Parking', 'Garden', 'Fibre Ready'],
      images: [
        'assets/images/8.jpg',
        'assets/images/9.jpg',
        'assets/images/7.jpg',
        'assets/images/8.jpg',
        'assets/images/9.jpg'
      ],
      agent: {
        name: 'Grace Joke',
        phone: '012 345 6789',
        email: 'john@vartrust.co.za'
      }
    },
    {
      id: 104,
      title: 'Beautiful Sectional Title in Irene',
      location: 'Irene, Centurion',
      price: 12000,
      type: 'Sectional Title',
      bedrooms: 3,
      bathrooms: 2,
      area: '150m²',
      garages: '2',
      address: '306 village garden',
      description: 'This stunning property in Irene offers modern living...',
      features: ['Swimming Pool', 'Secure Parking', 'Garden', 'Fibre Ready'],
      images: [
        'assets/images/houses.jpg',
        'assets/images/5.jpg',
        'assets/images/6.jpg'
      ],
      agent: {
        name: 'John Doe',
        phone: '012 345 6789',
        email: 'john@vartrust.co.za'
      }
    },
    {
      id: 105,
      title: 'Modern Apartment in Centurion',
      location: 'Centurion',
      price: 8500,
      type: 'Apartment',
      bedrooms: 2,
      bathrooms: 1,
      area: '85m²',
      garages: '3-4',
      address: '304 centurion Street',
      description: 'Contemporary apartment with stunning views...',
      features: ['Balcony', 'Secure Parking', '24/7 Security', 'Fibre Ready'],
      images: [
        'assets/images/1.jpg',
        'assets/images/house.jpg',
        'assets/images/6.jpg',
        'assets/images/2.jpg',
        'assets/images/1.jpg',
      ],
      agent: {
        name: 'Jane Smith',
        phone: '012 987 6543',
        email: 'jane@vartrust.co.za'
      }
    },
  ];

  getAllProperties(): Property[] {
    return this.properties;
  }

  getPropertyById(id: number): Property | undefined {
    return this.properties.find(property => property.id === id);
  }

  setSelectedPropertyId(id: number): void {
    this.selectedPropertyId = id;
  }

  getSelectedProperty(): Property | undefined {
    if (this.selectedPropertyId === null) {
      return undefined;
    }
    return this.getPropertyById(this.selectedPropertyId);
  }
}

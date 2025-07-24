import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PropertyDetailsComponent } from './pages/property-details/property-details.component';
import { Component } from '@angular/core';
import { PropertyListingFormComponent } from './pages/property-listing-form/property-listing-form.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
{ path: 'property/:id', component: PropertyDetailsComponent },
{path: "list",component: PropertyListingFormComponent},
{ path: '**', redirectTo: '' },

];

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { GalleryConfig, GALLERY_CONFIG } from 'ng-gallery';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [FontAwesomeModule,
    provideRouter(routes),
    provideAnimations(),FormsModule,HttpClient,
    {
      provide: GALLERY_CONFIG,
      useValue: {
        autoHeight: true,
        imageSize: 'cover'
      } as GalleryConfig
    }
  ]
};
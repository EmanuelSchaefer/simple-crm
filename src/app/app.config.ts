import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({ "projectId": "simple-crm-2839a", "appId": "1:466432760920:web:b0f7b0abe188e5c358be2d", "storageBucket": "simple-crm-2839a.appspot.com", "apiKey": "AIzaSyD7MbZDZmvzJE7FYvGGuSbDvH1SN_arzRo", "authDomain": "simple-crm-2839a.firebaseapp.com", "messagingSenderId": "466432760920" })),
  provideFirestore(() => getFirestore())]
};
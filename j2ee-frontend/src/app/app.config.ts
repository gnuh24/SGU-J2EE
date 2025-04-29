import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { SocialAuthServiceConfig, GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideClientHydration(),
        provideHttpClient(withFetch()),
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider(
                            '632729005032-l9atul83ab2ge9pbvfvh82idg90j7jed.apps.googleusercontent.com'
                        )
                    }
                ],
                onError: (err: any) => {
                    console.error(err);
                }
            } as SocialAuthServiceConfig,
        }, provideAnimationsAsync(),
    ],
};

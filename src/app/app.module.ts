import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// firebase modules
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

// app modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

// others
import { environment } from 'src/environments/environment.development';
import { FirebaseService } from './core/services/firebase.service';
import { take, tap } from 'rxjs/operators';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, AboutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (firebase: FirebaseService) => {
        return () => {
          return firebase.isAuthenticated$.pipe(take(1), tap(console.log));
        };
      },
      deps: [FirebaseService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

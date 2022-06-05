import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { metaReducers, reducers } from './app-store/app.state';
import { EffectsModule } from '@ngrx/effects';
import { CustomSerializer } from './app-store/router/custom-serializer';
import { SettingsEffects } from './app-store/settings/effects/settings.effect';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';


const AngularMaterialModules = [
  MatDividerModule,
  MatMenuModule,
  MatRadioModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatSliderModule,
  MatCheckboxModule
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    
    ...AngularMaterialModules,
    
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({name:"Markdown Editor", maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([SettingsEffects])

  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

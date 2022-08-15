import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from './app.component';
import { HomepageComponent } from './views/homepage/homepage.component';
import { StatsComponent } from './views/stats/stats.component';
import { PrivacyComponent } from './views/privacy/privacy.component';
import { ImpressumComponent } from './views/impressum/impressum.component';
import { FooterComponent } from './components/footer/footer.component';
import { ClarityModule } from '@clr/angular';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    StatsComponent,
    PrivacyComponent,
    ImpressumComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule, FormsModule, AppRoutingModule, HttpClientModule, ClarityModule, BrowserAnimationsModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomepageComponent } from './views/homepage/homepage.component';
import { StatsComponent } from './views/stats/stats.component';
import { PrivacyComponent } from './views/privacy/privacy.component';
import { ImpressumComponent } from './views/impressum/impressum.component';
import { FooterComponent } from './components/footer/footer.component';

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
    BrowserModule, FormsModule, AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './views/homepage/homepage.component';
import { ImpressumComponent } from './views/impressum/impressum.component';
import { PrivacyComponent } from './views/privacy/privacy.component';
import { StatsComponent } from './views/stats/stats.component';

const routes: Routes = [
  { path: 'stats', component: StatsComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: '', pathMatch: "full", component: HomepageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

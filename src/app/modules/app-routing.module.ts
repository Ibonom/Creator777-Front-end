import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '../static/home-page/home-page.component';
import { PodcastSpotifySubsiteComponent } from '../dynamic/podcast-spotify-subsite/podcast-spotify-subsite.component';
import { ErrorNotFoundComponent } from '../static/error-not-found/error-not-found.component';
import { apiRoutes } from './api-routing.module';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'podcast', component: PodcastSpotifySubsiteComponent },
  { path: 'not-found', component: ErrorNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot([...routes, ...apiRoutes])],
  exports: [RouterModule],
})
export class AppRoutingModule {}

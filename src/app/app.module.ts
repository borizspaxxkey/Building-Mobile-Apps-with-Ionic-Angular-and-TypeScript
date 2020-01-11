// Angular
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Ionic
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { AgmCoreModule } from "@agm/core";

// Components
import { MyApp } from './app.component';

// Pages
import { MyTeamsPage } from '../pages/my-teams/my-teams';
import { TeamDetailPage } from '../pages/team-detail/team-detail';
import { TournamentsPage } from '../pages/tournaments/tournaments';
import { StandingsPage } from '../pages/standings/standings';
import { TeamHomePage } from '../pages/team-home/team-home';
import { TeamsPage } from '../pages/teams/teams';
import { GamePage } from '../pages/game/game';

// Services
import { EliteApi } from '../providers/elite-api/elite-api';
import { UserSettings } from '../providers/user-settings/user-settings';
import { MapPage } from '../pages/map/map';

@NgModule({
  declarations: [
    MyApp,
    MyTeamsPage,
    GamePage,
    TeamDetailPage,
    TeamsPage,
    TournamentsPage,
    StandingsPage,
    TeamHomePage,
    MapPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyCCmTtsSJgDAOy7yY7AkrE3YZ4CHLzACa8' })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyTeamsPage,
    GamePage,
    TeamDetailPage,
    TeamsPage,
    TournamentsPage,
    StandingsPage,
    TeamHomePage,
    StandingsPage,
    MapPage,
    TeamHomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    EliteApi,
    UserSettings
  ]
})
export class AppModule { }

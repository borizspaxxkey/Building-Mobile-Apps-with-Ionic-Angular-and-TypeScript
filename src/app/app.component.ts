import { Component, ViewChild } from '@angular/core';
import { Nav, Events, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyTeamsPage } from '../pages/my-teams/my-teams';
import { TournamentsPage } from '../pages/tournaments/tournaments';
import { UserSettings } from '../providers/user-settings/user-settings';
import { EliteApi } from '../providers/elite-api/elite-api';
import { TeamHomePage } from '../pages/team-home/team-home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  favoriteTeams: any[];
  rootPage: any = MyTeamsPage;

  pages: Array<{ title: string, component: any }>;

  constructor(
    private events: Events,
    public platform: Platform,
    private userSettings: UserSettings,
    private loadingCtrl: LoadingController,
    public statusBar: StatusBar,
    private eliteApi: EliteApi,
    public splashScreen: SplashScreen) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.refreshFavorites();
      this.events.subscribe('favorites:changed', () => this.refreshFavorites());
      this.userSettings.initStorage()
        .then(() => this.rootPage = MyTeamsPage);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goHome() {
    this.nav.push(MyTeamsPage);
  }

  goToTournaments() {
    this.nav.push(TournamentsPage);
  }

  refreshFavorites() {
    this.userSettings.getAllFavorites()
      .then(favs => this.favoriteTeams = favs);
  }

  goToTeam(favorite) {
    let loader = this.loadingCtrl.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });
    loader.present();
    this.eliteApi.getTournamentData(favorite.tournamentId).subscribe((list) => {
      this.nav.push(TeamHomePage, favorite.team);
      console.log(list);
    });
  }
}

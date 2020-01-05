import { Component } from '@angular/core';
import { NavController, NavParams, TabHighlight } from 'ionic-angular';
import { MyTeamsPage } from '../my-teams/my-teams';
import { EliteApi } from '../../providers/elite-api/elite-api';

@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {
  public team: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.team = this.navParams.data;
    console.log('*nav params', this.navParams);
  }

}

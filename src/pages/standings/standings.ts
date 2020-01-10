import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EliteApi } from '../../providers/elite-api/elite-api';
import * as _ from 'lodash';
@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class StandingsPage {
  public allStandings: any[];
  public standings: any[];
  public team: any;

  constructor(
    public navCtrl: NavController,
    private eliteApi: EliteApi,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.team = this.navParams.data;
    let tourneyData = this.eliteApi.getCurrentTourney();
    this.standings = tourneyData.standings;

    this.allStandings = tourneyData.standings;

    // this.allStandings =
    //   _.chain(this.standings)
    //     .groupBy('division')
    //     .toPairs()
    //     .map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
    //     .value();

    console.log('standings:', this.standings);
    console.log('division Standings', this.allStandings);
  }

  getHeader(record, recordIndex, records) {
    if (recordIndex === 0 || record.division !== records[recordIndex - 1].division) {
      return record.division;
    }
    return null;
  }

}

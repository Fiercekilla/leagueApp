import { Component } from '@angular/core';
import { NavParams, ViewController } from "ionic-angular";
import { ApiService } from "../../services/api.service";

@Component({
  selector: 'match.details',
  templateUrl: 'match.details.html'
})

export class MatchDetails {

  public matchData: any;
  public bgChampImg: string;

  constructor(private navParams: NavParams,
              private viewController: ViewController,
              private api: ApiService) {
    console.log(navParams.get('details'));
    this.matchData = navParams.get('details');
    this.bgChampImg = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${this.matchData.champKey}_0.jpg`;
    // this.api.getMatchInfo(navParams.get('details')).subscribe(res => {
    //   this.matchData = res;
    //   console.log(this.matchData);
    // })
  }

  closeDetails() {
    this.viewController.dismiss();
  }

}

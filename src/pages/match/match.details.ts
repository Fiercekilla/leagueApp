import { Component } from '@angular/core';
import { LoadingController, NavParams, ViewController } from "ionic-angular";
import { ApiService } from "../../services/api.service";

@Component({
  selector: 'match.details',
  templateUrl: 'match.details.html'
})

export class MatchDetails {

  public matchData: any;
  public fullMatchInfo: any;
  public bgChampImg: string;
  public teamId: any;

  constructor(private navParams: NavParams,
              private viewController: ViewController,
              private api: ApiService,
              private loadingCtrl: LoadingController) {

    let loading = this.loadingCtrl.create({
      content: 'Загрузка данных...'
    });
    loading.present();
    this.teamId = 100;
    this.matchData = navParams.get('details');
    this.bgChampImg = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${this.matchData.champKey}_0.jpg`;
    this.matchData.timePlayedString = `${Math.ceil(this.matchData.stats.timePlayed / 60)} мин. ${this.matchData.stats.timePlayed % 60} сек.`;
    this.api.getMatchInfo(this.matchData.gameId).subscribe(res => {
      let self = this;
      this.fullMatchInfo = res;
      this.fullMatchInfo.participantIdentities.forEach(function (item,index) {
        self.fullMatchInfo.participants[index].summonerName = item.player.summonerName;
      });
      this.fullMatchInfo.participants.forEach(function (item, index) {
        self.api.getChampById(item.championId).subscribe(res => {
          item.champKey = res.key;
        });
      });
      loading.dismiss();
      console.log(this.fullMatchInfo.participants);
    })
  }

  closeDetails() {
    this.viewController.dismiss();
  }

}

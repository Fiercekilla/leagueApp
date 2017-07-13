import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { ApiService } from "../../services/api.service";
import { MatchDetails } from "../match/match.details";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  version: string;
  nickname: string;
  region: string;
  matches: any;

  constructor(public navCtrl: NavController,
              private api: ApiService,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController) {
    this.version = '0.0.1';
  }

  searchSummoner() {
    let loading = this.loadingCtrl.create({
      content: 'Загрузка данных...'
    });

    loading.present();
    console.log(this.nickname, this.region);
    this.api.getUserId(this.nickname).subscribe(res => {
      console.log(res);
      this.api.getMatchList().subscribe(res => {
        console.log(res);
        this.matches = res.games;
        let self = this;
        this.matches.forEach(function (item) {
          item.itemImages = [
            {
              link: `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/${item.stats.item0}.png ` || '',
              key: item.stats.item0 || null
            },
            {
              link: `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/${item.stats.item1}.png ` || '',
              key: item.stats.item1 || null
            },
            {
              link: `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/${item.stats.item2}.png ` || '',
              key: item.stats.item2 || null
            },
            {
              link: `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/${item.stats.item3}.png ` || '',
              key: item.stats.item3 || null
            },
            {
              link: `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/${item.stats.item4}.png ` || '',
              key: item.stats.item4 || null
            },
            {
              link: `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/${item.stats.item5}.png ` || '',
              key: item.stats.item5 || null
            },
            {
              link: `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/${item.stats.item6}.png ` || '',
              key: item.stats.item6 || null
            },
          ];
          self.api.getChampById(item.championId).subscribe(res => {
            item.champName = res.name;
            item.champTitle = res.title;
            item.champImg = `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/${res.key}.png`;
            item.champKey = res.key;
          });
        });
        console.log(this.matches);
        loading.dismiss();
      })
    });
  }

  itemDetails(key: any) {

  }

  matchDetails(id: any) {
    this.navCtrl.push(MatchDetails, {
      details: id
    });
  }

}




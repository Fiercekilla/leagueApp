import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Observable } from "rxjs";

import 'rxjs/Rx';

@Injectable()
export class ApiService {

  private apiKey = 'RGAPI-4e243a1d-f3ab-49f9-8d78-1c434363f3c1';
  public summonerId:any;

 constructor(private http: Http) {}

 getUserId(nickname:string) {
   // let headers = new Headers({'X-Riot-Token' : this.apiKey});
   // let options = new RequestOptions({headers});
   return this.http.get(`/api/summoner/v3/summoners/by-name/${nickname}?api_key=${this.apiKey}`)
     .map((res: Response) => {
        this.summonerId = res.json().id;
        return res.json();
     });
 }

 getMatchList(){
   return this.http.get(`https://ru.api.riotgames.com/api/lol/RU/v1.3/game/by-summoner/${this.summonerId}/recent?api_key=${this.apiKey}`)
    .map((res:Response) => {
     return res.json();
   })
 }

 getChampById(id:any){
   return this.http.get(`/api/static-data/v3/champions/${id}?locale=ru_RU&tags=image&api_key=${this.apiKey}`)
     .map((res:Response) => {
      return res.json();
     })
 }

 getItemInfo(id: any) {
   return this.http.get(`api/static-data/v3/items/${id}?locale=ru_RU&api_key=${this.apiKey}`)
     .map((res:Response) => {
       return res.json();
     });
 }

getMatchInfo(id:any) {
   return this.http.get(`api/match/v3/matches/${id}?api_key=${this.apiKey}`)
     .map((res:Response) => {
        return res.json();
     }) ;
}

getFullMatchInfo(id:any) {
   return this.http.get(`api/match/v3/matches/${id}?api_key=${this.apiKey}`)
     .map((res:Response) => {
      return res.json();
     });
}


}

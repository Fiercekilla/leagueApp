import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { CloudSettings, CloudModule, Deploy } from '@ionic/cloud-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ApiService } from "../services/api.service";
import { MatchDetails } from "../pages/match/match.details";

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '7149379c'
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MatchDetails
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MatchDetails
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ApiService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

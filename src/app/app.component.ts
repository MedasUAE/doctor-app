import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AppointmentsPage } from '../pages/appointments/appoitnments';
import { LoginPage } from '../pages/login/login';
import { HttpService } from '../providers/httpapi/httpapi' 

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public http: HttpService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if(localStorage.getItem('auth')){
        this.rootPage = AppointmentsPage;
      }
      else{
        this.rootPage = LoginPage;
      }
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

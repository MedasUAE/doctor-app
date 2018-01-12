import { Component } from '@angular/core';
import { Platform, Events, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AppointmentsPage } from '../pages/appointments/appoitnments';
import { LoginPage } from '../pages/login/login';
import { HttpService } from '../providers/httpapi/httpapi'; 
import { AlertService } from '../providers/alert-servce';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    public http: HttpService, 
    ev: Events,
    toastCtrl: ToastController,
    public alert: AlertService) {
    platform.ready().then(() => {

      // http.getBaseURL("http://localhost:3000/getbaseurl?client=darafia")
      http.getBaseURL("https://mobie-setup-ws.appspot.com/v1/getbaseurl?client=damas")
        .then((url:any)=>{
          localStorage.setItem('baseURL', url);
          if(localStorage.getItem('auth')){
            this.rootPage = AppointmentsPage;
          }
          else{
            this.rootPage = LoginPage;
          }
        })
        .catch((err)=>{
          alert.showAlertAction("Setup", "Setup for this application is not completed")
            .then(()=>{
              platform.exitApp();
            });
        })
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

        if(localStorage.getItem('auth')){
          this.rootPage = AppointmentsPage;
        }
        else{
          this.rootPage = LoginPage;
        }

        //Logout Unauthorized users
        ev.subscribe("unautharized",message=>{
          var toast = toastCtrl.create({
              message: 'You are not valid user.',
              duration: 5000
          });
          toast.present();
      })
      
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

import { AlertController, ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';
/*
  Generated class for the AlertService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()

export class AlertService {

  constructor(public alertCtrl: AlertController, private toastCtrl: ToastController) {}

  public showAlert(title, subTitle) {
    if(!title) title = "Alert";
    if(!subTitle) return;

    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

  public showAlertAction(title, subTitle) {
    return new Promise((resolve,reject) => {

      if(!title) title = "Alert";
      if(!subTitle) return;

      let alert = this.alertCtrl.create({
        title: title,
        subTitle: subTitle,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              resolve(true);
            }
          }
        ]
      });
      alert.present();
    })
  }

  public confirmationAlert(title, subTitle) {
    return new Promise((resolve,reject) => {
        if(!title) title = "Alert";
        if(!subTitle) reject("No Descprtion for an alert ") ;

        let alert = this.alertCtrl.create({
          title: title,
          message: subTitle,
          buttons: [
            {
              text: 'NO',
              handler: () => {
                resolve(false);

              }
            },
            {
              text: 'YES',
              handler: () => {
                resolve(true);
              }
            }
          ]
        });
        alert.present();
    })
  }

  public showToast( message:string, duration = 3000){
    let toast = this.toastCtrl.create({
      message:message,
      duration: duration,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  public showLogoutAlert(subTitle) {
    if(!subTitle) subTitle = "You are not valid user.";
    
    return new Promise((resolve,reject) => {
      let alert = this.alertCtrl.create({
        title: "Logout",
        subTitle: subTitle,
        buttons: [
          {
            text: 'Logout',
            handler: () => {
              localStorage.clear();
              resolve();
            }
          }
        ]
      });
      alert.present();
    })
  }

  public showUpdateAlert(subTitle?) {
    if(!subTitle) subTitle = "There is a version update, please update your application";
    
    return new Promise((resolve,reject) => {
      let alert = this.alertCtrl.create({
        title: "Version Update",
        subTitle: subTitle,
        buttons: [
          {
            text: 'Update',
            handler: () => {
              window.open("https://play.google.com/store/apps/details?id=com.betterlife.illusionDental");
            }
          }
        ]
      });
      alert.present();
    })
  }
}

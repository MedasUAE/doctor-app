import { Injectable } from '@angular/core';
import { LoadingController,Events } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Network } from '@ionic-native/network';
import { AlertService } from '../alert-servce';

/*
  Generated class for the HttpService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HttpService {
  public headers: any;
  private baseURL: String;
  private errorMsg: string = "Network Error: Please check your network connection";

  constructor(public http: Http, private ev: Events, public loader:LoadingController, public network: Network, public alert: AlertService) {
    this.headers = new Headers();
    // this.baseURL = 'http://localhost:3000/';
    this.baseURL = 'https://api-doc.herokuapp.com/';
    this.headers.append('Content-Type','application/json');
    if(localStorage.getItem('auth'))
      this.headers.append('Authorization', 'bearer ' + JSON.parse(localStorage.getItem('auth')).token);
  }

  public post(url, postData, showLoader = true){
    let completeURL = this.baseURL + url;
    
    if(!showLoader) return this.postCallWithoutLoader(completeURL,postData);
    else return this.postCallWithLoader(completeURL,postData);
  }
  
  private postCallWithLoader(completeURL,postData){
    return new Promise((resolve, reject) => {
      if (this.network.type == "none")  reject("You are offline");
      
      let load = this.loader.create({
        content : 'Please Wait ..'
      });
      load.present().then(() => {
        this.http.post(completeURL, postData,{headers: this.headers})
          .subscribe(
            (res) => {              
              const data = res.json()
              load.dismiss();
              // (!parseInt(data.ErrorCode)) ? resolve(data.objData) : reject(data.DisplayMessage)
              switch (res.status) {
                case 200:
                  resolve(data.data)
                  break;
                case 400:
                  this.ev.publish("unautharized");
                  break;
                default:
                  reject(data.DisplayMessage);                
                  break;
              }
            },
            (err) => {
              load.dismiss();
              this.alert.showToast(this.errorMsg);
              (this.network.type == "none") ? reject(err) : reject(err); 
            })
        })
      })    
    }

  private postCallWithoutLoader(completeURL,postData){
    return new Promise((resolve, reject) => {
      if (this.network.type == "none")  reject("You are offline");      
      this.http.post(completeURL, postData,{headers: this.headers})
        .subscribe(
          (res) => {
            const data:any = res.json();
            // (!parseInt(data.ErrorCode)) ? resolve(data.objData) : reject(data.DisplayMessage);
            switch (parseInt(data.ErrorCode)) {
                case 0:
                  resolve(data.objData)
                  break;
                case 2:
                  this.ev.publish("unautharized");
                  break;
                default:
                  reject(data.DisplayMessage);                
                  break;
              }
          },
          (err) => {
            this.alert.showToast(this.errorMsg);
            (this.network.type == "none") ? reject(err) : reject(err);
          })
      })
  }
  
  public get(url){
    let completeURL = this.baseURL + url;
    let load = this.loader.create({
        content : 'Please Wait ..'      
    });
    
    return new Promise((resolve, reject) => {
      if (this.network.type == "none")  reject("You are offline");
      
      load.present().then(() =>{
      this.http.get(completeURL,{headers: this.headers}).subscribe(
          (res) => {
            let data = res.json()            
            load.dismiss();
            switch (parseInt(data.ErrorCode)) {
                case 0:
                  resolve(data.objData)
                  break;
                case 2:
                  this.ev.publish("unautharized");
                  break;
                default:
                  reject(data.DisplayMessage);                
                  break;
              }
          },
          (err) => {
            load.dismiss();
            if(this.network.type == "none")
              this.alert.showAlert("Network Error","Please check your network connection");
            else
              reject(err)
        })
      })
    })    
  }
}

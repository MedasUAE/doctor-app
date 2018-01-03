import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HttpService } from '../../providers/httpapi/httpapi'
import { AppointmentsPage } from '../appointments/appoitnments'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  username:string;
  password:string;
  
  constructor(public navCtrl: NavController, public http: HttpService) {}
  formSubmit(){
    if(this.username && this.password) this.loginApi();
  }

  loginApi(){
    const postData = {
      username: this.username,
      password: this.password
    }
    this.http.post("v1/login", postData)
      .then((res:any)=>{
        localStorage.setItem('auth', JSON.stringify(res))
        // console.log(this.http.headers.Authorization);
        this.http.headers.append('Authorization', 'bearer ' + JSON.parse(localStorage.getItem('auth')).token);
        this.navCtrl.setRoot(AppointmentsPage);
      })
      .catch(err=>{
        console.log(err.error);
      })
  }

}

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Network } from '@ionic-native/network';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { AppointmentsPage } from '../pages/appointments/appoitnments';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { PopOverPage } from '../pages/pop-over/pop-over';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpService } from '../providers/httpapi/httpapi';
import { AlertService } from '../providers/alert-servce';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    AppointmentsPage,
    HomePage,
    TabsPage,
    PopOverPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    AppointmentsPage,
    HomePage,
    TabsPage,
    PopOverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpService,
    AlertService,
    Network
  ]
})
export class AppModule {}

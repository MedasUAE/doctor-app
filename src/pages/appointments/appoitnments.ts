import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { HttpService } from '../../providers/httpapi/httpapi'
// import {Data} from './data';
import * as moment from 'moment';

@Component({
  selector: 'page-contact',
  templateUrl: 'appointments.html'
})

export class AppointmentsPage {
  @ViewChild(Slides) slides: Slides;
  slide_list;
  lastDateIndex = 0;
  current_slide_index;
  slots; //JSON.parse('[{"slots":"08:30","doctors_id":4,"slot_day":6},{"slots":"08:45","doctors_id":4,"slot_day":6},{"slots":"09:00","doctors_id":4,"slot_day":6},{"slots":"09:15","doctors_id":4,"slot_day":6},{"slots":"09:30","doctors_id":4,"slot_day":6},{"slots":"09:45","doctors_id":4,"slot_day":6},{"slots":"10:00","doctors_id":4,"slot_day":6},{"slots":"10:15","doctors_id":4,"slot_day":6},{"slots":"10:30","doctors_id":4,"slot_day":6},{"slots":"10:45","doctors_id":4,"slot_day":6},{"slots":"11:00","doctors_id":4,"slot_day":6},{"slots":"11:15","doctors_id":4,"slot_day":6},{"slots":"11:30","doctors_id":4,"slot_day":6},{"slots":"11:45","doctors_id":4,"slot_day":6},{"slots":"12:00","doctors_id":4,"slot_day":6},{"slots":"12:15","doctors_id":4,"slot_day":6},{"slots":"12:30","doctors_id":4,"slot_day":6},{"slots":"12:45","doctors_id":4,"slot_day":6},{"slots":"13:00","doctors_id":4,"slot_day":6},{"slots":"13:15","doctors_id":4,"slot_day":6},{"slots":"13:30","doctors_id":4,"slot_day":6},{"slots":"13:45","doctors_id":4,"slot_day":6},{"slots":"14:00","doctors_id":4,"slot_day":6},{"slots":"14:15","doctors_id":4,"slot_day":6},{"slots":"14:30","doctors_id":4,"slot_day":6},{"slots":"14:45","doctors_id":4,"slot_day":6},{"slots":"15:00","doctors_id":4,"slot_day":6},{"slots":"15:15","doctors_id":4,"slot_day":6},{"slots":"15:30","doctors_id":4,"slot_day":6},{"slots":"15:45","doctors_id":4,"slot_day":6},{"slots":"16:00","doctors_id":4,"slot_day":6},{"slots":"16:15","doctors_id":4,"slot_day":6},{"slots":"16:30","doctors_id":4,"slot_day":6},{"slots":"16:45","doctors_id":4,"slot_day":6},{"slots":"17:00","doctors_id":4,"slot_day":6},{"slots":"17:15","doctors_id":4,"slot_day":6},{"slots":"17:30","doctors_id":4,"slot_day":6},{"slots":"17:45","doctors_id":4,"slot_day":6},{"slots":"18:00","doctors_id":4,"slot_day":6},{"slots":"18:15","doctors_id":4,"slot_day":6},{"slots":"18:30","doctors_id":4,"slot_day":6},{"slots":"18:45","doctors_id":4,"slot_day":6},{"slots":"19:00","doctors_id":4,"slot_day":6},{"slots":"19:15","doctors_id":4,"slot_day":6},{"slots":"19:30","doctors_id":4,"slot_day":6},{"slots":"19:45","doctors_id":4,"slot_day":6},{"slots":"20:00","doctors_id":4,"slot_day":6},{"slots":"20:15","doctors_id":4,"slot_day":6},{"slots":"20:30","doctors_id":4,"slot_day":6},{"slots":"20:45","doctors_id":4,"slot_day":6}]');
  constructor(public navCtrl: NavController, public http: HttpService) {
    this.slide_list = this.prepSlides();
    // console.log(this.slides[0]);
    this.getSlots(this.slide_list[0].slide_selected_date);
    this.current_slide_index = 0;
  }

  prepSlides(){
    return [
      this.makeWeekDates(this.lastDateIndex),
      this.makeWeekDates(this.lastDateIndex)
    ];
  }

  makeWeekDates(i){
    let slide = {slide_selected_date:"",dates:[]};
    this.lastDateIndex = i + 7;
    slide.slide_selected_date = ((this.lastDateIndex - 7)==i) ? moment().add("days", i).format("YYYY-MM-DD") : undefined;
    while(i<this.lastDateIndex){
      slide.dates.push({
        date: moment().add("days", i).format("D"),
        full_date: moment().add("days", i).format("YYYY-MM-DD"),
        month: moment().add("days", i).format("MMM").toUpperCase(),
        day: moment().add("days", i).format("ddd").toUpperCase(),
        active: ((this.lastDateIndex - 7)==i) ? true : false
      });
      i++;
    }
    return slide;
  }

  dateClick(slide, index){
    slide.dates.forEach((s,i) => {
      s.active = false;
      if(i==index) {
        s.active = true;
        slide.slide_selected_date = s.full_date;
      } 
    });
    this.getSlots(slide.slide_selected_date);    
  }

  getSlots(date){
    // date="2017-11-26" // hardcoded
    const doctor_id = JSON.parse(localStorage.getItem('auth')).doctor_id;
    this.http.post("doc-appoint", {"doctor_id":doctor_id,"appoint_date":date})
      .then((result:any)=>{
        this.slots = result;
      });
  }

  ionSlideNextEnd(){
    this.slide_list.push(this.makeWeekDates(this.lastDateIndex));
  }

  ionSlidePrevEnd(){
    this.slide_list.pop();
    this.lastDateIndex = this.lastDateIndex - 7;
  }

  slideChanged() {
    this.current_slide_index = this.slides.getActiveIndex();
    this.getSlots(this.slide_list[this.current_slide_index].slide_selected_date);
  }
}

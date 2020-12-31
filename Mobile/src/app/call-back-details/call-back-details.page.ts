import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import {LeadService} from '../service/lead.service'
import { NavController, Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';;

@Component({
  selector: 'app-call-back-details',
  templateUrl: './call-back-details.page.html',
  styleUrls: ['./call-back-details.page.scss'],
})
export class CallBackDetailsPage implements OnInit {
  callBackId;
  createdLeadId;
  convertedLeadId;
  customer;
  customerProfile;
  comments;
  callBackfrom: any;
  rescheduleForm: any;
  reschedule:boolean = false;
  minDate: string = new Date().toISOString();
  datetimeValue = new Date();
  // date = new Date(); myDate: String = new Date(this.date.getTime() - this.date.getTimezoneOffset()*60000).toISOString();
  myDate = new Date();
  disabledDates: Date[] = [
        // new Date(1545911005644),     
        // new Date(),     
        // new Date(2018, 12, 12), // Months are 0-based, this is August, 10th.     
        // new Date('Wednesday, December 26, 2018'), // Works with any valid Date formats like long format     
        // new Date('12-14-2018'), // Short format
  ];
  datePickerObj: any = {
    inputDate: new Date(), // default new Date()
    fromDate: new Date(), // default null
    toDate: new Date('2100-12-31'), // default null
    showTodayButton: true, // default true
    closeOnSelect: true, // default false
    disableWeekDays: [], // default []
    mondayFirst: true, // default false
    setLabel: 'Select',  // default 'Set'
    todayLabel: 'Today', // default 'Today'
    closeLabel: 'Close ', // default 'Close'
    disabledDates: this.disabledDates, // default []
    titleLabel: 'Select a Date', // default null
    monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
    weeksList: ["S", "M", "T", "W", "T", "F", "S"],
    dateFormat: 'YYYY-MM-DD', // default DD MMM YYYY
    clearButton : false , // default true
    momentLocale: 'pt-BR', // Default 'en-US'
    yearInAscending: true, // Default false
    btnCloseSetInReverse: true, // Default false
    btnProperties: {
      expand: 'block', // Default 'block'
      fill: '', // Default 'solid'
      size: '', // Default 'default'
      disabled: '', // Default false
      strong: '', // Default false
      color: '' // Default ''
    },
    arrowNextPrev: {
      nextArrowSrc: 'assets/images/arrow_right.svg',
      prevArrowSrc: 'assets/images/arrow_left.svg'
    }, // This object supports only SVG files.
    highlightedDates: [
     { date: new Date('2019-09-10'), color: '#ee88bf', fontColor: '#fff' },
     { date: new Date('2019-09-12'), color: '#50f2b1', fontColor: '#fff' }
    ], // Default [],
    isSundayHighlighted : {
     fontColor: '#ee88bf' // Default null
    } // Default {}
  };

  selectedDate;

  constructor(private router: Router, public modalCtrl: ModalController, public navController:NavController ,public activeRoute: ActivatedRoute, private _formBuilder: FormBuilder, public leadService: LeadService) { }

  ngOnInit() {
    
    console.log(this.minDate)
    this.callBackfrom = this._formBuilder.group({
      comments: new FormControl('',[Validators.required]),
    });
    this.rescheduleForm = this._formBuilder.group({
      callBackDate: new FormControl('',[Validators.required]),
      // callBackTime: new FormControl('',[Validators.required]),
    });
    this.callBackId = this.activeRoute.snapshot.queryParams.callbackId;
    this.createdLeadId = this.activeRoute.snapshot.queryParams.createdLeadId;
    this.convertedLeadId = this.activeRoute.snapshot.queryParams.convertedLeadId;
    this.comments = this.activeRoute.snapshot.queryParams.comments;

    this.leadService.getSingleLead(this.createdLeadId).subscribe((res: any) => {
      console.log(res)
      this.customer = res.data[0];
    });
    this.leadService.getSingleConvertedLeadCB(this.convertedLeadId).subscribe((res: any) => {
      console.log(res)
      this.customerProfile = res.data[0];

    });
    if(this.comments) {
      console.log(this.comments);
      this.callBackfrom.controls["comments"].setValue(this.comments);
    }
  }

  submit(status) {
    console.log(status, this.callBackfrom.value)   
      let data = {
        comments: this.callBackfrom.value.comments,
        status: status,
      }
      if(status) {
        this.leadService.updateTicket(this.callBackId, data ).subscribe((res: any) => {
          console.log(res);
          if(res) {
            this.router.navigate(['/notification/completed'], { queryParams: {completed: 'completed' } }); 
              // this.router.navigate(['/notification/']);
            // this.navController.navigateForward(['/notification']);

          }
        });
      } else {
        data.status = null;
        this.leadService.updateTicket(this.callBackId, data ).subscribe((res: any) => {
          console.log(res);
        });
        this.reschedule = true;
      }  
  }

  submitReschedule(status) {
    let data = {
      callBackDate: this.rescheduleForm.value.callBackDate,
      callBackTime: this.rescheduleForm.value.callBackTime,
    }
    this.leadService.updateTicket(this.callBackId, data ).subscribe((res: any) => {
      console.log(res);
      if(res) {
        this.router.navigate(['/notification/rejected'], { queryParams: {completed: 'completed' } }); 

        // this.navController.navigateBack(['/notification/upcoming']);
      }
    });
  }

  async openDatePicker() {
    const datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: 'li-ionic4-datePicker',
      componentProps: { 
         'objConfig': this.datePickerObj, 
         'selectedDate': this.selectedDate 
      }
    });
    await datePickerModal.present();

    datePickerModal.onDidDismiss()
      .then((data) => {
        console.log(data);
        if(data.data.date != 'Data inválida') {

          this.selectedDate = data.data.date;
        }
      });
  }
}


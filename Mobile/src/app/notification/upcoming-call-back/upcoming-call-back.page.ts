import { Component, OnInit } from '@angular/core';
import { LeadService } from '../../service/lead.service'
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-upcoming-call-back',
  templateUrl: './upcoming-call-back.page.html',
  styleUrls: ['./upcoming-call-back.page.scss'],
})
export class UpcomingCallBackPage  {
  callBack: any=[];

  constructor(private leadService:LeadService, private changeRef: ChangeDetectorRef,
private router: Router    ) {
    this.callBackCalc();
    
   }
   

  // ngOnInit() {
    
  //   this.callBackCalc();
  //   this.changeRef.detectChanges();
  // }
  ionViewWillEnter (){
    this.callBackCalc();
    console.log('ionViewWillEnter')
  }

  async nav(call) {
    debugger
    this.router.navigate(['/notification/completed']); 
    await this.router.navigate(['/call-back-details'], { queryParams: {callbackId: call.id, createdLeadId: call.createdLeadId, convertedLeadId: call.convertedLeadId  } });
  }
  
  callBackCalc() {
    
    let resp;
    this.leadService.getCalBack().subscribe((res: any) => {
      console.log(res)
     resp=res;
     this.callBack = res.data;
     this.callBack.forEach(element => {
       if(element.callBackDate && new Date(element.callBackDate).toISOString().substring(0, 10) == new Date().toISOString().substring(0, 10)) {
         console.log(element.callBackDate)
        //  if(element.callBackTime && new Date(element.callBackTime).getHours() == new Date().get)
        var date1, date2;  

        date1 = new Date(element.callBackTime);
        // document.write(""+date1);
        console.log(date1)
        console.log(element.callBackTime)
        date2 = new Date();
        // document.write("<br>"+date2);

        var res = Math.abs(date1 - date2) / 1000;
        
        // get total days between two dates
        var days = Math.floor(res / 86400);
        // document.write("<br>Difference (Days): "+days);                        
        
        // get hours        
        var hours = Math.floor(res / 3600) % 24;        
        // document.write("<br>Difference (Hours): "+hours);  
        
        // get minutes
        var minutes = Math.floor(res / 60) % 60;
        // document.write("<br>Difference (Minutes): "+minutes);  
    
        // get seconds
        var seconds = res % 60;
        // document.write("<br>Difference (Seconds): "+seconds); 

        console.log(hours, minutes);

        if((hours == 23 && minutes >= 45) || (hours == 0 && minutes <= 15)) {
          // this.callBack.push(element);
          
          element.redAlert = true;
          console.log(hours, minutes);

        }
       }
     });
     console.log(this.callBack);
    });
    
  }


}

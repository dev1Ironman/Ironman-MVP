import { Component, OnInit } from '@angular/core';
import {LeadService} from '../../service/lead.service'

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  orders: any;
  filteredorders: any;
  constructor(public leadService: LeadService) { }

  ngOnInit() {
    this.leadService.getCustomer().subscribe((res: any) => {
      console.log(res)
      if (res.success) {
        this.orders = res.data;
        this.orders =  this.orders.sort((a,b) => new Date(b.createdAt).getTime()  - new Date(a.createdAt).getTime()  );
        this.filteredorders = this.orders;
      }
    });
  }

  view(i) {
    console.log(i)
    this.orders[i].open = true
  }
  viewtoggle(i) {
    console.log(i)
    this.orders[i].open = false
  }

  focus(option){
    console.log(option)
    let frequency ;
    let date = new Date();
        // date.setDate(date.getDate() + frequency);
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 2).toISOString();
    if (option == "This Month") {
      frequency = 1;
      let serviceDue = new Date(date.getFullYear(), date.getMonth() + frequency, 0).toISOString();
      // serviceDue = date.toISOString();
       
    
       this.filteredorders = this.orders.filter(order => {
       return order.createdAt >= firstDay
            && order.createdAt <= serviceDue
       });
    } else if (option == "This week"){
      frequency = -4;

      var curr = new Date; // get current date
      var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
      var last = first + 6; // last day is the first day + 6
      let startday = new Date(curr.setDate(first)).toISOString();
      let lastday = new Date(curr.setDate(last)).toISOString();
       this.filteredorders = this.orders.filter(order => {
       return order.createdAt <= lastday
            && order.createdAt >= startday
       });
    }
   if(option == "This year") {
    this.filteredorders = this.orders.filter(order => {
      return new Date(order.createdAt).getFullYear() == new Date().getFullYear()
    });
   }
    
  
  }
}

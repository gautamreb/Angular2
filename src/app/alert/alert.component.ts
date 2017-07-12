import { Component, OnInit } from '@angular/core';
import {AlertService} from "app/service/alert.service";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
    message :any;

    constructor(private alertservice: AlertService) { }

  ngOnInit() {
      this.alertservice.getMessage().subscribe(message => {this.message = message;});
  }

}

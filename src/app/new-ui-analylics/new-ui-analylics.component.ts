import { Component, OnInit,} from '@angular/core';
//import {BrowserModule} from '@angular/platform-browser';
//import {type} from "os";
//import 'analytics.js';
 //declare function changeFiltertype(type:any):any;
//import changeFiltertype from 'new-ui-analytics.js';
// const window: any ={};

declare var changeFiltertype: any;
declare var getSidebarMenus:any;

@Component({
  selector: 'app-new-ui-analylics',
  templateUrl: './new-ui-analylics.component.html',
  styleUrls: ['./new-ui-analylics.component.css']
})
export class NewUiAnalylicsComponent implements OnInit {
 type: string='AL';
 constructor() {

 }

  ngOnInit() {
      getSidebarMenus();
      changeFiltertype(this.type);
      
      console.log("after chage filter function:"+this.type);    
  }









}

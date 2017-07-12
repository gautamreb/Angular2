import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms'; 
import { HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
//import { AppRoutes } from './app.routes';
import { routing} from './app.routes';

import { LoginComponent } from './login/login.component';
import {ChartComponent} from './chart/chart.component';
import { AlertComponent } from './alert/alert.component';
import { NewUiAnalylicsComponent } from './new-ui-analylics/new-ui-analylics.component';


@NgModule({
  declarations: [
    AppComponent, LoginComponent, ChartComponent, AlertComponent, NewUiAnalylicsComponent],
  imports: [
    BrowserModule, 
    FormsModule, 
    HttpModule, 
    routing
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

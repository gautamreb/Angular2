//import { NgModule } from '@angular/core';
//import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChartComponent } from './chart/chart.component';
import {NewUiAnalylicsComponent} from './new-ui-analylics/new-ui-analylics.component';
 
export const routes: Routes = [
        {path: '', redirectTo:'/analytics', pathMatch:'full'},
        {path:  'login', component:LoginComponent},
        {path: 'chart', component:ChartComponent},
        {path: 'analytics', component:NewUiAnalylicsComponent}//,
//        {path: 'Overview', component:NewUiAnalylicsComponent},
//        {path: 'Network', component:NewUiAnalylicsComponent},
//        {path: 'Region', component:NewUiAnalylicsComponent},
//        {path: 'Service Type', component:NewUiAnalylicsComponent},
//        {path: 'successReq', component:NewUiAnalylicsComponent},
//        {path: 'avgBit', component:NewUiAnalylicsComponent},
//        {path: 'QOS', component:NewUiAnalylicsComponent},
//        {path: 'totalReq', component:NewUiAnalylicsComponent},
//        {path: 'Day', component:NewUiAnalylicsComponent},
//        {path: 'Week', component:NewUiAnalylicsComponent},
//        {path: 'Month', component:NewUiAnalylicsComponent}
        
];

/*@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})*/

//export class AppRoutes{}
//export const routingComponent = [LoginComponent, ChartComponent];
//export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
//export class AppRoutes{}
//export const routingComponent =[ LoginComponent, ChartComponent];
export const routing=RouterModule.forRoot(routes);
 


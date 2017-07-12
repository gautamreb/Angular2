import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { AlertService } from '../service/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, AlertService]
})
export class LoginComponent implements OnInit {
    

 public searchText;
 public searchResult;
 public totalCount;
 
 public userId;
 public password;
 
 public jSeesionId;
 public userName;
 public userType;
 public userRole;
 public responseCode;
 public messageDesc;
 loading = false;
 constructor(
                private router: Router, 
                private loginService: LoginService,
                private alertService: AlertService){}

  ngOnInit() {
      	
  }
 /* onKeyup(event){
    this.searchText = event.target.value;
  }*/

  onKeyup1(event){
    this.userId = event.target.value;
  }
  
  onKeyup2(event){
      this.password = event.target.value;
  }

  onSubmit(userId,password){ this.router.navigateByUrl('analytics');
      this.loginService.getUser(this.userId, this.password).subscribe(
      res => {
          console.log(res);
          this.jSeesionId=res.JSessionId;
          this.responseCode=res.responseCode;
          this.userType=res.userType;
          this.messageDesc=res.messageDesc
          if(res.JSessionId && res.responseCode =='200'){
              //this.router.navigateByUrl('chart');
              this.router.navigateByUrl('analytics');
          }
      },
      error => {
          this.alertService.error(error);
          this.loading = false;
                   
            });
   
  }
  
  /*getUsers(){
      this.loginService.getUser(this.searchText,this.searchText).subscribe(
      res => {
              console.log(res);
              this.searchResult=res;
              this.totalCount=res.total_count;
        }
      );
  }*/

}

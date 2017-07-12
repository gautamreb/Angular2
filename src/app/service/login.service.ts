import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class LoginService {

   constructor(private http:Http) { }

  getUser(userId,password): Observable<any> {
        console.log("userId:"+userId);
        console.log("password:"+password);
       // const login=userId+'&'+password;
      //const url= 'http://api.github.com/search/users?q=' + serachText;
      const url='http://localhost:8080/sawridgewebservices-mno/account/LoginController?strLoginId='+userId+'&strPassword='+password;
      //const url= 'http://tamborasystems.com/solutions-3/reachout/';
     return this.http.get(url).map(res => { const data = res.json();console.log(data);
             return data;
         }
     ).catch((error: any) => {
         console.log(error.status);
                if (error.status < 400 || error.status=== 500) {
                    return Observable.throw(new Error(error.status));
                }
            });
  }
/*_errorHandler(error: Response){
    console.log(error);
    return Observable.throw(error || "server Error");
     
    }*/
}

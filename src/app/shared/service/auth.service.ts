import { Injectable } from '@angular/core';
import { IAccess } from '../../shared/interface/access';
import  accessList  from '../../shared/tool/AccesList';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor() {}

  login(access:IAccess):boolean{
    let index=-1;
    accessList.forEach((user,i)=>{
       if(user.email.trim().toLowerCase()===access.email.trim().toLowerCase() && 
          user.password?.trim().toLowerCase()===access.password?.trim().toLowerCase()){
            index=i;
          }
    });
    console.log("index "+index)
    if(index>=0){
      const expires = new Date();
      const create_at = expires.toUTCString();
      const data:IAccess={
        id:accessList[index].id,
        email:accessList[index].email,
        create_at: create_at
      };
      expires.setSeconds( expires.getSeconds() + environment.expirateTime);
      const session=JSON.stringify({"data":data,"expires":expires.toUTCString()}); 
      this.setSession(session);
    }
    return (index>=0);
  }

  setSession(session:string){
    sessionStorage.setItem("session", session);
  }

  getSession():string{
    let session:string=sessionStorage.getItem("session")?.toString() || '';
    return session;
  }

  isSession():boolean{
    let inSession=false;
    let session:any=this.getSession();
    if(session!=null && session!=''){
      session=JSON.parse(session);
      if(this.isExpires(session.expires)){
        sessionStorage.removeItem('session');
        console.log("ha caducado la sesion");
      } else {
        inSession=true;
      }
    }
    return inSession;
  }

  isExpires(expires:string):boolean{
    const now=new Date();
    const expire_at=new Date(expires);
    const time=parseInt(''+(expire_at.getTime()  - now.getTime()), 10);
    return !(time>0);
  }

}
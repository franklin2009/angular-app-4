import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../shared/service/auth.service';
import { IAccess } from '../../shared/interface/access';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	
  returnUrl?:string;
  access: IAccess = <IAccess>{};
  alert:boolean=false;

  constructor(private authService:AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/' ;
  }

  send(){
      if(this.authService.login(this.access)){
          this.router.navigate([this.returnUrl]);
      } else {
        this.alert=true;
      }
  }

}

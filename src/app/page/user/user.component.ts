import { Component, OnInit, TemplateRef} from '@angular/core';
import { UserService } from '../../shared/service/user.service';
//import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IUser } from '../../shared/interface/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
	
  users: IUser[] = [];
  user: IUser = <IUser>{};
  //modalRef?: BsModalRef;
  isLoad:boolean=false;
  alert:boolean=false;

  action:string = 'n';
  titleModal:string = 'Agregar Usuario';
  
  constructor(private userService: UserService, /* private modalService: BsModalService */) { }

  ngOnInit(): void {
	  this.load();
  }

  openModal(template: TemplateRef<any>) {
  }

  save() {
  }

  openEdit(template: TemplateRef<any>, user:IUser): void {
  }
  
  openDelete(template: TemplateRef<any>, user:IUser): void {
  }
    
  
  load(){
    this.isLoad=true;
	  this.userService.all().subscribe((data: IUser[]) => {
      this.users=data;
      this.isLoad=false;
    });
    
  }

}

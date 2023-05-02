import { Component, OnInit, TemplateRef} from '@angular/core';
import { UserService } from '../../shared/service/user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IUser } from '../../shared/interface/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
	
  users: IUser[] = [];
  user: IUser = <IUser>{};
  modalRef?: BsModalRef;
  isLoad:boolean=false;
  alert:boolean=false;

  action:string = 'n';
  titleModal:string = 'Agregar Usuario';
  
  constructor(private userService: UserService, private modalService: BsModalService) { }

  ngOnInit(): void {
	  this.load();
  }

  openModal(template: TemplateRef<any>) {
    this.user = <IUser>{};
    this.modalRef = this.modalService.show(template);
  }

  save() {
   if(this.user.nombre !="" && this.user.email !=""){
      this.modalRef?.hide();
      this.isLoad=true;
      let data:IUser = this.user;
      let id:number = this.user.id;
      let index:number=-1;

      switch(this.action){
        case 'n': // add 
            this.userService.add(this.user).subscribe((rs: IUser) => { 
              this.isLoad=false;
              this.users.push(rs);
            });
        break;
        case 'e': // edit 
            this.userService.update(id,data).subscribe((rs: IUser) => {
              this.users.forEach((t,i) => {
                if(t.id==id){
                  index=i;
                }
              });
              if(index>-1){
                this.users[index]=rs;
              }
              this.isLoad=false;
            });
        break;
        case 'd': // delete
            this.userService.delete(id).subscribe((rs: string) => {
              this.alert = rs.includes("300");
              if(!this.alert){
                  this.users.forEach((t,i) => {
                    if(t.id==id){
                      index=i;
                    }
                  });
                  if(index>-1){
                    this.users.splice(index,1);
                  }
              }
              this.isLoad=false;
            });
        break;
      }

    }
  }

  openEdit(template: TemplateRef<any>, user:IUser): void {
    this.user = JSON.parse(JSON.stringify(user));
    this.action = 'e';
    this.titleModal = 'Editar Usuario';
    this.modalRef = this.modalService.show(template);
    }
  
    openDelete(template: TemplateRef<any>, user:IUser): void {
    this.user = JSON.parse(JSON.stringify(user));
    this.action = 'd';
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    }
    
  
  load(){
    this.isLoad=true;
	  this.userService.all().subscribe((data: IUser[]) => {
      this.users=data;
      this.isLoad=false;
    });
    
  }

}

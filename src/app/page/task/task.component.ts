import { Component, OnInit, TemplateRef } from '@angular/core';
import { TaskService } from '../../shared/service/task.service';
import { UserService  } from '../../shared/service/user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IUser } from '../../shared/interface/user';
import { ITask } from '../../shared/interface/task';

const XTarea: ITask = { 
	id: 0, titulo: '',  descripcion: '', fecha: '', estatus: '',  usuario_id:0,
	tiempo: { fecha: '', hora: 0, minuto: 0, resta: ''},
	usuario: { id: 0, nombre: '', email: '', avatar: ''},
	status: false,  disabled:false 
};

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  
  tasks: ITask[] = [];
  task: ITask = {} as ITask;
  users: IUser[] = [];
  action:string = 'n';
  titleModal:string = 'Agregar Tarea';
  mTime:any = new Date();
  modalRef?: BsModalRef;
  isLoad:boolean=false;

  constructor(	private taskService: TaskService, 
				private userService: UserService, 
				private modalService: BsModalService ) { }

  ngOnInit(): void {
	  this.load();
  }

  openNew(template: TemplateRef<any>): void {
	this.task =  JSON.parse(JSON.stringify(XTarea));
	this.task.usuario_id=this.users[0].id;
	if(this.mTime==null){
		this.mTime = new Date();
	}
	this.mTime.setHours(0);
	this.mTime.setMinutes(0);
	this.action = 'n';
	this.titleModal = 'Agregar Tarea';
	this.modalRef = this.modalService.show(template);
  }

  openTime(template: TemplateRef<any>, tarea:ITask): void {
	this.task = JSON.parse(JSON.stringify(tarea));
	this.task.disabled=(tarea.estatus=='F');
	this.mTime.setHours(this.task.tiempo.hora);
	this.mTime.setMinutes(this.task.tiempo.minuto);
	this.action = 't';
	this.titleModal = 'Ver Tarea';
	this.modalRef = this.modalService.show(template);
  }

  openEdit(template: TemplateRef<any>, tarea:ITask): void {
	this.task = JSON.parse(JSON.stringify(tarea));
	this.task.disabled=(tarea.estatus=='F');
	if(this.mTime==null){
		this.mTime = new Date();
	}
	this.mTime.setHours(this.task.tiempo.hora);
	this.mTime.setMinutes(this.task.tiempo.minuto);
	this.action = 'e';
	this.titleModal = (tarea.estatus=='A'?'Editar Tarea':'Ver Tarea');
	this.modalRef = this.modalService.show(template);
  }

  openDelete(template: TemplateRef<any>, tarea:ITask): void {
	this.task = JSON.parse(JSON.stringify(tarea));
	this.action = 'd';
	this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  
  save(): void {
	if(this.mTime==null){
		this.mTime = new Date();
		this.mTime.setHours(0);
		this.mTime.setMinutes(0);
	}
	this.modalRef?.hide();
	let data:ITask = this.task;
	let id:number = this.task.id;
	let index:number=-1;
	data.tiempo.hora=this.mTime.getHours();
	data.tiempo.minuto=this.mTime.getMinutes();
	this.isLoad=true;
	switch(this.action){
		case 'n': // add 
				this.taskService.add(data).subscribe((rs: ITask) => {
					this.tasks.push(rs);
					this.isLoad=false;
				});
		break;
		case 'e': // edit 
				this.taskService.update(id,data).subscribe((rs: ITask) => {
					this.tasks.forEach((t,i) => {
						if(t.id==id){
							index=i;
						}
					});
					if(index>-1){
						this.tasks[index]=rs;
					}
					this.isLoad=false;
				});
		break;
		case 'd': // delete
				this.taskService.delete(id).subscribe((rs: string) => {
					this.tasks.forEach((t,i) => {
						if(t.id==id){
							index=i;
						}
					});
					if(index>-1){
						this.tasks.splice(index,1);
					}
					this.isLoad=false;
				});
		break;
		case 't': // edit date
				this.taskService.updateDate(id,data).subscribe((rs: ITask) => {
					this.tasks.forEach((t,i) => {
						if(t.id==id){
							index=i;
						}
					});
					if(index>-1){
						this.tasks[index].tiempo=rs.tiempo;
					}
					this.isLoad=false;
				});
		break;
	}
  }
  
  
  load(): void {
	let load:number=0;
	this.isLoad=true;
	this.userService.all().subscribe((data: IUser[]) => {
		this.users=data;
		load++
		if(load > 1) {
			this.isLoad=false;
		}
	  });
	this.taskService.all().subscribe((data: ITask[]) => {
		this.tasks=data;
		load++
		if(load > 1) {
			this.isLoad=false;
		}
	});
  }

}

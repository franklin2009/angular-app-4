import { ITime } from './time';
import { IUser } from './user';

export interface ITask {
    id: number;
    titulo: string;
    descripcion: string;
    fecha: string;
    estatus: string;
    usuario_id:number;
    tiempo: ITime;
    usuario: IUser;
    status: boolean;
    disabled:boolean;
}
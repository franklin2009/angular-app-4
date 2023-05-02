export interface IUser {
    id: number;
    nombre: string;
    email: string;
    avatar: string;
    disabled?:boolean;
}
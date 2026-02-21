import {Address} from './address';

export interface User{
    id?: number,
    name: string,
    email: string,
    password?: string,
    address: Address
}
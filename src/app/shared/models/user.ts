import {Address} from './address';

export interface User{
    id?: number,
    email: string,
    password?: string,
    address: Address
}
import {Address} from './address';

export interface Provider{
  id?:string;   
  userId?: string;	
  name?: string,
  address?: Address  
}
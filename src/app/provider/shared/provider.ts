import {Address} from './address';

export interface Provider{
  id?:string;   
  userId?: string;	
  name?: string,
  description?: string,  
  address?: Address,  
  image?: string  
}
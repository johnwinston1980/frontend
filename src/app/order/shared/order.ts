import { Product } from '../../product/shared/product'

export interface Order{
    id?: string,
    userId?: string,
    providerId?: string,  
    providerName?: string,  
    status?: string,
    pickupTime?: string,
    products?: Array<Product>
}
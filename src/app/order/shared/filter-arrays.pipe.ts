import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filterArrays'
})

@Injectable()
export class FilterArraysPipe implements PipeTransform {

    transform(items: any[], field : string, value : string, visible:boolean,id:string): any[] {
    if (!items) return [];
      if(value.length > 2){
        this.itemsCompare(items,field,value,id); 
      }else {
        if(visible){
          return items;
        }
        else{
          return [];
        }
      }
      if(this.data.length === 0){
         if(visible){
           if(value.length > 2){
              return items;
            }
            else{
              return this.data;
            }         
         }
         else{
          return this.data;
         }

       }else{
         return this.data;
       }
       
    }

data:any = [];

distinct(arr:any,obj:any,f:string){
    let k = obj[f];    
    let al:number = arr.length;
    let r:boolean = true;    
    for (let l = 0; l < al; ++l) {
      let nI:number = arr[l][f];
        if(nI === k){
          r =false;l = al+10;
        }
     }     
     return r;
}

sort_Arrays_key(array:Array<any>, key:string){
    return array.sort((a, b)=> {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

itemsCompare(items:Array<any>,fld:string,cmp:string,id:string){  
  let td= [];
  let tdat = [];
  let flds:string[] = fld.split(' ');
  let acmp:string[] = cmp.split(' ');
  let itm:any;
  acmp.map((a,ind)=>{
    if(ind>0){      
      itm = td;     
    }
    else{      
      itm = items;
    }
    tdat=[];
    flds.map(f=>{  
      if(a.length>2){
        let itms = this.sort_Arrays_key(itm,f); 
        itms.filter((v)=>{    
          if(v){
            if(v[f].indexOf(a) >=0){
              if(ind>0){
              }
              if(this.distinct(tdat,v,id)){
                tdat.push(v);
              }
            }           
          }
        });      
      }
    });
    td=tdat;
  });  
  this.data = td;
}

}

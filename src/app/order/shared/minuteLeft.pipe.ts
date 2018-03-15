import { Pipe, PipeTransform, Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Pipe({
  name: 'timeLeft',pure:false
})

@Injectable()
export class TimeLeftPipe implements PipeTransform, OnDestroy {   
  transform(time: any) {
    var _this_ = this;
     return _this_.piping(time,new Date());      
  }
  ngOnDestroy(){
    var _this_ = this;
    
  }

piping(time,cT){
  var DTm = cT.getHours() *60+cT.getMinutes();
  if(time){
    DTm = parseInt(time.split(':')[0])*60+parseInt(time.split(':')[1]);
  }
  var CTm  = cT.getHours()  *60+cT.getMinutes();      
  const diff = DTm- CTm;
  if(diff>0){   
    var rsp = ''     
    if(diff/60>=1){
      rsp = `${Math.floor(diff/60)} hours, ${diff-(Math.floor(diff/60)*60)} min left`
    }
    else{
      rsp = `${diff} min left`
    }
    
  }else{
    rsp = '';
  }
  return rsp; 
}

}
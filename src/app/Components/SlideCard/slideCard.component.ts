import { Component, OnInit, ElementRef, ContentChildren, QueryList, AfterContentInit, } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {CardComponent} from './card.component'




@Component({
  selector: 'hrm-slide-cards',
  templateUrl: './slideCard.component.html',
  styleUrls: ['./slideCard.component.css']
})
export class SlideCardsComponent implements OnInit, AfterContentInit {
  @ContentChildren(CardComponent) items:QueryList<CardComponent>;
  private index:number = 0;
  private last:number = 0;
  TitleArr:Array<any> = [];
  private transition:boolean = false;
  constructor(){
    console.log(`SlideCardsComponent`)
  }

  ngOnInit() {
  
    
  }

  selectTab(item:CardComponent,inD){
    var _th0 = this;	
    if(_th0.last!== inD && !_th0.transition){
      _th0.transition = true;
      _th0.reStyleCards(item,inD,_th0.last); 
    }
		//this.document.body.scrollTop = 	0;
  }
  InitializeTab(item:CardComponent,inD){
    var _th0 = this;	
    console.log(item)
    _th0.reStyleCards(item,inD,_th0.last); 
  }
  ngAfterContentInit(){
    console.log(`ngAfterContentInit`)
    console.log(this.items)
    
    let ActiveTabs = this.items.filter((item)=> item.active);
    this.TitleArr = this.items.toArray().map((item)=>item);	
    	
		if(ActiveTabs.length === 0){
			this.InitializeTab(this.items.first,0);
		}

  }

  reStyleCards(item:CardComponent,inD:number,_last:number){
    var iN=0,iL=0;    
    var _th0 = this;  
      this.items.toArray().forEach((item,index)=>{
        var cardsStyl={visibility: 'hidden', opacity: 0,transform: 'matrix(1, 0, 0, 1, -40, 0)'};
        if(index===inD){    
            setTimeout(()=>{
              var IntVId = setInterval(()=>{
                cardsStyl.visibility='inherit';
                if(iN>=50){
                  cardsStyl.opacity= 1;
                  cardsStyl.transform= 'matrix(1, 0, 0, 1, 0, 0)';
                  iN =0;
                  _th0.transition = false;
                  clearInterval(IntVId);
                }
                else if(iN>20){
                  cardsStyl.opacity= iN*0.02;                            
                  if(inD<_last){
                    //t.style.transform= `matrix(1, 0, 0, 1, ${(50-iN)*-0.384}, 0)`;
                    cardsStyl.transform= `translate3d(${(50-iN)*2}px,0, 0)`;
                  }
                  else if(inD>_last){
                  // t.style.transform= `matrix(1, 0, 0, 1, ${(50-iN)*0.384}, 0)`;
                  cardsStyl.transform= `translate3d(${(50-iN)*-2}px,0, 0)`;
                  } 
                }
                iN += 1;                
                item.reStyle(cardsStyl);
              }, 1);  
            }, 550);

          } 
          else if(inD!==_last && index===_last){    
            setTimeout(()=>{                 
              cardsStyl.opacity= 1;
              cardsStyl.visibility='inherit';             
              var IntVId = setInterval(()=>{
                if(index<inD){
                  cardsStyl.transform= `translate3d(${iL*2}px,0, 0)`;
                }
                else if(index>inD){
                  cardsStyl.transform= `translate3d(${iL*-2}px,0, 0)`;
                }               
                if(iL>=50){
                  cardsStyl.opacity= 0;                  
                  cardsStyl.visibility='hidden';
                  if(index<inD){
                    cardsStyl.transform= 'matrix(1, 0, 0, 1, 40, 0)';
                  }
                  else if(index>inD){
                    cardsStyl.transform= 'matrix(1, 0, 0, 1, -40, 0)';
                  }
                  iL =0;
                  clearInterval(IntVId);
                }            
                else if(iL>30){
                  cardsStyl.opacity= (50-iL)*0.2;                           
                }              
                iL += 1;              
                item.reStyle(cardsStyl);
              }, 1);  
            }, 5);

          }
        else if(index<inD){
          cardsStyl={visibility: 'hidden', opacity: 0,transform: 'matrix(1, 0, 0, 1, 40, 0)'};
          item.reStyle(cardsStyl);         
        }
        else if(index>inD){
          cardsStyl={visibility: 'hidden', opacity: 0,transform: 'matrix(1, 0, 0, 1, -40, 0)'}; 
          item.reStyle(cardsStyl);        
        }
        item.active = false;
      });
      item.active = true;	
      item.changed();
      this.last = inD;	      
  }

}


// 1zYIsfcKxndWLlg88iRv0zd8oME3-X07frA
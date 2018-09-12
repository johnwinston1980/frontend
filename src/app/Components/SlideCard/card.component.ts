import { Component, OnInit, ElementRef, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs/Observable';





@Component({
  selector: 'hrm-slide-card',
  templateUrl: './card.component.html',
  styleUrls: ['./slideCard.component.css']
})
export class CardComponent implements OnInit {

  public active:boolean = false;
  public sty = {
    visible:'hidden',
    opacity:0,
    transform:''
  }
  @Input() title:string = '';
	@Output() private action: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private Elm:ElementRef, private render:Renderer2){
      
  }

  ngOnInit() {
  
  }

  reStyle(g){    
    var elM = this.Elm.nativeElement.children[0];
    this.render.setStyle(<any>elM,'visibility',g.visibility);
    this.render.setStyle(<any>elM,'opacity',g.opacity);
    this.render.setStyle(<any>elM,'transform',g.transform);
  }
  changed(){    
    this.action.emit(true);	
  }

}
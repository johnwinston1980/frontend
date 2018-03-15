import { Component, OnInit, ElementRef, ViewChild,Output, EventEmitter,Renderer2 } from '@angular/core';

@Component({
  selector: 'hrm-slide-menu',
  templateUrl: './slidemenu.component.html',
  styleUrls: ['./slidemenu.component.css']
})
export class SlidemenuComponent implements OnInit {

  
  ngOnInit() {
  }
  @ViewChild('slm') slm:ElementRef;	
	public show:boolean = false;
	constructor(private elm:ElementRef, private render:Renderer2) {	}
	@Output() confirm = new EventEmitter();	
	

	Open(){
		this.show = true;
		this.render.setStyle(<any>this.slm.nativeElement,'left','0px');
	}
	Close(){
		this.show = false;
		this.render.setStyle(<any>this.slm.nativeElement,'left','-250px');
	}
	Go(){
		this.show = false;
		this.confirm.emit(null);
	}
}

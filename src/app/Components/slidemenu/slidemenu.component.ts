import { Component, OnInit, ElementRef, Input, Output, EventEmitter,Renderer2 } from '@angular/core';

@Component({
  selector: 'hrm-slide-menu',
  templateUrl: './slidemenu.component.html',
  styleUrls: ['./slidemenu.component.css']
})
export class SlidemenuComponent implements OnInit {

  public show:boolean = false;
	@Input() orientation:string = 'left';	
	@Output() confirm = new EventEmitter();	
	constructor(private elm:ElementRef, private render:Renderer2) {	}	

	ngOnInit() {
		this.show = false;
		var slm = this.elm.nativeElement.children[0]
		this.render.setStyle(<any>slm,this.orientation,'-450px');
  }


	Open(){
		this.show = true;
		var slm = this.elm.nativeElement.children[0]
		this.render.setStyle(<any>slm,this.orientation,'0px');
	}
	Close(){
		this.show = false;
		var slm = this.elm.nativeElement.children[0]
		this.render.setStyle(<any>slm,this.orientation,'-450px');
	}
	Go(){
		this.show = false;
		this.confirm.emit(null);
	}
}

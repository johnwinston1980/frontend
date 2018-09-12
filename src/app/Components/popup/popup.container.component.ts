import {Component,  Output, EventEmitter, ElementRef, AfterViewInit, Renderer2, HostListener} from '@angular/core';
import {Observable} from 'rxjs/Observable';



@Component({
	selector:'popup-container',
	template:`
		<div #Pop class="popupHRM">
		<ng-content></ng-content>
		</div>
		<div class="overlayHRM" *ngIf="show" (click)="Close()"></div>`,
	styleUrls:['./popup.component.css']

})
export class PopupcontainerComponent implements AfterViewInit{		
	public show:boolean = false;
	private st:number = 0;
	private sl:number = 0;	
	private d:any;
	constructor(private elm:ElementRef, private _render:Renderer2) {	}
	@Output() confirm = new EventEmitter();	
	@HostListener('window:resize', ['$event'])
	onResize(event) {
		event.target.innerWidth;
		var _th_ = this;
		if(_th_.show){
			_th_.Close();
		}
		
	}
	ngAfterViewInit(){
		
  	}
	Open(d){
		var _th_ = this;
		_th_.d = d;	
		_th_._Render(d);
		setTimeout(_th_._Render(_th_.d),10)
		_th_.show = true;		
	}
	Close(){
		var popElm = this.elm.nativeElement.children[0];		
		this.show = false;
		let style = `left:${this.sl}px; top:${this.st}px;display:none;`;
		this._render.setProperty(<any>popElm,'style',style);
	}
	Go(){		
		this.show = false;
		this.confirm.emit(null);

	}
	_Render(d){
		let popdm = this.elm.nativeElement.children[0].getBoundingClientRect();			
		let h = popdm.height;
		let w = popdm.width;
		let l = d.left;
		let t = d.top;
		let sw = window.innerWidth;
		let sh = window.innerHeight;		
		this.sl = l;
		this.st = d.top; 		
		if(l+w+20>sw){		
		this.sl = l+(sw-(l+w+25));		
		};
		if(t+h+20>sh){		
		this.st = t+(sh-(t+h+25));	
		};
		this.st = this.st;
		this.sl = this.sl;
		var popElm = this.elm.nativeElement.children[0];		
		let style = `left:${this.sl}px; top:${this.st}px; z-index:${2002};`;
		this._render.setProperty(<any>popElm,'style',style);
	}
}
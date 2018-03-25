import {Component,  Output, EventEmitter, ElementRef, AfterViewInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';



@Component({
	selector:'dialogHRM',
	template:`
		<div class="dialogHRM" *ngIf="show">
		<ng-content></ng-content>
		</div>
		<div class="overlayHRM" *ngIf="show" (click)="Close()"></div>`,
	styleUrls:['./dialog.component.css']

})
export class DialogComponent implements AfterViewInit{		
	public show:boolean = false;
	private st:number = 0;
	private sl:number = 0;	
	
	constructor(private elm:ElementRef) {	}
	@Output() confirm = new EventEmitter();
	@Output() afterClose = new EventEmitter();		
	ngAfterViewInit(){
		
  	}
	Open(){		
		this.show = true;
	}
	Close(){		
		this.show = false;
		this.afterClose.emit(true);
	}
	Go(){
		this.show = false;
		this.confirm.emit(null);
	}
}
import {
	Component,
	ContentChildren,
	QueryList,
	Input,
	AfterContentInit,
	ElementRef
} from '@angular/core';

import {PopupcontainerComponent} from './popup.container.component';		


@Component({
	selector:'popup-buttom',
	template:`
		<div [title]="title">
			<hrm-icons [style.cursor]="'pointer'" [type]="icon"   [dimention]="24" [fill]="fill" (click)="Open()"></hrm-icons>
			<ng-content></ng-content>
		</div>
		`,
	styleUrls:['./popup.component.css']

})
export class PopupComponent implements AfterContentInit {	
	constructor(private elm:ElementRef) {	}
	@ContentChildren(PopupcontainerComponent) pop:QueryList<PopupcontainerComponent>;
	@Input() icon:string = 'vert_menu';
	@Input() title:string = 'click for options';
	@Input() fill:string = '#000000';

	Open(){
		let t = this.elm.nativeElement.getBoundingClientRect();
		this.pop.first.Open(t);
	}
	ngAfterContentInit(){		
		this.pop.toArray().forEach((p)=>{p.Close();})		
	}
}
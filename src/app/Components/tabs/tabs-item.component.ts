import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tabItem',
  templateUrl: './tabs-item.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabItemComponent implements OnInit {
  active:boolean = false;
  Mtop:any = {
    'margin':'15px auto 0 auto',
    'padding-top': '5px',
    'max-width': '1320px'
   };
	@Input() title:string = '';
	@Output() private action: EventEmitter<boolean> = new EventEmitter<boolean>();
  ngOnInit() {
		
  }
  chang(){    
    this.action.emit(true);	
  }
  
}

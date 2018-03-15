import { Component, OnInit, ContentChildren, QueryList, AfterContentInit, Input, Inject, HostListener } from '@angular/core';
import {TabItemComponent} from './tabs-item.component';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit , AfterContentInit {
	@ContentChildren(TabItemComponent) items:QueryList<TabItemComponent>;
	TitleArr:Array<any> = [];
	topCont:any = 0;
	constructor(@Inject(DOCUMENT) private document: Document) { }	
	DescStyles:any = {
        'position': 'relative',
				'width': '100%',
				'height':'48px',
				'background-color':'#fafafa',
				'z-index':'209',
				'padding':'7px 0',	
      };
	@Input() topMargin:number = 0;
	@Input() scrollFixed:number = 56;
	@HostListener("window:scroll", [])
	onWindowScroll() {

		let number = this.document.body.scrollTop;		
    if (number < this.scrollFixed) {  
			this.setMargin(true)    
      this.DescStyles = {
        'position': 'relative',        
				'width': '100%',
				'height':'40px',
				'background-color':'#fafafa',
				'z-index':'209',
				'padding':'7px 0',
				'margin':'0 auto',
      }      
    } else {
			this.setMargin(false);
      this.DescStyles = {
        'position': 'fixed',
				'width': '100%',
				'margin':'0 auto',
				'left':'0',
				'height':'40px',
        'top':this.topMargin+'px',
        'background-color':'#fafafa',
				'z-index':'209',				
        'border-bottom':'1px solid #fafafa',
      }
    }
	}
	ngOnInit(){

	}
	selectTab(item:TabItemComponent){		
		this.items.toArray().forEach((item)=>{item.active = false;})
		item.active = true;	
		item.chang();	
		this.document.body.scrollTop = 	0;
		this.DescStyles = {
        'position': 'fixed',
				'width': '100%',
				'margin':'0 auto',
				'left':'0',
				'height':'40px',
        'top':this.topMargin+'px',
        'background-color':'#fafafa',
				'z-index':'209',				
        'border-bottom':'1px solid #fafafa',
      }
	}

	setMargin(n){		
		let ActiveTabs = this.items.filter((item)=> item.active);
		if(n){
			ActiveTabs[0].Mtop={
				'margin':'15px auto 0 auto',
				'padding-top': '5px',
				'max-width': '1320px'
			};
		}
		else{
			ActiveTabs[0].Mtop={
				'margin':'125px auto 0 auto',
				'padding-top': '5px',
				'max-width': '1320px'
			};
		}
		
		
	}


	ngAfterContentInit(){
		
		let ActiveTabs = this.items.filter((item)=> item.active);
		this.TitleArr = this.items.toArray().map((item)=>item);
		
		if(ActiveTabs.length === 0){
			this.selectTab(this.items.first);
		}
	}
  
}

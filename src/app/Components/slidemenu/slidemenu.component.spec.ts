import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidemenuComponent } from './slidemenu.component';

describe('SlidemenuComponent', () => {
  let component: SlidemenuComponent;
  let fixture: ComponentFixture<SlidemenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidemenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

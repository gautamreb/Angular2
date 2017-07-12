import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUiAnalylicsComponent } from './new-ui-analylics.component';

describe('NewUiAnalylicsComponent', () => {
  let component: NewUiAnalylicsComponent;
  let fixture: ComponentFixture<NewUiAnalylicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUiAnalylicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUiAnalylicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

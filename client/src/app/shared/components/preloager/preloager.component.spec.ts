import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloagerComponent } from './preloager.component';

describe('PreloagerComponent', () => {
  let component: PreloagerComponent;
  let fixture: ComponentFixture<PreloagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreloagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreloagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientIndexComponent } from './index.component';

describe('IndexComponent', () => {
  let component: ClientIndexComponent;
  let fixture: ComponentFixture<ClientIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

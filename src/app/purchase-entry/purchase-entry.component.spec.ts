import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseEntryComponent } from './purchase-entry.component';

describe('PurchaseEntryComponent', () => {
  let component: PurchaseEntryComponent;
  let fixture: ComponentFixture<PurchaseEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseEntryComponent]
    });
    fixture = TestBed.createComponent(PurchaseEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

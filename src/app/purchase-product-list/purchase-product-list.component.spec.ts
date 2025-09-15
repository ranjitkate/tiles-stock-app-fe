import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseProductListComponent } from './purchase-product-list.component';

describe('PurchaseProductListComponent', () => {
  let component: PurchaseProductListComponent;
  let fixture: ComponentFixture<PurchaseProductListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseProductListComponent]
    });
    fixture = TestBed.createComponent(PurchaseProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellProductListComponent } from './sell-product-list.component';

describe('SellProductListComponent', () => {
  let component: SellProductListComponent;
  let fixture: ComponentFixture<SellProductListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellProductListComponent]
    });
    fixture = TestBed.createComponent(SellProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

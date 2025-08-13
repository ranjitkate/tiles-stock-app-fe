import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionPdfGeneratorComponent } from './transaction-pdf-generator.component';

describe('TransactionPdfGeneratorComponent', () => {
  let component: TransactionPdfGeneratorComponent;
  let fixture: ComponentFixture<TransactionPdfGeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionPdfGeneratorComponent]
    });
    fixture = TestBed.createComponent(TransactionPdfGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

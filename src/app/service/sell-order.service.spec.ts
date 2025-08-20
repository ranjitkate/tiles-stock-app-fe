import { TestBed } from '@angular/core/testing';

import { SellOrderService } from './sell-order.service';

describe('SellOrderService', () => {
  let service: SellOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

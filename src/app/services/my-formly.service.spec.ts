import { TestBed } from '@angular/core/testing';

import { MyFormlyService } from './my-formly.service';

describe('MyFormlyService', () => {
  let service: MyFormlyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyFormlyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ApocService } from './apoc.service';

describe('ApocService', () => {
  let service: ApocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

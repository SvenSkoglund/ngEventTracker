import { TestBed, inject } from '@angular/core/testing';

import { ReadEventService } from './read-event.service';

describe('ReadEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReadEventService]
    });
  });

  it('should be created', inject([ReadEventService], (service: ReadEventService) => {
    expect(service).toBeTruthy();
  }));
});

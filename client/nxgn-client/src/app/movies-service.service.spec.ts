import { TestBed, inject } from '@angular/core/testing';

import { MoviesServiceService } from './movies-service.service';

describe('MoviesServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoviesServiceService]
    });
  });

  it('should be created', inject([MoviesServiceService], (service: MoviesServiceService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { MyHttpClientService } from './my-http-client.service';

describe('MyHttpClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyHttpClientService]
    });
  });

  it('should be created', inject([MyHttpClientService], (service: MyHttpClientService) => {
    expect(service).toBeTruthy();
  }));
});

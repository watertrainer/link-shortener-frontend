import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { responseObjectStats } from './backend.service'; import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BackendService } from './backend.service';
import { of } from 'rxjs';

describe('BackendService', () => {
  let service: BackendService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [BackendService], imports: [HttpClientTestingModule], });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should load on getStats', (done: DoneFn) => {
    const expectedData = { viewed: 10, error: "", queryUrl: "test", shortened: 3 };
    service.getStats("test").subscribe({
      next(data: responseObjectStats) {
        expect(data).withContext("expected data").toBe(expectedData);
        done();
      }, error(err) {
        done.fail

      }
    });
    const req = httpTestingController.expectOne('/api/stats?url=test');
    expect(req.request.method).toEqual('GET');
    req.flush(expectedData);
    httpTestingController.verify();
  })
  it('should throw error on false input', (done: DoneFn) => {
    service.getStats(null).subscribe({
      next(data) {
        done.fail;
      }, error(err) {
        expect(err).withContext("should throw error").toBeTruthy();
        done()
      }
    })
  })
  it("should return error on network failure", (done: DoneFn) => {
    //want to test priavte function, ignore ts-compiler warning
    //@ts-ignore
    service.handleError(new HttpErrorResponse({ status: 0 })).subscribe({
      error(err) {
        expect(err).withContext("Should have error").toEqual(new Error("An Network Error occured, try again"));
        done();
      }, next(data) {
        done.fail();
      }
    })
  })
  it('should return an error when the server returns a 404', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });


    service.getStats("test").subscribe({
      next: data => done.fail('expected an error, not data'),
      error: error => {
        expect(error.message).toContain('Not found');
        done();
      }
    });
    const req = httpTestingController.expectOne('/api/stats?url=test');
    expect(req.request.method).toEqual('GET');
    req.flush("Not found", errorResponse);
    httpTestingController.verify();
  })


});

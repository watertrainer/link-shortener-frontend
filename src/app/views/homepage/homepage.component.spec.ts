import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { Observable, of, throwError } from 'rxjs';

import { HomepageComponent } from './homepage.component';
import { ClrLoadingState } from '@clr/angular';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;
  let backendSpy: jasmine.SpyObj<BackendService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    backendSpy = jasmine.createSpyObj('BackendService', ['sendShortenUrl']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    routerSpy.navigate.and.returnValue(Promise.resolve(true));
    await TestBed.configureTestingModule({
      declarations: [HomepageComponent], providers: [{ provide: BackendService, useValue: backendSpy }, { provide: Router, useValue: routerSpy }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should display error message", () => {
    const errorMessage = "Test error"
    backendSpy.sendShortenUrl.and.returnValue(throwError(() => new Error(errorMessage)));
    component.onSubmit();
    expect(component.errorMessage).toBe("Test error");
    expect(component.submitBtnState).toBe(ClrLoadingState.ERROR);

  })

  it("should redirect on succsess", () => {
    const mockResponse = { shortl: "test" }
    backendSpy.sendShortenUrl.and.returnValue(of(mockResponse));
    component.onSubmit();
    expect(component.submitBtnState).toBe(ClrLoadingState.SUCCESS);
    expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['/stats'], { queryParams: mockResponse })
  })


});

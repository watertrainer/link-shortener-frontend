import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BackendService } from 'src/app/services/backend.service';

import { StatsComponent } from './stats.component';
import { Observable, of, throwError } from 'rxjs';
import { ClarityModule, ClrLoadingState } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';

describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;
  let backendSpy: jasmine.SpyObj<BackendService>;
  let statsElement: HTMLElement;
  let routeSpy: jasmine.SpyObj<ActivatedRoute>;


  beforeEach(async () => {
    backendSpy = jasmine.createSpyObj('BackendService', ['getStats', 'getShortlStats']);
    routeSpy = jasmine.createSpyObj('ActivatedRoute', [''], { 'queryParams': of({ shortl: undefined }) });

    await TestBed.configureTestingModule({
      imports: [ClarityModule, ReactiveFormsModule, BrowserAnimationsModule],
      declarations: [StatsComponent], providers: [{ provide: BackendService, useValue: backendSpy }, { provide: ActivatedRoute, useValue: routeSpy }],
    })
      .compileComponents();
    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    statsElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should update DOM on Form Control Update', fakeAsync(() => {

    component.searchUrlForm.setValue({
      searchUrlInput: "test"
    }
    );

    fixture.detectChanges();
    tick();
    expect(statsElement.querySelector<HTMLInputElement>("input[name=searchUrlInput]")?.value).withContext("should update input text").toBe("test");
  }))
  it('should validate form on input', () => {
    expect(component.searchUrlForm.valid).withContext("should be invalid without input").toBeFalse();
    component.searchUrlForm.setValue({
      searchUrlInput: "test"
    }
    );
    expect(component.searchUrlForm.valid).withContext("should be valid with input").toBeTrue()
  })
  it('should update Values on statsSuccsess', () => {
    const mockResponse = { shortened: 10, viewed: 5, shortl: "test", url: "https://google.com" };

    component.statsSuccsess(mockResponse);
    expect(component.viewed).withContext("should update viewed").toBe(5);
    expect(component.shortened).withContext("should update shortened").toBe(10);
    expect(component.succsess).withContext("should be succsessful").toBeTruthy();
    expect(component.statsBtnState).withContext("should update button stat").toBe(ClrLoadingState.SUCCESS);
    expect(component.searchUrlForm.controls.searchUrlInput.errors).withContext("should update error state").not.toBeTruthy();
  })

  it("should display error on statsError", () => {
    const errorMessage = "An Error has occured";
    component.statsError(new Error(errorMessage));
    expect(component.errorMessage).withContext("Should display error Message").toBe(errorMessage);
    expect(component.succsess).withContext("Should display unseccsesfull").toBeFalsy();
    expect(component.statsBtnState).withContext("Should display error on button").toBe(ClrLoadingState.ERROR);
    expect(component.searchUrlForm.controls.searchUrlInput.errors).withContext("should update error state").toBeTruthy();
  })

  it("should have shortl on call with url parameters", () => {
    //set the query params to our test value
    (Object.getOwnPropertyDescriptor(routeSpy, "queryParams")?.get as any).and.returnValue(of({ shortl: "test" }))
    const mockResponse = { shortened: 10, viewed: 5, shortl: "test_value", url: "https://google.com" };
    backendSpy.getShortlStats.and.returnValue(of(mockResponse))
    //read the query params again, as we changed the value of them and we read them in ngOnInit
    component.ngOnInit();
    //this is now the value sent in the mock response
    expect(component.shortl).toBe("test_value");
    //this is the actual value given in the query params
    expect(backendSpy.getShortlStats).toHaveBeenCalledOnceWith("test");
  });

});
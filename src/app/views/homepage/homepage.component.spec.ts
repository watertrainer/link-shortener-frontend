import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackendService } from 'src/app/services/backend.service';

import { HomepageComponent } from './homepage.component';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;
  let backendSpy: jasmine.SpyObj<BackendService>;

  beforeEach(async () => {
    backendSpy = jasmine.createSpyObj('BackendService', ['sendShortenUrl']);
    await TestBed.configureTestingModule({
      declarations: [HomepageComponent], providers: [{ provide: BackendService, useValue: backendSpy }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

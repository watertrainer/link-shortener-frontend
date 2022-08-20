import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ClrLoadingState } from '@clr/angular';
import { BackendService, responseObjectStats } from 'src/app/services/backend.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  searchUrlForm = new FormGroup({
    searchUrlInput: new FormControl('', Validators.required)
  });
  succsess = false;
  viewed = 0;
  shortened = 0;
  shortl = "";
  url = "";
  errorMessage = "";
  host = location.host;

  statsBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  constructor(private backendService: BackendService, private ref: ChangeDetectorRef, private activatedRoute: ActivatedRoute) { console.log(this.searchUrlForm) }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe((value: Params) => {
      //shortl is the query params value
      this.shortl = value["shortl"];
      if (this.shortl !== undefined) {
        //if the shortl value was set, get the shortl stats from the server
        this.getShortlStats();
      }
      else {
        //reset the website to wait for a new shortl/submit
        this.succsess = false;
        this.shortl = "";
        this.ref.detectChanges();
      }
    });
  }
  getShortlStats(): void {
    this.statsBtnState = ClrLoadingState.LOADING;
    this.backendService.getShortlStats(this.shortl).subscribe(next => this.statsSuccsess(next), error => this.statsError(error));
  }
  getStats(): void {
    this.statsBtnState = ClrLoadingState.LOADING;
    this.backendService.getStats(this.searchUrlForm.controls.searchUrlInput.value).subscribe(next => this.statsSuccsess(next), error => this.statsError(error));;

  }
  statsError(error: Error): void {
    this.errorMessage = error.message;
    //Stop rendering data
    this.succsess = false;
    this.statsBtnState = ClrLoadingState.ERROR;
    //Force rendering of the error Message
    this.searchUrlForm.controls.searchUrlInput.setErrors({});
    //Manually update and look for changes so the errors are displayed
    this.ref.detectChanges();

  }
  statsSuccsess(data: responseObjectStats): void {
    this.viewed = data.viewed;
    this.shortened = data.shortened;
    this.shortl = data.shortl;
    this.url = data.url;
    //Render data
    this.succsess = true;
    //Remove the error message
    this.searchUrlForm.controls.searchUrlInput.setErrors(null);
    this.statsBtnState = ClrLoadingState.SUCCESS;
  }

}


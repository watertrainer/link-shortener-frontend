import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { throwError } from 'rxjs';
import { BackendService, responseObjectStats } from 'src/app/services/backend.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  searchUrlForm = new FormGroup({
    searchUrlInput: new FormControl('', Validators.required),
  });
  succsess = false;
  viewed = 0;
  shortened = 0;
  errorMessage = "";
  statsBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  constructor(private backendService: BackendService, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  getStats(): void {
    this.statsBtnState = ClrLoadingState.LOADING;
    this.backendService.getStats(this.searchUrlForm.controls.searchUrlInput.value).subscribe((data: responseObjectStats) => {
      this.viewed = data.viewed;
      this.shortened = data.shortened;
      //Render data
      this.succsess = true;
      //Remove the error message
      this.searchUrlForm.controls.searchUrlInput.setErrors(null);
      this.statsBtnState = ClrLoadingState.SUCCESS;
    }, (error: Error) => {
      console.log("an error occured");
      console.log(error.message);
      this.errorMessage = error.message;
      //Stop rendering data
      this.succsess = false;
      this.statsBtnState = ClrLoadingState.ERROR;
      //Force rendering of the error Message
      this.searchUrlForm.controls.searchUrlInput.setErrors({});
      //Manually update and look for changes so the errors are displayed
      this.ref.detectChanges();

    });


    ;

  }

}


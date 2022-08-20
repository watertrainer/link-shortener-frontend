import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, UrlHandlingStrategy } from '@angular/router';
import { ClrLoadingState } from '@clr/angular';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  shortenUrlForm = new FormGroup({
    shortenUrlInput: new FormControl('', Validators.required),
  });
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  errorMessage = "";
  constructor(private backendService: BackendService, private router: Router, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitBtnState = ClrLoadingState.LOADING
    this.backendService.sendShortenUrl(this.shortenUrlForm.controls.shortenUrlInput.value).subscribe(
      (data) => {
        console.log(data);
        this.submitBtnState = ClrLoadingState.SUCCESS
        this.router.navigate(["/stats"], { queryParams: { shortl: data.shortl } });
      },
      (error) => {
        this.submitBtnState = ClrLoadingState.ERROR;
        this.errorMessage = error.message;
        this.shortenUrlForm.controls.shortenUrlInput.setErrors({});
        this.ref.detectChanges();
        console.log(error);
      }
    );
    console.log("Submit");
  }
}

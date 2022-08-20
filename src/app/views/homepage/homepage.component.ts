import { Component, OnInit } from '@angular/core';
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
  constructor(private backendService: BackendService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.backendService.sendShortenUrl(this.shortenUrlForm.controls.shortenUrlInput.value).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(["/stats"], { queryParams: { shortl: data.shortl } });
      },
      (error) => {
        console.log(error);
      }
    );
    console.log("Submit");
  }
}

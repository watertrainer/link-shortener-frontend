import { Component, OnInit } from '@angular/core';
import { UrlHandlingStrategy } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  input = '';
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log("Submit");
  }
}

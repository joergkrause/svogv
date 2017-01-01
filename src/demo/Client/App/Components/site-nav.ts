import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmitterService } from '../Services/EmitterService';
import { StudyViewModel } from '../ViewModels/StudyViewModel';

@Component({
  moduleId: module.id,
  selector: 'site-nav',
  templateUrl: './site-nav.html'
})
export class SiteNavComponent implements OnInit {
  studiesCount: number;

  constructor(private router: Router) {
    EmitterService.get("BROADCAST_Studies").subscribe(data => this.studiesCount = data.length);
  }

  ngOnInit() {
  }

}
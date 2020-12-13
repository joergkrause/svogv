import { Component, OnInit, Input, Output } from '@angular/core';
import { AcTabData } from '../tabs/models/actabdata.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  @Input() tabs: AcTabData;
  @Input() limitBreadcrumb = false;

  constructor(private router: Router) {}

  ngOnInit() {
  }

}

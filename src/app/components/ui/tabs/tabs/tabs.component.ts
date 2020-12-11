import { Component, OnInit, Input, Output } from '@angular/core';
import { AcTabData } from '../tabs/models/actabdata.model';
import { AcTab } from '../tabs/models/actab.model';
import { ActivatedRoute, Router, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
 // put data: { "breadcrumb": true, "subtitle": "Sub Route Name" }
  // in the router config for those items that shall appear in the breadcrumb
  private static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';

  @Input() tabs: AcTabData;
  @Input() limitBreadcrumb = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.router.config
  }

}

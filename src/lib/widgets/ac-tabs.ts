import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from "@angular/router";


/**
 * Create a single tab for tab views. The link shall be a regular route array.
 */
export class AcTab {

  /**
   * Ctor to create Tabs definitions
   * @param link: Array of routes or outlet routes
   * @param text: Text shown on tab
   * @param active: Set class for active tab
   * @param disabled: Optionally set the tab inactive
   */
  constructor(public link: Array<string | {}>, public text: string, public active: boolean, public disabled?: boolean) {
  }

}

/**
 * A collection of tabs used to create a tabbed view. The tabs' content is pulled from routes / child routes.
 */
export class AcTabData {

  constructor(items: Array<AcTab>) {
    this.tabs = items;
  }

  tabs: Array<AcTab>;

}

/**
 * The Tab Component. This looks like a Bootstrap component, but the active part is the Angular router, so no data-toggle is required.
 */
@Component({
  selector: 'ac-tabs',
  template: `<ul class="nav nav-tabs" role="tablist">
                <li class="nav-item" *ngFor="let tab of tabs.tabs" [ngClass]="{ active: tab.active }">
                    <a class="nav-link " *ngIf="!tab.disabled"                        
                       (click)="activateTab(tab)"
                       [ngClass]="{ active: tab.active }"
                       href="#" [routerLink]="tab.link"
                       role="tab" >{{ tab.text }}</a>
                    <a class="nav-link text-muted" *ngIf="tab.disabled"                      
                       href="#" disabled="disabled" onclick="return false;"
                       role="tab" >{{ tab.text }}</a>
                </li>
            </ul>
            <div class="tab-content">
              <br />
              <div role="tabpanel" class="tab-pane active">
                <router-outlet></router-outlet>
              </div>
            </div>
`
}) //
export class AcTabs {
  @Input() tabs: AcTabData;
  @Output() currentTab: AcTab;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
  }

  activateTab(tab: AcTab) {
    this.currentTab = tab;
    this.tabs.tabs.forEach(t => t.active = false);
    tab.active = true;
  }

  ngOnInit() {
    // put data: { "breadcrumb": true, "subtitle": "Sub Route Name" } in the router config for those items that shall appear in the breadcrumb 
    const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";
    const ROUTE_DATA_SUBTITLE: string = "subtitle";

    //subscribe to the NavigationEnd event
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      //reset breadcrumbs

      //get the root route
      let currentRoute: ActivatedRoute = this.activatedRoute.root;

      //set the url to an empty string
      let url: string = "";

      //iterate from activated route to children
      if (currentRoute.children.length > 0) {
        let childrenRoutes: ActivatedRoute[] = currentRoute.children;

        //iterate over each children
        childrenRoutes.forEach(route => {
          //set currentRoute to this route
          currentRoute = route;

          //verify this is the primary route
          if (route.outlet !== PRIMARY_OUTLET) {
            return;
          }

          //verify the custom data property "breadcrumb" is specified on the route
          if (!route.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
            return;
          }

          //get the route's URL segment
          let routeURL: string = route.snapshot.url.map(segment => segment.path).join("/");

          //append route URL to URL
          url += `/${routeURL}`;

          //add router data as current tab
          var matchTab = this.tabs.tabs.filter(t => t.link.toString() == url || ((<any>t).length > 0 && t.link[0] == url));
          if (matchTab && matchTab.length == 1) {
            this.currentTab = matchTab[0];
          }

        });
      }
    });
  }

}

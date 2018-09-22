import { Component, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';

/**
 * Create a single tab for tab views.
 * The link shall be a regular route array.
 */
export class AcTab {

  /**
   * Ctor to create Tabs definitions
   * @param link: Array of routes or outlet routes
   * @param text: Text shown on tab
   * @param active: Set class for active tab
   * @param disabled: Optionally set the tab inactive
   */
  constructor(public link: Array<string | {}>,
    public text: string,
    public active: boolean,
    public disabled?: boolean) {
  }

}

/**
 * A collection of tabs used to create a tabbed view.
 * The tabs' content is pulled from routes / child routes.
 */
export class AcTabData {

  constructor(items: Array<AcTab>) {
    this.tabs = items;
  }

  tabs: Array<AcTab>;

}

/**
 * The Tab Component. It looks like a Bootstrap component, but the active part
 * is the Angular router, so no data-toggle is required.
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
export class AcTabsComponent {

  @Input() tabs: AcTabData;
  @Input() limitBreadcrumb = false;
  @Output() currentTab: AcTab;

  // put data: { "breadcrumb": true, "subtitle": "Sub Route Name" }
  // in the router config for those items that shall appear in the breadcrumb
  private static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  private static readonly ROUTE_DATA_SUBTITLE = 'subtitle';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
  }

  activateTab(tab: AcTab) {
    this.currentTab = tab;
    this.tabs.tabs.forEach(t => t.active = false);
    tab.active = true;
  }

  ngOnInit() {

    // subscribe to the NavigationEnd event
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {

      // get the root route
      let currentRoute: ActivatedRoute = this.activatedRoute.root;

      // iterate from activated route to children
      if (currentRoute.children.length > 0) {
        this.recurseRouteChildren(currentRoute);
      }
    });
  }

  private recurseRouteChildren(currentRoute: ActivatedRoute): void {
    let url = '';
    let childrenRoutes: ActivatedRoute[] = currentRoute.children;
    // iterate over each children
    childrenRoutes.forEach(route => {

      // verify this is the primary route
      if (route.outlet !== PRIMARY_OUTLET) {
        return;
      }

      // verify the custom data property "breadcrumb" is specified on the route,
      // limitBreadcrumb must be set to true to activate this
      if (!route.snapshot.data.hasOwnProperty(AcTabsComponent.ROUTE_DATA_BREADCRUMB) && this.limitBreadcrumb) {
        return;
      }

      // get the route's URL segment
      let routeURL: string = route.snapshot.url.map(segment => segment.path).join('/');

      // add router data as current tab
      // in case of subroutes it looks like this: link[0] = /editor, link[1] = /edit/:id
      // regex checks /xxx/:nn/
      let rx = new RegExp('^((\/.*?)\/\:[^\/]*?\/?)$');
      let lastmatch = (l: any) => l.match(rx) && <any>l.match(rx).filter((m: any) => <any>m === <any>l).length > 0;
      var matchTab = this.tabs.tabs.filter(t => {
          if (typeof(t.link) === 'string') {
            return t.link == routeURL || lastmatch(t.link);
          } else {
            return ((<any>t.link).length > 0
                     && t.link.filter(sublink => sublink === routeURL || lastmatch(sublink)).length > 0);
          }
        }
    );
      if (matchTab && matchTab.length == 1) {
        this.activateTab(matchTab[0]);
        return;
      }
      if (route.children.length > 0) {
        this.recurseRouteChildren(route);
      }
    });
  }

}

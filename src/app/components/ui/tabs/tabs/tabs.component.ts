import { Component, OnInit, Input, Output } from '@angular/core';
import { AcTabData, AcTab } from '../..';
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
  @Input() subRoute: string;
  @Output() currentTab: AcTab;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  activateTab(tab: AcTab) {
    this.currentTab = tab;
    this.tabs.tabs.forEach(t => (t.active = false));
    tab.active = true;
  }

  ngOnInit() {
    // subscribe to the NavigationEnd event
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      // get the (root) route
      const currentRoute: ActivatedRoute = this.subRoute ? this.activatedRoute[this.subRoute] : this.activatedRoute.root;

      // iterate from activated route to children
      if (currentRoute.children.length > 0) {
        this.recurseRouteChildren(currentRoute);
      }
    });
  }

  private recurseRouteChildren(currentRoute: ActivatedRoute): void {
    const childrenRoutes: ActivatedRoute[] = currentRoute.children;
    // iterate over each children
    childrenRoutes.forEach(route => {
      // verify this is the primary route
      if (route.outlet !== PRIMARY_OUTLET) {
        return;
      }

      // verify the custom data property "breadcrumb" is specified on the route,
      // limitBreadcrumb must be set to true to activate this
      if (!route.snapshot.data.hasOwnProperty(TabsComponent.ROUTE_DATA_BREADCRUMB) && this.limitBreadcrumb) {
        return;
      }

      // get the route's URL segment
      const routeURL: string = route.snapshot.url.map(segment => segment.path).join('/');

      // add router data as current tab
      // in case of subroutes it looks like this: link[0] = /editor, link[1] = /edit/:id
      // regex checks /xxx/:nn/
      const rx = new RegExp('^((/.*?)/:[^/]*?/?)$');
      const lastmatch = (l: any) => l.match(rx) && <any>l.match(rx).filter((m: any) => <any>m === <any>l).length > 0;
      const matchTab = this.tabs.tabs.filter(t => {
        if (typeof t.link === 'string') {
          return t.link === routeURL || lastmatch(t.link);
        } else {
          return (<any>t.link).length > 0 && t.link.filter(sublink => sublink === routeURL || lastmatch(sublink)).length > 0;
        }
      });
      if (matchTab && matchTab.length === 1) {
        this.activateTab(matchTab[0]);
        return;
      }
      if (route.children.length > 0) {
        this.recurseRouteChildren(route);
      }
    });
  }
}

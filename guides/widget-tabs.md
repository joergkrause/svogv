## The AcTabs Widget

This document covers the Tabs widget, **AcTabs**.

### Usage Scenario

The tabs widget creates a regular Bootstrap tab strip. It can be populated with tabs by code. 
Hence, you can easily use the component to create the tabs using the Router. That means:

* You configure your router and the configured route links appear on the tabs
* When the app invokes a route call (navigation) and the tabs are in the router outlet, the tabs follow the route

### Using the Tabs

This is the components primary definition:

~~~
export class AcTabs {
  @Input() tabs: AcTabData;
  @Output() currentTab: AcTab;

...
~~~    

You provide the tabs by setting the `tabs` property and you can read the current tab from `currentTab`.

The main page for the widgets in the demo app makes use of this:

~~~
<h3>Widgets</h3>
<ac-tabs [tabs]="widgetTabs"></ac-tabs>
~~~

The property `widgetTabs` will be filled like this:

~~~
export class WidgetDemoComponent {

  widgetTabs: AcTabData;

  constructor(private router: Router) {
    let userRoutes: Array<AcTab> = new Array<AcTab>();
    router.config
      .filter((route, idx) => route.path === "widgets")
      .shift()
      .children
      .filter((route, idx) => !route.redirectTo)
      .forEach(subroute => userRoutes.push(new AcTab(["/widgets", subroute.path], subroute.data["title"], !!subroute.data["active"], !!subroute.data["disabled"])));
    
    this.widgetTabs = new AcTabData(userRoutes);
  }

}
~~~ 

The tricky part is the router configuration. The Angular 2 router allows private data fields. That's what we use here. The `Router` class provides access to the 
routers configuration. First we filter for the part of the router that handles the current tab's items:  

~~~
.filter((route, idx) => route.path === "widgets")
~~~

Than we take the first item (`shift()`) and access the children. From here we take only those that handle content directly, not redirects. Than we create
an array of `AcTab` items that the tabs component can read.

An appropriate routing configuration looks like this:

~~~
const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  // app paths
  {
    path: 'dashboard',
    component: cmp.DashboardComponent,
    data: { 'title': 'Dashboard', 'subtitle': 'Caevman Dashboard' }
  },
  {
    path: 'widgets',
    component: cmp.WidgetDemoComponent,
    data: { 'title': 'Widget Demo', 'subtitle': 'Diverse Components', 'breadcrumb': true },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: cmp.ListWidgetsComponent,
        data: { 'title': 'Overview', 'subtitle': 'Show all widgets', 'active': true, 'disabled': false, 'breadcrumb': true }
      },
      {
        path: 'clock',
        component: cmp.AnalogClockComponent,
        data: { 'title': 'Analog Clock', 'subtitle': 'Clock Demo', 'active': false, 'disabled': false, 'breadcrumb': true }
      },
      {
        path: 'tree',
        component: cmp.TreeviewComponent,
        data: { 'title': 'Tree View', 'subtitle': 'Tree Demo', 'active': false, 'disabled': false, 'breadcrumb': true }
      }
    ]

  },
  //... more routes go here
~~~  

What's important is the *data* field. It handles the tab's, the menus and the breadcrumb. So we use this for many components.

The properties are:

* **title**: Menu Title, Tab Title, Breadcrumb Text
* **subtitle**: Tooltip if appropriate
* **active**: By default the element is active (Tabs only)
* **disabled**: The element can not invoke a hyperlink (Breadcrumb and Tabs)
* **breadcrumb**: The element appears in the Breadcrumb (Breadcrumb only)

See [Breadcrumb Widget](./breadcrumb-widget.md) for more details about this particular component.
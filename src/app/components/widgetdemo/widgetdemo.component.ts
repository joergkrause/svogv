import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AcTabData } from '../ui/tabs/tabs/models/actabdata.model';
import { AcTab } from '../ui/tabs/tabs/models/actab.model';

/**
 * User Manager, defines the tabs that hold the child-outlets.
 */
@Component({
  selector: 'app-widgetdemo',
  templateUrl: './widgetdemo.component.html'
})
export class WidgetDemoComponent {
  widgetTabs: AcTabData;
  title: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    // we use the router as a global configuration point here
    this.activatedRoute.data.subscribe(data => this.title = data['title']);
    this.activatedRoute.url.subscribe(url => {
      const userRoutes: Array<AcTab> = new Array<AcTab>();
      const current = url[url.length - 1].path;
      router.config
        .filter((route) => route.path.startsWith('widget') && route.path.endsWith(current))
        .shift()
        .children.filter((route) => !route.redirectTo)
        .forEach(subroute =>
          // tslint:disable-next-line:max-line-length
          userRoutes.push(new AcTab(['/widget', current, subroute.path], subroute.data['title'], !!subroute.data['active'], !!subroute.data['disabled']))
        );
      this.widgetTabs = new AcTabData(userRoutes);
    });
  }
}

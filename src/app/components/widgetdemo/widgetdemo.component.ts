import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {
    // we use the router as a global configuration point here
    const userRoutes: Array<AcTab> = new Array<AcTab>();
    router.config
      .filter((route, idx) => route.path === 'widgets')
      .shift()
      .children
      .filter((route, idx) => !route.redirectTo)
      .forEach(subroute => userRoutes.push(new AcTab(['/widgets', subroute.path],
                                                     subroute.data['title'],
                                                    !!subroute.data['active'],
                                                    !!subroute.data['disabled'])));
    this.widgetTabs = new AcTabData(userRoutes);
  }

}

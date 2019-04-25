import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AcTabData } from '../ui/tabs/tabs/models/actabdata.model';
import { AcTab } from '../ui/tabs/tabs/models/actab.model';


/**
 * User Manager, defines the tabs that hold the child-outlets.
 */
@Component({
  selector: 'app-editor',
  templateUrl: './editordemo.component.html'
})
export class EditorDemoComponent {

  editorTabs: AcTabData;

  constructor(private router: Router) {
    // we use the router as a global configuration point here
    const userRoutes: Array<AcTab> = new Array<AcTab>();
    router.config
      .filter((route, idx) => route.path === 'editor')
      .shift()
      .children
      .filter((route, idx) => !route.redirectTo)
      .filter((route, idx) => !route.data['private'])
      .forEach(subroute => userRoutes.push(new AcTab(['/editor', subroute.path],
        subroute.data['title'],
        !!subroute.data['active'],
        !!subroute.data['disabled'])));

    this.editorTabs = new AcTabData(userRoutes);
  }


}

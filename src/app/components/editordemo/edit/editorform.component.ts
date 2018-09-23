﻿import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AcTab, AcTabData } from '../..';

/**
 * User Manager, defines the tabs that hold the child-outlets.
 */
@Component({
  selector: 'app-editor',
  templateUrl: './editorform.component.html'
})
export class EditorFormComponent {

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
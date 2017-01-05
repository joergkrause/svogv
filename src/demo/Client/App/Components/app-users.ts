import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AcTab, AcTabData } from 'svogv';

/**
 * User Manager, defines the tabs that hold the child-outlets.
 */
@Component({
  moduleId: module.id,
  selector: 'app-users',
  templateUrl: './app-users.html'
})
export class UsersComponent {

  userTabs: AcTabData;

  constructor(private router: Router) {
    // we use the router as a global configuration point here
    let userRoutes: Array<AcTab> = new Array<AcTab>();
    router.config
      .filter((route, idx) => route.path === "users")
      .shift()
      .children
      .filter((route, idx) => !route.redirectTo)
      .forEach(subroute => userRoutes.push(new AcTab(["/users", subroute.path], subroute.data["title"], !!subroute.data["active"], !!subroute.data["disabled"])));
    
    this.userTabs = new AcTabData(userRoutes);
  }


}

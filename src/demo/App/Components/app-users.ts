import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Tab, TabData } from './Widgets/ac-tabs';

/**
 * User Manager, defines the tabs that hold the child-outlets.
 */
@Component({
  moduleId: module.id,
  selector: 'app-users',
  templateUrl: './app-users.html'
})
export class UsersComponent {

  userTabs: TabData;

  constructor(private router: Router) {
    // we use the router as a global configuration point here
    let userRoutes: Array<Tab> = new Array<Tab>();
    router.config
      .filter((route, idx) => route.path === "users")
      .shift()
      .children
      .filter((route, idx) => !route.redirectTo)
      .forEach(subroute => userRoutes.push(new Tab(["/users", subroute.path], subroute.data["title"], !!subroute.data["active"], !!subroute.data["disabled"])));
    
    this.userTabs = new TabData(userRoutes);
  }


}

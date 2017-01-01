import { Component, Input, OnInit } from '@angular/core';
import * as Rx from 'rxjs/rx';
import { Store } from '@ngrx/store';
// private
import { ActivatedRoute } from '@angular/router';
import { SiteApiService } from '../Services/SiteApiService';
import { EmitterService } from '../Services/EmitterService';
import { StudyViewModel } from '../ViewModels/StudyViewModel';
import { Menu, MenuHeaderItem, MenuLinkItem } from './Widgets/ac-sidemenu';

interface AppState {
  counter: number;
}

@Component({
  moduleId: module.id,
  selector: 'site-root',
  templateUrl: './site-root.html'
})
export class SiteRootComponent implements OnInit {
  user: string;
  currentRoute: { [key: string]: any };
  dynamicMenu: Menu;
  currentYear: string;

  constructor(public apiService: SiteApiService, private route: ActivatedRoute, private store: Store<AppState>) {
    //this.user = new vm.UserViewModel();
    // default on boot
    this.currentRoute = {
      'title': 'Dashboard', 'subtitle': 'CaevMan Overview'
    };
    // subscribe to router to change title
    this.route.data.subscribe(data => {
      console.log(`SUBSCRIBE Route ${data} ${data["title"]}`);
      this.currentRoute = data;
    });
    this.currentYear = new Date().getFullYear().toString();
    this.user = "Fake User";
  }

  private loadData(): void {
    // create menu, this might be come from the server to handle rights & roles
    // the menu is forwarded to the sideMenu component through binding
    this.dynamicMenu = new Menu(
      new MenuHeaderItem("Tasks"),
      new MenuLinkItem("Dashboard", ['/dashboard'], "fa-dashboard"),
      new MenuLinkItem("Users", ['/users'], "fa-user"),
      new MenuLinkItem("Studies", ['/studies'], "fa-database"),
      new MenuLinkItem("Other", ['/others'], "fa-plus")
    );
    // get dashboard data on load and distribute to all listening components
    this.apiService.getStudies().subscribe(data => {
      // TODO: Add to store
      EmitterService.get("BROADCAST_Studies").emit(data);
    });
    this.apiService.getUsers().subscribe(data => {
      // TODO: Add to store
      EmitterService.get("BROADCAST_Users").emit(data);
    });
  }

  ngOnInit() {
    this.loadData();
  }

}
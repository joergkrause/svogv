import { Component, Input, OnInit } from '@angular/core';
import * as Rx from 'rxjs/rx';
// private
import { ActivatedRoute } from '@angular/router';
import { SiteApiService } from '../Services/SiteApiService';
import { EmitterService } from '../Services/EmitterService';
import { AcMenu, AcMenuHeaderItem, AcMenuLinkItem } from 'svogv';

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
  dynamicMenu: AcMenu;
  currentYear: string;

  constructor(public apiService: SiteApiService, private route: ActivatedRoute) {
    //this.user = new vm.UserViewModel();
    // default on boot
    this.currentRoute = {
      'title': 'Dashboard', 'subtitle': 'SVOGV Demo'
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
    this.dynamicMenu = new AcMenu(
      new AcMenuHeaderItem("Tasks"),
      new AcMenuLinkItem("Dashboard", ['/dashboard'], "fa-dashboard"),
      new AcMenuLinkItem("Forms Demo", ['/editor'], "fa-user"),
      new AcMenuLinkItem("About", ['/about'], "fa-database")
      new AcMenuHeaderItem("Widgets"),
      new AcMenuLinkItem("Overview", ['/widgets'], "fa-clock")
    );
    // get dashboard data on load and distribute to all listening components
    this.apiService.getUsers().subscribe(data => {
      EmitterService.get("BROADCAST_Users").emit(data);
    });
  }

  ngOnInit() {
    this.loadData();
  }

}
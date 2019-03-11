import { Component, OnInit } from '@angular/core';
// private
import { ActivatedRoute, Router } from '@angular/router';
import { SiteApiService, EmitterService } from '../../services';
import { AcMenu, AcMenuHeaderItem, AcMenuLinkItem, AcMenuItem } from '../ui/sidemenu/models';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html'
})
export class RootComponent implements OnInit {

  currentRoute: { [key: string]: string };
  dynamicMenu: AcMenu;
  currentYear: string;

  constructor(public apiService: SiteApiService,
              private route: ActivatedRoute,
              private router: Router,
              private emitterService: EmitterService) {
    // default on boot
    this.currentRoute = {
      'title': 'Dashboard', 'subtitle': 'SVOGV Demo'
    };
    // subscribe to router to change title
    this.route.data.subscribe(data => {
      console.log(`SUBSCRIBE Route ${data} ${data['title']}`);
      this.currentRoute = data;
    });
    this.currentYear = new Date().getFullYear().toString();
  }

  private loadData(): void {
    // create menu, this might be come from the server to handle rights & roles
    // the menu is forwarded to the sideMenu component through binding
    const items: Array<AcMenuItem> = [];
    items.push(new AcMenuHeaderItem('Features'));
    this.router.config
        .filter(r => !r.redirectTo && r.path !== '**')
        .filter(r => r.data['features'])
        .forEach(r => items.push(new AcMenuLinkItem(r.data['title'], [r.path], r.data['icon'])));
    items.push(new AcMenuHeaderItem('Information'));
    this.router.config
        .filter(r => !r.redirectTo && r.path !== '**')
        .filter(r => r.data['info'])
        .forEach(r => items.push(new AcMenuLinkItem(r.data['title'], [r.path], r.data['icon'])));
    this.dynamicMenu = new AcMenu(...items);
    // get dashboard data on load and distribute to all listening components
    this.apiService.getUsers().subscribe(data => {
      this.emitterService.get('BROADCAST_Users').emit(data);
    });
  }

  ngOnInit() {
    this.loadData();
  }

}

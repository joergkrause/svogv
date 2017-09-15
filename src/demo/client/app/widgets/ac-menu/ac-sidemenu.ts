import { Component, Input } from '@angular/core';
import { AcMenu } from './models/ac-menu';

@Component({
  selector: 'ac-sidemenu',
  styles: ['.headerItem { margin-left: 32px }',
    '.linkItem { margin-right: 5px }',
    '.sideMenuCanvas { padding: 15px; }'],
  template: `<nav class="nav flex-column sideMenuCanvas" 
                 *ngIf="menu && menu.children && menu.children.length > 0">
              <ng-container *ngFor="let item of menu.children" class="nav-item" [ngSwitch]="itemType(item)">
                <ng-container *ngSwitchCase="'AcMenuHeaderItem'">
                  <i class="headerItem">&nbsp;</i><a><strong>{{ item.text }}</strong></a>
                </ng-container>
                <a *ngSwitchCase="'AcMenuLabelItem'" class="nav-link" href="#">
                  <i class="float-xs-left linkItem hidden-xs-down fa " [ngClass]="item.icon"></i> 
                  <span>{{ item.text }}</span>
                </a>
                <a *ngSwitchCase="'AcMenuLinkItem'" class="nav-link" href="#" [routerLink]="item.link">
                  <i class="float-xs-left linkItem hidden-xs-down fa " [ngClass]="item.icon"></i> 
                  <span>{{ item.text }}</span>
              </a>
              </ng-container>
            </nav>`
})
export class AcSideMenu {

  /**
   * The menu's data.
   */
  @Input() menu: AcMenu;
  /**
   * Format links so they use [routerlink] syntax. Default is true.
   */
  @Input() useRouterLinks = true;

  constructor() {
    console.log('AcSideMenu ctor');
    // create Menu dynamically
  }

  ngOnInit() {
    console.log('AcSideMenu onInit');
  }

  // tslint:disable-next-line:no-unused-variable
  private itemType(item: any): string {
    if (item === undefined || item === null) {
      throw new Error('The reflection metadata could not be found.');
    }
    let itemType: string = item['__name__'];
    return itemType;
  }


}

import { Component, Input, OnChanges, OnInit } from '@angular/core';

/**
 * Base class for menu items.
 */
export abstract class AcMenuItem {
  text: string;
  __name__:string; // a minifier robust type identifier 
  constructor(text: string) {
    this.text = text;
  }
}

/**
 * A header, not clickable element in the menu
 */
export class AcMenuHeaderItem extends AcMenuItem {
  __name__ = "AcMenuHeaderItem";
  constructor(text: string) {
    super(text);
  }
}

/**
 * A non clickable item in the menu, can provide an icon.
 */
export class AcMenuLabelItem extends AcMenuHeaderItem {
  __name__ = "AcMenuLabelItem";
  icon: string;
  constructor(text: string, icon?: string) {
    super(text);
    this.icon = icon;
  }
}

/**
 * A regular, clickable element with text and icon.
 */
export class AcMenuLinkItem extends AcMenuLabelItem {
  __name__ = "AcMenuLinkItem";
  link: Array<string>;
  constructor(text: string, link: string[], icon?: string) {
    super(text, icon);
    this.link = link;
  }
}

/**
 * The menu container, can provide a recursive list of menu items.
 */
export class AcMenu {
  public children: Array<AcMenuItem>

  constructor(...items: Array<AcMenuItem>) {
    this.children = items;
  }

  // Get the item and return null if not of expected subtype, or text not unique, or not found.
  getMenuItem<T extends AcMenuItem>(name: string): T {
    let foundItems = this.children.filter(item => item.text === name);
    if (foundItems.length === 1) return foundItems[0] as T;
    return null;
  };

}

@Component({
  selector: 'ac-sidemenu',
  styles: ['.headerItem { margin-left: 32px }', '.linkItem { margin-right: 5px }', '.sideMenuCanvas { padding: 15px; }'],
  template: `<nav class="nav nav-pills nav-stacked sideMenuCanvas" *ngIf="menu && menu.children && menu.children.length > 0">
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
  @Input() useRouterLinks: boolean = true;

  constructor() {
    console.log("AcSideMenu ctor");
    // create Menu dynamically
  }

  ngOnInit() {
    console.log("AcSideMenu onInit");
  }

  private itemType(item: any) : string {
    if (item === undefined || item === null) {
      throw new Error("The reflection metadata could not be found.");
    }
    let itemType :string = item["__name__"];
    return itemType;
  }


}

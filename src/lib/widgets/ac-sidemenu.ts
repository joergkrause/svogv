import { Component, Input, OnChanges, OnInit } from '@angular/core';

export class MenuItem {
  text: string;
  constructor(text: string) {
    this.text = text;
  }
}

export class MenuHeaderItem extends MenuItem {
  constructor(text: string) {
    super(text);
  }
}

export class MenuLabelItem extends MenuHeaderItem {
  icon: string;
  constructor(text: string, icon?: string) {
    super(text);
    this.icon = icon;
  }
}

export class MenuLinkItem extends MenuLabelItem {
  link: Array<string>;

  constructor(text: string, link: string[], icon?: string) {
    super(text, icon);
    this.link = link;
  }
}

export class Menu {
  public children: Array<MenuItem>

  constructor(...items: Array<MenuItem>) {
    this.children = items;
  }

  // Get the item and return null if not of expected subtype, or text not unique, or not found.
  getMenuItem<T extends MenuItem>(name: string): T {
    let foundItems = this.children.filter(item => item.text === name);
    if (foundItems.length === 1) return foundItems[0] as T;
    return null;
  };

}

@Component({
  selector: 'ac-sidemenu',
  styles: ['.headerItem { margin-left: 32px }', '.linkItem { margin-right: 5px }', '.sideMenuCanvas { padding: 15px; }'],
  template: `<div class="row row-offcanvas row-offcanvas-left sideMenuCanvas">
                 <div class="col-md-3 col-lg-2 sidebar-offcanvas" id="sidebar" role="navigation">
                   <nav class="nav nav-pills nav-stacked" *ngIf="menu && menu.children && menu.children.length > 0">
                     <ng-container *ngFor="let item of menu.children" class="nav-item" [ngSwitch]="itemType(item)">
                       <ng-container *ngSwitchCase="'MenuHeaderItem'">
                         <i class="headerItem">&nbsp;</i><a><strong>{{ item.text }}</strong></a>
                       </ng-container>
                       <a *ngSwitchCase="'MenuLabelItem'" class="nav-link" href="#">
                         <i class="float-xs-left linkItem hidden-xs-down fa " [ngClass]="item.icon"></i> 
                         <span>{{ item.text }}</span>
                       </a>
                       <a *ngSwitchCase="'MenuLinkItem'" class="nav-link" href="#" [routerLink]="item.link">
                         <i class="float-xs-left linkItem hidden-xs-down fa " [ngClass]="item.icon"></i> 
                         <span>{{ item.text }}</span>
                      </a>
                     </ng-container>
                   </nav>
                 </div>
               </div>`
})
export class SideMenu {

  @Input() menu: Menu;
  useRouterLinks: boolean = true;

  constructor() {
    console.log("SideMenu ctor");
    // create Menu dynamically
  }

  ngOnInit() {
    console.log("SideMenu onInit");
  }

  private itemType(item: any) : string {
    if (item === undefined || item === null) {
      throw new Error("The reflection metadata could not be found.");
    }
    let itemType :string = item.constructor["name"].toString();
    return itemType;
  }


}

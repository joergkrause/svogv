import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';

/**
 * Create a single tab for tab views. The link shall be a regular route array.
 */
export class Tab {

  /**
   * Ctor to create Tabs definitions
   * @param link: Array of routes or outlet routes
   * @param text: Text shown on tab
   * @param active: Set class for active tab
   * @param disabled: Optionally set the tab inactive
   */
  constructor(public link: Array<string | {}>, public text: string, public active: boolean, public disabled?: boolean) {
  }

}

/**
 * A collection of tabs used to create a tabbed view. The tabs' content is pulled from routes / child routes.
 */
export class TabData {

  constructor(items: Array<Tab>) {
    this.tabs = items;
  }

  tabs: Array<Tab>;

}

/**
 * The Tab Component. This looks like a Bootstrap component, but the active part is the Angular router, so no data-toggle is required.
 */
@Component({
  selector: 'ac-tabs',
  template: `<ul class="nav nav-tabs" role="tablist">
                <li class="nav-item" *ngFor="let tab of tabs.tabs" [ngClass]="{ active: tab.active }">
                    <a class="nav-link " *ngIf="!tab.disabled"                        
                       (click)="activateTab(tab)"
                       [ngClass]="{ active: tab.active }"
                       href="#" [routerLink]="tab.link"
                       role="tab" >{{ tab.text }}</a>
                    <a class="nav-link text-muted" *ngIf="tab.disabled"                      
                       href="#" disabled="disabled" onclick="return false;"
                       role="tab" >{{ tab.text }}</a>
                </li>
            </ul>
            <div class="tab-content">
              <br />
              <div role="tabpanel" class="tab-pane active">
                <router-outlet></router-outlet>
              </div>
            </div>
`
}) //
export class AcTabs {
  @Input() tabs: TabData;
  @Output() currentTab: Tab;

  constructor() {
  }

  activateTab(tab: Tab) {
    this.currentTab = tab;
    this.tabs.tabs.forEach(t => t.active = false);
    tab.active = true; 
  }

}

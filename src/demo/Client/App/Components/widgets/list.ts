import { Component, OnInit } from '@angular/core';
import { AcMenu, AcMenuLinkItem } from 'svogv';

@Component({
  moduleId: module.id,
  templateUrl: './list.html'
})
export class ListWidgetsComponent implements OnInit {

  public formWidgets : AcMenu

  public svgComponents : AcMenu


  constructor() {
  }

  ngOnInit(){
    this.formWidgets = new AcMenu(
        new AcMenuLinkItem('TreeView', ['/widgets/tree'])
      , new AcMenuLinkItem('DropDown', ['/widgets/drop'])
      , new AcMenuLinkItem('InfoBox', ['/widgets/info'])
      , new AcMenuLinkItem('BreadCrumb', ['/widgets/bread']));
    this.svgComponents = new AcMenu(
        new AcMenuLinkItem('Analog Clock', ['/widgets/clock'])
      , new AcMenuLinkItem('Loader Icon', ['/widgets/loader']));
    // Link items will use the router by default 
  }


}
import { Component } from '@angular/core';
import { EmitterService } from '../Services/EmitterService';
import { SiteApiService } from '../Services/SiteApiService';
import { UserViewModel } from '../ViewModels/UserViewModel';
import { AcTreeNodeOptions, AcTextTreeNode, AcTreeNode } from 'svogv';

/**
 * Dashboard shows global data. The data are retrieved in the root and broadcastet, the broadcaster can use redux to store as state.
 */
@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: './app-dashboard.html'
})
export class DashboardComponent {

  users: Array<UserViewModel> = [];
  treeData: AcTreeNode;

  constructor(private apiService: SiteApiService) {
    // raw data for tiles
    EmitterService.get("BROADCAST_Users").subscribe(data => {
      console.log("Dashboard received BROADCAST_Users event");
      this.users = data;
    });
    // raw data for treeview
    let options: AcTreeNodeOptions = new AcTreeNodeOptions();
    options.backColor = '#fff';
    options.checkable = false;
    options.color = 'blue';
    options.collapsable = true;
    options.selectable = true;

    let optionsc: AcTreeNodeOptions = new AcTreeNodeOptions();
    optionsc.backColor = 'yellow';
    optionsc.checkable = true;
    optionsc.color = 'red';
    optionsc.collapsable = true;
    optionsc.selectable = true;

    let optionsi: AcTreeNodeOptions = new AcTreeNodeOptions();
    optionsi.backColor = '#fff';
    optionsi.checkable = false;
    optionsi.color = 'green';
    optionsi.collapsable = true;
    optionsi.icon = "fa-glass";
    optionsi.iconColor = "silver";
    optionsi.selectable = false;

    this.treeData = new AcTextTreeNode('Root node', options, [
      new AcTextTreeNode('Child node #1', options),
      new AcTextTreeNode('Child node #2', optionsi),
      new AcTextTreeNode('Child node #3', options),
      new AcTextTreeNode('Child node #4', options, [
        new AcTextTreeNode('Hello', options),
        new AcTextTreeNode('Ahoy', optionsc, [
          new AcTextTreeNode('Child deep A', options),
          new AcTextTreeNode('Child deep B', optionsi),
          new AcTextTreeNode('Child deep C', options)
        ]),
        new AcTextTreeNode('Hola', optionsc),
      ]),
      new AcTextTreeNode('Child node #5', options),
    ]);
  }

  ngOnInit() {
    console.log("Dashboard initializing");
    // retrieve fresh data on init, independently of the broadcast
    this.apiService.getUsers().subscribe(data => {
      this.users = data;
    });
  }


}
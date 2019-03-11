import { Component } from '@angular/core';
import { TreeNodeOptions, TextTreeNodeModel, TreeNodeModel } from 'svogv';

@Component({
  selector: 'app-treeview',
  templateUrl: './treeviewdemo.component.html'
})
export class TreeviewDemoComponent {
  public treeData: TreeNodeModel;
  private eventLog: Array<string> = new Array<string>();

  constructor() {
    // raw data for treeview
    const options: TreeNodeOptions = new TreeNodeOptions();
    options.backColor = '#fff';
    options.checkable = false;
    options.color = 'blue';
    options.collapsable = true;
    options.selectable = true;

    const optionsc: TreeNodeOptions = new TreeNodeOptions();
    optionsc.backColor = 'yellow';
    optionsc.checkable = true;
    optionsc.color = 'red';
    optionsc.collapsable = true;
    optionsc.selectable = true;

    const optionsi: TreeNodeOptions = new TreeNodeOptions();
    optionsi.backColor = '#fff';
    optionsi.checkable = false;
    optionsi.color = 'green';
    optionsi.collapsable = true;
    optionsi.icon = 'fa-glass';
    optionsi.iconColor = 'silver';
    optionsi.selectable = false;

    this.treeData = new TextTreeNodeModel('Root node', options, [
      new TextTreeNodeModel('Child node #1', options),
      new TextTreeNodeModel('Child node #2', optionsi),
      new TextTreeNodeModel('Child node #3', options),
      new TextTreeNodeModel('Child node #4', options, [
        new TextTreeNodeModel('Hello', options),
        new TextTreeNodeModel('Ahoy', optionsc, [
          new TextTreeNodeModel('Child deep A', options),
          new TextTreeNodeModel('Child deep B', optionsi),
          new TextTreeNodeModel('Child deep C', options)
        ]),
        new TextTreeNodeModel('Hola', optionsc)
      ]),
      new TextTreeNodeModel('Child node #5', options)
    ]);
  }

  public nodeEvent(name: string, eventSource: TreeNodeModel) {
    this.eventLog.push(`${eventSource.name} said ${name}`);
  }
}

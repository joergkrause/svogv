import { Component } from '@angular/core';
import { AcTreeNodeOptions, AcTextTreeNode, AcTreeNode } from 'svogv/svogv';

@Component({
  selector: 'app-treeview',
  templateUrl: './treeview.component.html'
})
export class TreeviewComponent {
  public treeData: AcTreeNode;
  private eventLog: Array<string> = new Array<string>();

  constructor() {
    // raw data for treeview
    const options: AcTreeNodeOptions = new AcTreeNodeOptions();
    options.backColor = '#fff';
    options.checkable = false;
    options.color = 'blue';
    options.collapsable = true;
    options.selectable = true;

    const optionsc: AcTreeNodeOptions = new AcTreeNodeOptions();
    optionsc.backColor = 'yellow';
    optionsc.checkable = true;
    optionsc.color = 'red';
    optionsc.collapsable = true;
    optionsc.selectable = true;

    const optionsi: AcTreeNodeOptions = new AcTreeNodeOptions();
    optionsi.backColor = '#fff';
    optionsi.checkable = false;
    optionsi.color = 'green';
    optionsi.collapsable = true;
    optionsi.icon = 'fa-glass';
    optionsi.iconColor = 'silver';
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
        new AcTextTreeNode('Hola', optionsc)
      ]),
      new AcTextTreeNode('Child node #5', options)
    ]);
  }

  public nodeEvent(name: string, eventSource: AcTreeNode) {
    this.eventLog.push(`${eventSource.name} said ${name}`);
  }
}

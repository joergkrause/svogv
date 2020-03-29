import { Type, Component } from '@angular/core';
import { TreeNodeOptions } from './treenodeoptions.model';
import { TreeNodeModel } from './treenode.model';

/**
 * This type can load a component's UI into the node.
 */
export class TreeNodeComponentModel extends TreeNodeModel {
  component: Type<Component>;
  constructor(component: Type<Component>, options?: TreeNodeOptions, nodes?: TreeNodeModel | TreeNodeModel[]) {
    super(options, nodes);
    this.component = component;
  }
}



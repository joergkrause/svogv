import { Type, Component } from '@angular/core';
import { TreeNodeOptions } from './vm-treenodeoptions';
import { TreeNode } from './vm-treenode';

export class ComponentTreeNode extends TreeNode {
    component: Type<Component>;
    constructor(component: Type<Component>, options?: TreeNodeOptions, nodes?: TreeNode | TreeNode[]) {
        super(options, nodes);
        this.component = component;
    }
}



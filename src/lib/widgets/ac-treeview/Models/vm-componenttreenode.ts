import { Type, Component } from '@angular/core';
import { AcTreeNodeOptions } from './vm-treenodeoptions';
import { AcTreeNode } from './vm-treenode';

export class AcComponentTreeNode extends AcTreeNode {
    component: Type<Component>;
    constructor(component: Type<Component>, options?: AcTreeNodeOptions, nodes?: AcTreeNode | AcTreeNode[]) {
        super(options, nodes);
        this.component = component;
    }
}



import { Type, Component } from '@angular/core';
import { AcTreeNodeOptions } from './ac-treenodeoptions';
import { AcTreeNode } from './ac-treenode';

/**
 * This type can load a component's UI into the node.
 */
export class AcComponentTreeNode extends AcTreeNode {
    component: Type<Component>;
    constructor(component: Type<Component>, options?: AcTreeNodeOptions, nodes?: AcTreeNode | AcTreeNode[]) {
        super(options, nodes);
        this.component = component;
    }
}



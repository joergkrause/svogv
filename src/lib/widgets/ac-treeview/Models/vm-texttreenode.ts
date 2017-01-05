import { Type, Component } from '@angular/core';
import { AcTreeNodeOptions, AcTreeNodeState } from './vm-treenodeoptions';
import { AcTreeNode } from './vm-treenode';

export class AcTextTreeNode extends AcTreeNode {
    text: string;

    constructor(text: string, options?: AcTreeNodeOptions, nodes?: AcTreeNode | AcTreeNode[]) {
        super(options, nodes);
        this.text = text;
        this.name = text; // default, must be set explicitly
    }
}


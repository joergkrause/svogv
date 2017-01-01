import { Type, Component } from '@angular/core';
import { TreeNodeOptions, TreeNodeState } from './vm-treenodeoptions';
import { TreeNode } from './vm-treenode';

export class TextTreeNode extends TreeNode {
    text: string;

    constructor(text: string, options?: TreeNodeOptions, nodes?: TreeNode | TreeNode[]) {
        super(options, nodes);
        this.text = text;
        this.name = text; // default, must be set explicitly
    }
}


import { AcTreeNodeOptions } from './ac-treenodeoptions';
import { AcTreeNode } from './ac-treenode';

export class AcTextTreeNode extends AcTreeNode {
    text: string;

    constructor(text: string, options?: AcTreeNodeOptions, nodes?: AcTreeNode | AcTreeNode[]) {
        super(options, nodes);
        this.text = text;
        this.name = text; // default, must be set explicitly
    }
}


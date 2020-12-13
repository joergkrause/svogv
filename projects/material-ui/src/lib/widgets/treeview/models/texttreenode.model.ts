import { TreeNodeOptions } from './treenodeoptions.model';
import { TreeNodeModel } from './treenode.model';

/**
 * A text node
 */
export class TextTreeNodeModel extends TreeNodeModel {
  text: string;

  constructor(text: string, options?: TreeNodeOptions, nodes?: TreeNodeModel | TreeNodeModel[]) {
    super(options, nodes);
    this.text = text;
    this.name = text; // default, must be set explicitly
  }
}


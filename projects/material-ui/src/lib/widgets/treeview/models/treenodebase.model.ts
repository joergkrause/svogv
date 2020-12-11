import { TreeNodeOptions } from './treenodeoptions.model';

/**
 * The base class.
 */
export interface TreeNodeBaseModel {
  parent: TreeNodeBaseModel;
  children: TreeNodeBaseModel[];
  options: TreeNodeOptions;
  add(node: TreeNodeBaseModel | TreeNodeBaseModel[]): void;
  remove(node: TreeNodeBaseModel): boolean;
  hasDirectAncestor(node: TreeNodeBaseModel): boolean;
}

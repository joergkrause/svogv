import { AcTreeNodeOptions } from './ac-treenodeoptions';

export interface AcTreeNodeBase {
    parent: AcTreeNodeBase;
    children: AcTreeNodeBase[];
    options: AcTreeNodeOptions;
    add(node: AcTreeNodeBase | AcTreeNodeBase[]): void;
    remove(node: AcTreeNodeBase): boolean;
    hasDirectAncestor(node: AcTreeNodeBase): boolean;
}

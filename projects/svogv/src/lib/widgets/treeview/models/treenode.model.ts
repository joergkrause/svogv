import { EventEmitter } from '@angular/core';
import * as tree from './treenodeoptions.model';
import { TreeNodeBaseModel } from './treenodebase.model';

/**
 * The base class for tree nodes.
 */
export class TreeNodeModel implements TreeNodeBaseModel {
    /**
     * Control appearance
     */
    options: tree.TreeNodeOptions;
    /**
     * structure
     */
    parent: TreeNodeModel;
    /**
     * Subsequent nodes.
     */
    children: TreeNodeModel[];
    /**
     * An identifier.
     */
    name: string;
    /**
     * Field id
     */
    id: number;
    /**
     * behavior
     */
    stateChange: EventEmitter<tree.TreeNodeState>;

    private _state: tree.TreeNodeState;

    constructor(options?: tree.TreeNodeOptions, nodes?: TreeNodeModel | TreeNodeModel[]) {
        this.options = options || new tree.TreeNodeOptions();
        if (nodes && nodes instanceof Array) {
            this.children = <TreeNodeModel[]>nodes;
        } else {
            if (nodes) {
                this.children = [<TreeNodeModel>nodes];
            }
        }
        this.stateChange = new EventEmitter<tree.TreeNodeState>();
        this.state = tree.TreeNodeState.undefined;
    }

    get path(): Array<TreeNodeModel> {
        // walk up tree and return path with names
        const p: Array<TreeNodeModel> = new Array<TreeNodeModel>();
        p.push(this);
        let n: TreeNodeModel = this;
        while (this.parent) {
            n = n.parent;
            p.push(n);
        }
        return p;
    }

    hasDirectAncestor(node: TreeNodeBaseModel): boolean {
        return this.parent !== undefined;
    }

    get hasChildren(): boolean {
        return this.children !== undefined && this.children.length > 0;
    }

    add(nodes: TreeNodeModel | TreeNodeModel[]): void {
        if (nodes && nodes instanceof Array) {
            this.children.push(...<TreeNodeModel[]>nodes);
        } else {
            this.children.push(<TreeNodeModel>nodes);
        }
    }

    remove(node: TreeNodeModel): boolean {
        const idx: number = this.children.indexOf(node);
        if (idx > -1) {
            this.children.splice(idx, 1);
            return true;
        } else {
            return false;
        }
    }

    get state(): tree.TreeNodeState {
        return this._state;
    }
    set state(value: tree.TreeNodeState) {
        this._state = value;
        this.stateChange.emit(this._state);
    }

    get stateIsExpandend(): boolean {
        return (this.state & tree.TreeNodeState.expanded) === tree.TreeNodeState.expanded;
    }

    get stateIsDisabled(): boolean {
        return (this.state & tree.TreeNodeState.disabled) === tree.TreeNodeState.disabled;
    }

    get stateIsSelected(): boolean {
        return (this.state & tree.TreeNodeState.selected) === tree.TreeNodeState.selected;
    }

    get stateIsChecked(): boolean {
        return (this.state & tree.TreeNodeState.checked) === tree.TreeNodeState.checked;
    }

}

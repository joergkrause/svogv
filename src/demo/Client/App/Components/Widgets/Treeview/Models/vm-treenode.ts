import { Type, Component, EventEmitter } from '@angular/core';
import * as ubertree from './vm-treenodeoptions';
import { TreeNodeBase } from './vm-treenodebase';
import * as Rx from 'rxjs/rx';

export class TreeNode implements TreeNodeBase {
    // control appearance
    options: ubertree.TreeNodeOptions;
    // strcuture
    parent: TreeNode;
    children: TreeNode[];
    // identifier
    name: string;
    id: number;
    // behavior
    stateChange: EventEmitter<ubertree.TreeNodeState>; 
    private _state: ubertree.TreeNodeState;

    constructor(options?: ubertree.TreeNodeOptions, nodes?: TreeNode | TreeNode[]) {
        this.options = options || new ubertree.TreeNodeOptions();
        if (nodes && nodes instanceof Array) {
            this.children = <TreeNode[]>nodes;
        } else {
            if (nodes) {
                this.children = [<TreeNode>nodes];
            }
        }
        this.stateChange = new EventEmitter<ubertree.TreeNodeState>();
        this.state = ubertree.TreeNodeState.undefined;
    }

    get path(): Array<TreeNode> {
        // walk up tree and return path with names
        let p: Array<TreeNode> = new Array<TreeNode>();
        p.push(this);
        let n: TreeNode = this; 
        while (this.parent) {
            n = n.parent;
            p.push(n);
        }
        return p;
    }

    hasDirectAncestor(node: TreeNodeBase): boolean {
        return this.parent !== undefined;
    }

    get hasChildren(): boolean {
        return this.children !== undefined && this.children.length > 0;
    }

    add(nodes: TreeNode | TreeNode[]): void {
        if (nodes && nodes instanceof Array) {
            this.children.push(...<TreeNode[]>nodes);
        } else {
            this.children.push(<TreeNode>nodes);
        }
    }

    remove(node: TreeNode): boolean {
        let idx : number = this.children.indexOf(node);
        if (idx > -1) {
            this.children.splice(idx, 1);
            return true;
        } else {
            return false;
        }
    }

    get state(): ubertree.TreeNodeState {
        return this._state;
    }
    set state(value: ubertree.TreeNodeState) {
        this._state = value;
        this.stateChange.emit(this._state);
    }

    get stateIsExpandend(): boolean {
        return (this.state & ubertree.TreeNodeState.expanded) === ubertree.TreeNodeState.expanded;
    }

    get stateIsDisabled(): boolean {
        return (this.state & ubertree.TreeNodeState.disabled) === ubertree.TreeNodeState.disabled;
    }

    get stateIsSelected(): boolean {
        return (this.state & ubertree.TreeNodeState.selected) === ubertree.TreeNodeState.selected;
    }

    get stateIsChecked(): boolean {
        return (this.state & ubertree.TreeNodeState.checked) === ubertree.TreeNodeState.checked;
    }


}
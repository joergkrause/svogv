import { Type, Component, EventEmitter } from '@angular/core';
import * as tree from './vm-treenodeoptions';
import { AcTreeNodeBase } from './vm-treenodebase';
import * as Rx from 'rxjs/rx';

export class AcTreeNode implements AcTreeNodeBase {
    // control appearance
    options: tree.AcTreeNodeOptions;
    // strcuture
    parent: AcTreeNode;
    children: AcTreeNode[];
    // identifier
    name: string;
    id: number;
    // behavior
    stateChange: EventEmitter<tree.AcTreeNodeState>; 
    private _state: tree.AcTreeNodeState;

    constructor(options?: tree.AcTreeNodeOptions, nodes?: AcTreeNode | AcTreeNode[]) {
        this.options = options || new tree.AcTreeNodeOptions();
        if (nodes && nodes instanceof Array) {
            this.children = <AcTreeNode[]>nodes;
        } else {
            if (nodes) {
                this.children = [<AcTreeNode>nodes];
            }
        }
        this.stateChange = new EventEmitter<tree.AcTreeNodeState>();
        this.state = tree.AcTreeNodeState.undefined;
    }

    get path(): Array<AcTreeNode> {
        // walk up tree and return path with names
        let p: Array<AcTreeNode> = new Array<AcTreeNode>();
        p.push(this);
        let n: AcTreeNode = this; 
        while (this.parent) {
            n = n.parent;
            p.push(n);
        }
        return p;
    }

    hasDirectAncestor(node: AcTreeNodeBase): boolean {
        return this.parent !== undefined;
    }

    get hasChildren(): boolean {
        return this.children !== undefined && this.children.length > 0;
    }

    add(nodes: AcTreeNode | AcTreeNode[]): void {
        if (nodes && nodes instanceof Array) {
            this.children.push(...<AcTreeNode[]>nodes);
        } else {
            this.children.push(<AcTreeNode>nodes);
        }
    }

    remove(node: AcTreeNode): boolean {
        let idx : number = this.children.indexOf(node);
        if (idx > -1) {
            this.children.splice(idx, 1);
            return true;
        } else {
            return false;
        }
    }

    get state(): tree.AcTreeNodeState {
        return this._state;
    }
    set state(value: tree.AcTreeNodeState) {
        this._state = value;
        this.stateChange.emit(this._state);
    }

    get stateIsExpandend(): boolean {
        return (this.state & tree.AcTreeNodeState.expanded) === tree.AcTreeNodeState.expanded;
    }

    get stateIsDisabled(): boolean {
        return (this.state & tree.AcTreeNodeState.disabled) === tree.AcTreeNodeState.disabled;
    }

    get stateIsSelected(): boolean {
        return (this.state & tree.AcTreeNodeState.selected) === tree.AcTreeNodeState.selected;
    }

    get stateIsChecked(): boolean {
        return (this.state & tree.AcTreeNodeState.checked) === tree.AcTreeNodeState.checked;
    }


}
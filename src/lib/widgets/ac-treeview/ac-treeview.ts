import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { AcTreeNode, AcTextTreeNode, AcComponentTreeNode, AcTreeNodeOptions } from './Models/index';

@Component({
    selector: 'ac-tree',
    template: `<ul class="treeview">
                 <ac-treenode [node]="treeElements" 
                               (nodeClick)="onNodeClick($event)" 
                               (checkChanged)="onCheckChanged($event)"
                               (selectedChanged)="onSelectedChanged($event)"
                               (collapseChanged)="onCollapseChanged($event)"
                  ></ac-treenode>
               </ul>`,
    styles: ['.treeview { list-style: none; margin-left: -25px; }']
}) //
export class AcTreeView {
    @Input() nodes: AcTreeNode;
    @Output() nodeClick: EventEmitter<AcTreeNode> = new EventEmitter<AcTreeNode>();
    @Output() checkChanged: EventEmitter<AcTreeNode> = new EventEmitter<AcTreeNode>();
    @Output() selectedChanged: EventEmitter<AcTreeNode> = new EventEmitter<AcTreeNode>();
    @Output() collapseChanged: EventEmitter<AcTreeNode> = new EventEmitter<AcTreeNode>();

    constructor() {

    }

    onNodeClick(node: AcTreeNode) {
        this.nodeClick.emit(node);
    }

    onCheckChanged(node: AcTreeNode) {
        this.checkChanged.emit(node);
    }

    onSelectedChanged(node: AcTreeNode) {
        this.selectedChanged.emit(node);
    }

    onCollapseChanged(node: AcTreeNode) {
        this.collapseChanged.emit(node);
    }

    ngOnChanges(): void {
        return;
        // read json from server and convert into tree
        //let root = new TextTreeNode('Search Objects', null, []);
        //let text: string = "";
        //let subt: string = "";
        //if (this.nodes) {
        //    if (this.nodes.properties) {
        //        for (var node in this.nodes.properties) {
        //            text = node;
        //            let children: Array<TextTreeNode> = new Array<TextTreeNode>();
        //            if (this.nodes.properties[node].properties) {
        //                for (var subnode in this.nodes.properties[node].properties) {
        //                    subt = `${subnode} (${this.nodes.properties[node].properties[subnode].type})`;
        //                    let sn = new TextTreeNode(subt);
        //                    children.push(sn);
        //                }
        //            }
        //            let tn = new TextTreeNode(text, null, children);
        //            root.add(tn);
        //        }
        //        this.treeElements = root;
        //    }
        //}

    }

}
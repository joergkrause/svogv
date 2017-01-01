import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { TreeNode, TextTreeNode, ComponentTreeNode, TreeNodeOptions } from './Models/index';

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
export class TreeView {
    @Input() nodes: any;
    @Output() nodeClick: EventEmitter<TreeNode> = new EventEmitter<TreeNode>();
    @Output() checkChanged: EventEmitter<TreeNode> = new EventEmitter<TreeNode>();
    @Output() selectedChanged: EventEmitter<TreeNode> = new EventEmitter<TreeNode>();
    @Output() collapseChanged: EventEmitter<TreeNode> = new EventEmitter<TreeNode>();
    treeElements: TextTreeNode;

    constructor() {
        let options: TreeNodeOptions = new TreeNodeOptions();
        options.backColor = '#fff';
        options.checkable = false;
        options.color = 'blue';
        options.collapsable = true;
        options.selectable = true;

        let optionsc: TreeNodeOptions = new TreeNodeOptions();
        optionsc.backColor = 'yellow';
        optionsc.checkable = true;
        optionsc.color = 'red';
        optionsc.collapsable = true;
        optionsc.selectable = true;

        let optionsi: TreeNodeOptions = new TreeNodeOptions();
        optionsi.backColor = '#fff';
        optionsi.checkable = false;
        optionsi.color = 'green';
        optionsi.collapsable = true;
        optionsi.icon = "fa-glass";
        optionsi.iconColor = "silver";
        optionsi.selectable = false;

        this.treeElements = new TextTreeNode('Root node', options, [
            new TextTreeNode('Child node #1', options),
            new TextTreeNode('Child node #2', optionsi),
            new TextTreeNode('Child node #3', options),
            new TextTreeNode('Child node #4', options, [
                new TextTreeNode('Hello', options),
                new TextTreeNode('Ahoy', optionsc, [
                    new TextTreeNode('Child deep A', options),
                    new TextTreeNode('Child deep B', optionsi),
                    new TextTreeNode('Child deep C', options)
                ]),
                new TextTreeNode('Hola', optionsc),
            ]),
            new TextTreeNode('Child node #5', options),
        ]);
    }

    onNodeClick(node: TreeNode) {
        this.nodeClick.emit(node);
    }

    onCheckChanged(node: TreeNode) {
        this.checkChanged.emit(node);
    }

    onSelectedChanged(node: TreeNode) {
        this.selectedChanged.emit(node);
    }

    onCollapseChanged(node: TreeNode) {
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
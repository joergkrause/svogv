import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TreeNodeModel } from './models';

/**
 * The treeview can held any tree of nodes, which can be styles, linked, and bound to events.
 * Clicking on the items fires various events.
 *
 * The component creates a treeview that can handle {@link TreeNodeModel objects that create text, checkboxes, or}highlights.
 * A node can have an icon. The icons are based on FontAwesome's css classes.
 *
 * Example of usage:
 * <example-url>/#/widget/tree</example-url>
 */
@Component({
    selector: 'ac-tree',
    templateUrl: './treeview.component.html',
    styles: ['.treeview { list-style: none; margin-left: -25px; }']
}) //
export class TreeViewComponent {
    @Input() nodes: TreeNodeModel;
    @Output() nodeClick: EventEmitter<TreeNodeModel> = new EventEmitter<TreeNodeModel>();
    @Output() checkChanged: EventEmitter<TreeNodeModel> = new EventEmitter<TreeNodeModel>();
    @Output() selectedChanged: EventEmitter<TreeNodeModel> = new EventEmitter<TreeNodeModel>();
    @Output() collapseChanged: EventEmitter<TreeNodeModel> = new EventEmitter<TreeNodeModel>();

    constructor() {

    }

    onNodeClick(node: TreeNodeModel) {
        this.nodeClick.emit(node);
    }

    onCheckChanged(node: TreeNodeModel) {
        this.checkChanged.emit(node);
    }

    onSelectedChanged(node: TreeNodeModel) {
        this.selectedChanged.emit(node);
    }

    onCollapseChanged(node: TreeNodeModel) {
        this.collapseChanged.emit(node);
    }

}

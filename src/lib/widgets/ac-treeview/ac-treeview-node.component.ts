import {
    Component, Input, Output,
    EventEmitter, OnInit, ElementRef, Renderer
} from '@angular/core';
import { AcTextTreeNode, AcTreeNode, AcTreeNodeState } from './models/index';

/**
 * The treenode class represents a single treenode for the treeview. Actually, this renders the real UI.
 *
 * The component needs this input value:
 *
 * * @Input() node: AcTextTreeNode;
 *
 * The several options are set through the AcTreeNodeOptions object that is being held by the   
 * AcTextTreeNode class. This includes colors, icons, and other styles. 
 *
 * The component can fire these events:
 *
 * * @Output() nodeClick: EventEmitter<AcTreeNode>;
 * * @Output() checkChanged: EventEmitter<AcTreeNode>;
 * * @Output() selectedChanged: EventEmitter<AcTreeNode>;
 * * @Output() collapseChanged: EventEmitter<AcTreeNode>; 
 * 
 */
@Component({
    selector: 'ac-treenode',
    template: `<li class="treeview" (click)="handleClick($event)">
                   <i class="ac-collapse" [ngClass]="collapseClasses" *ngIf="node.hasChildren" (click)="handleCollapse()"></i>
                   <i class="ac-collapse" *ngIf="!node.hasChildren"></i>
                   <i class="ac-icon" [ngClass]="iconClasses" [style.color]="node.options.iconColor" *ngIf="!node.options.checkable"></i>
                   <input type="checkbox" [id]="node.name" *ngIf="node.options.checkable" 
                          [checked]="node.stateIsChecked" (click)="handleCheckChange()">
                   <label [attr.for]="node.name"></label>
                   <a class="ac-container"
                         [href]="href"
                         [style.color]="foreColor" 
                         [style.background-color]="backColor" 
                         (mouseover)="handlePreSelection(true)"
                         (mouseout)="handlePreSelection(false)"
                         (click)="handleSelection($event)">
                       {{ node.text }}
                   </a>
                   <ul class="treeview" *ngIf="node.hasChildren" [hidden]="!isExpanded">
                       <ac-treenode *ngFor="let child of node.children" 
                                    [node]="child"
                                    (nodeClick)="onNodeClick($event)" 
                                    (checkChanged)="onCheckChanged($event)"
                                    (selectedChanged)="onSelectedChanged($event)"
                                    (collapseChanged)="onCollapseChanged($event)">
                       </ac-treenode>
                   </ul>                   
               </li>`,
    styles: [
        'ul.treeview { list-style: none; margin-left: -2em; }',
        'li.treeview  { margin-left: 10px; margin-bottom: 3px; box-sizing: border-box; }',
        'li.treeview a.ac-container { border-radius: 2px; display: inline-block; padding: 3px; text-decoration: none; }',
        'li.treeview input[type="checkbox"] { display: none; }',
        'li.treeview input[type="checkbox"] + label:before { font-family: FontAwesome; }',
        'li.treeview input[type="checkbox"] + label:before { content: "\\f096"; }',
        'li.treeview input[type="checkbox"]:checked + label:before { content: "\\f046"; }',
        'li.treeview input[type="checkbox"] + label { display:inline-block; width:15px; height: 20px; margin: -1px 4px 0 0; vertical-align:middle; cursor: pointer; }',
        'li.treeview i.ac-collapse { width: 15px; cursor: pointer; display: inline-block; margin-left: -1.7em; }',
        'li.treeview i.ac-icon { width: 15px; cursor: pointer; display: inline-block }',
        'li.treeview .ac-node-disabled { color: silver; cursor: not-allowed; }']
})
export class AcTreeViewNode implements OnInit {
    /**
     * The object that controls the node's appearance.
     */
    @Input() node: AcTextTreeNode;
    /**
     * Fired on click and hence fired even if any of the other parts are being fired.
     */
    @Output() nodeClick: EventEmitter<AcTreeNode>;
    /**
     * Fired if a checkable field is being clicked.
     */
    @Output() checkChanged: EventEmitter<AcTreeNode>;
    /**
     * Fired if a selectable field is being clicked.
     */
    @Output() selectedChanged: EventEmitter<AcTreeNode>;
    /**
     * Fired if a node collapses or expands.
     */
    @Output() collapseChanged: EventEmitter<AcTreeNode>;
    
    private href: string;
    private collapseClasses: Array<string>;
    private iconClasses: Array<string>;
    private foreColor: string;
    private backColor: string;
    private isExpanded = false;
    private static pfxIcon = 'fa';
    private static opnIcon = 'fa-plus';
    private static clsIcon = 'fa-minus';

    constructor(private el: ElementRef, private renderer: Renderer) {
        this.nodeClick = new EventEmitter<AcTreeNode>();
        this.checkChanged = new EventEmitter<AcTreeNode>();
        this.selectedChanged = new EventEmitter<AcTreeNode>();
        this.collapseChanged = new EventEmitter<AcTreeNode>();
    }

    ngOnInit() {
        // set HTML according to options
        this.collapseClasses = new Array<string>();
        this.iconClasses = new Array<string>();
        // expander area with icon
        if (this.node) {
            // expect a font-awesome class with or without fa class
            if (this.node.options && this.node.options.icon) {
                if (this.node.options.icon.indexOf(`${AcTreeViewNode.pfxIcon} `) !== 0) {
                    this.iconClasses.push('fa');
                }
                this.iconClasses.push(this.node.options.icon);
            }
            if (this.node.options && this.node.options.href) {
                this.href = this.node.options.href;
            } else {
                this.href = '';
            }
            // open/close area for elements with children
            if (this.node.hasChildren) {
                this.collapseClasses.push('ac-icon'); // base class
                this.collapseClasses.push(AcTreeViewNode.pfxIcon);
                this.collapseClasses.push(AcTreeViewNode.opnIcon);
                // collapsed by default
                this.node.state &= ~AcTreeNodeState.checked;
            }
            if (this.node.options && this.node.options.color) {
                this.foreColor = this.node.options.color;
            }
            if (this.node.options && this.node.options.backColor) {
                this.backColor = this.node.options.backColor;
            }
            this.node.stateChange.subscribe((se: any) => {
                this.collapseChanged.emit(this.node);
                if (!this.node.stateIsExpandend) {
                    this.collapseClasses = this.collapseClasses.filter(s => s != AcTreeViewNode.clsIcon);
                    this.collapseClasses.push(AcTreeViewNode.opnIcon);
                } else {
                    this.collapseClasses = this.collapseClasses.filter(s => s != AcTreeViewNode.opnIcon);
                    this.collapseClasses.push(AcTreeViewNode.clsIcon);
                }
                this.isExpanded = this.node.stateIsExpandend;
            });
        }
    }

    // forward events in the node tree

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
        if (this.node.options.collapsable && this.node.hasChildren) {
            this.collapseChanged.emit(node);
        }
    }

    handleCheckChange(): void {
        if (this.node.options.checkable && !this.node.stateIsDisabled) {
            if (this.node.state & AcTreeNodeState.checked) {
                this.node.state &= ~AcTreeNodeState.checked;
            } else {
                this.node.state |= AcTreeNodeState.checked;
            }
            this.checkChanged.emit(this.node);
        }
    }

    handleClick($event: any): void {
        $event.stopPropagation();
        // always emit click
        this.nodeClick.emit(this.node);
    }

    handleCollapse(): void {
        // if collapsable handle icons and view state
        if (this.node.options.collapsable) {
            // toggle state
            if (this.node.state && (this.node.state & AcTreeNodeState.expanded)) {
                this.node.state &= ~AcTreeNodeState.expanded;
            } else {
                this.node.state |= AcTreeNodeState.expanded;
            }
        }
    }

    private preSelectState: boolean;

    handlePreSelection(state: boolean): void {
        // handle the states according to options
        if (this.node.options.selectable && !this.node.stateIsDisabled) {
            if (state) {
                if (this.node.options && this.node.options.color) {
                    this.foreColor = this.node.options.backColor;
                } else {
                    this.foreColor = '#fff';
                }
                if (this.node.options && this.node.options.backColor) {
                    this.backColor = this.node.options.color;
                } else {
                    this.backColor = '#000';
                }
            } else {
                if (this.node.options && this.node.options.color) {
                    this.foreColor = this.node.options.color;
                } else {
                    this.foreColor = '#000';
                }
                if (this.node.options && this.node.options.backColor) {
                    this.backColor = this.node.options.backColor;
                } else {
                    this.backColor = '#fff';
                }
            }
            this.preSelectState = state;
        }

    }

    handleSelection($event: any): void {
        // handle the states according to options
        if (this.node.options.selectable && !this.node.stateIsDisabled && this.preSelectState === true) {
            if (this.node.state & AcTreeNodeState.selected) {
                this.node.state &= ~AcTreeNodeState.selected;
            } else {
                this.node.state |= AcTreeNodeState.selected;
            }
            if (this.node.stateIsSelected) {
                if (this.node.options && this.node.options.color) {
                    this.foreColor = this.node.options.backColor;
                } else {
                    this.foreColor = '#fff';
                }
                if (this.node.options && this.node.options.backColor) {
                    this.backColor = this.node.options.color;
                } else {
                    this.backColor = '#000';
                }
            } else {
                if (this.node.options && this.node.options.color) {
                    this.foreColor = this.node.options.color;
                } else {
                    this.foreColor = '#000';
                }
                if (this.node.options && this.node.options.backColor) {
                    this.backColor = this.node.options.backColor;
                } else {
                    this.backColor = '#fff';
                }
            }
            this.selectedChanged.emit(this.node);
        }
        if (!this.href) {
            $event.preventDefault();
            $event.stopPropagation();
        }
    }

}
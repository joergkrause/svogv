﻿import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ElementRef,
  Renderer
} from '@angular/core';
import { TextTreeNode, TreeNode, TreeNodeState } from '../models';

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
  templateUrl: './treeview-node.component.html',
  styleUrls: ['./treeview-node.component.css']
})
export class AcTreeViewNodeComponent implements OnInit {

  constructor(private el: ElementRef, private renderer: Renderer) {
    this.nodeClick = new EventEmitter<TreeNode>();
    this.checkChanged = new EventEmitter<TreeNode>();
    this.selectedChanged = new EventEmitter<TreeNode>();
    this.collapseChanged = new EventEmitter<TreeNode>();
  }
  private static pfxIcon = 'fa';
  private static opnIcon = 'fa-plus';
  private static clsIcon = 'fa-minus';

  /**
   * The object that controls the node's appearance.
   */
  @Input()
  node: TextTreeNode;
  /**
   * Fired on click and hence fired even if any of the other parts are being fired.
   */
  @Output()
  nodeClick: EventEmitter<TreeNode>;
  /**
   * Fired if a checkable field is being clicked.
   */
  @Output()
  checkChanged: EventEmitter<TreeNode>;
  /**
   * Fired if a selectable field is being clicked.
   */
  @Output()
  selectedChanged: EventEmitter<TreeNode>;
  /**
   * Fired if a node collapses or expands.
   */
  @Output()
  collapseChanged: EventEmitter<TreeNode>;

  public href: string;
  public collapseClasses: Array<string>;
  public iconClasses: Array<string>;
  public foreColor: string;
  public backColor: string;
  public isExpanded = false;

  private preSelectState: boolean;

  ngOnInit() {
    // set HTML according to options
    this.collapseClasses = new Array<string>();
    this.iconClasses = new Array<string>();
    // expander area with icon
    if (this.node) {
      // expect a font-awesome class with or without fa class
      if (this.node.options && this.node.options.icon) {
        if (
          this.node.options.icon.indexOf(`${AcTreeViewNodeComponent.pfxIcon} `) !== 0
        ) {
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
        this.collapseClasses.push(AcTreeViewNodeComponent.pfxIcon);
        this.collapseClasses.push(AcTreeViewNodeComponent.opnIcon);
        // collapsed by default
        this.node.state &= ~TreeNodeState.checked;
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
          this.collapseClasses = this.collapseClasses.filter(
            s => s !== AcTreeViewNodeComponent.clsIcon
          );
          this.collapseClasses.push(AcTreeViewNodeComponent.opnIcon);
        } else {
          this.collapseClasses = this.collapseClasses.filter(
            s => s !== AcTreeViewNodeComponent.opnIcon
          );
          this.collapseClasses.push(AcTreeViewNodeComponent.clsIcon);
        }
        this.isExpanded = this.node.stateIsExpandend;
      });
    }
  }

  // forward events in the node tree

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
    if (this.node.options.collapsable && this.node.hasChildren) {
      this.collapseChanged.emit(node);
    }
  }

  handleCheckChange(): void {
    if (this.node.options.checkable && !this.node.stateIsDisabled) {
      if (this.node.state & TreeNodeState.checked) {
        this.node.state &= ~TreeNodeState.checked;
      } else {
        this.node.state |= TreeNodeState.checked;
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
      if (this.node.state && this.node.state & TreeNodeState.expanded) {
        this.node.state &= ~TreeNodeState.expanded;
      } else {
        this.node.state |= TreeNodeState.expanded;
      }
    }
  }

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
    if (
      this.node.options.selectable &&
      !this.node.stateIsDisabled &&
      this.preSelectState === true
    ) {
      if (this.node.state & TreeNodeState.selected) {
        this.node.state &= ~TreeNodeState.selected;
      } else {
        this.node.state |= TreeNodeState.selected;
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

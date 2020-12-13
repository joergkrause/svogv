import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * This component creates a complete editor from a viewmodel. The viewmodel should have
 * decorators to control the form's behavior. The form can be styled an supports validation.
 * It creates one field for each property not decorated with {@link Hidden}decorator.
 *
 * Example of usage:
 * <example-url>/#/editor</example-url>
 */
@Component({
  selector: 'ac-autoform',
  styles: [
    'fieldset { border-top: 1px silver solid; padding: 10px; }',
    'legend { width: auto; padding-left: 10px; padding-right: 10px; font-size: 1em;}'
  ],
  templateUrl: './autoform.component.html'
})
export class AutoFormComponent implements OnInit {
  /**
   * A reference to the form. Required.
   */
  @Input()
  public formGroup: FormGroup;
  /**
   * Ungrouped element will appear at the end, after all groupes.
   * If there are no groups this will be ignored. Optional.
   */
  @Input()
  public ungroupedAfter = true;

  public editors: { key: number; editor: string }[];
  public groups: {
    key: number;
    name: string;
    desc: string;
    editors: { key: number; editor: string }[];
  }[];

  constructor() {
    this.editors = new Array<{ key: number; editor: string }>();
    this.groups = new Array<{
      key: number;
      name: string;
      desc: string;
      editors: { key: number; editor: string }[];
    }>();
  }

  public ngOnInit() {
    // take all controls as is
    const hasDecorators: boolean = (this.formGroup as any).__editorModel__;
    // loop through all fields
    for (const controlName in this.formGroup.controls) {
      if (!this.formGroup.controls.hasOwnProperty(controlName)) {
        continue;
      }
      let displayOrder = 0;
      let groupOrder = 0;
      let groupName: string;
      let groupDesc: string;
      let isInGroup = false;
      if (hasDecorators) {
        displayOrder = ( this.formGroup as any).__editorModel__[
          `__displayOrder__${controlName}`
        ];
        isInGroup = !!( this.formGroup as any).__editorModel__[
          `__isGrouped__${controlName}`
        ];
        if (isInGroup) {
          groupName = ( this.formGroup as any).__editorModel__[
            `__groupName__${controlName}`
          ];
          groupOrder = ( this.formGroup as any).__editorModel__[
            `__groupOrder__${controlName}`
          ];
          groupDesc = ( this.formGroup as any).__editorModel__[
            `__groupDesc__${controlName}`
          ];
        }
      }
      if (!isInGroup) {
        // if not part of any group just push to main group
        this.editors.push({
          key: displayOrder,
          editor: controlName
        });
      } else {
        // check if group already exists
        const existingGroupArray = this.groups.filter((g) => g.name === groupName);
        const groupExists = existingGroupArray.length === 1;
        if (!groupExists) {
          this.groups.push({
            key: groupOrder,
            name: groupName,
            desc: groupDesc,
            editors: new Array<{ key: number; editor: string }>()
          });
        }
        // add field to existing group (assume that here the group always exists)
        const existingGroup = this.groups.filter((g) => g.name === groupName)[0];
        // and store
        existingGroup.editors.push({
          key: displayOrder,
          editor: controlName
        });
      }
    }
    // check the display decorator and sort
    this.editors.sort((e, n) => e.key - n.key);
    // sort groups
    this.groups.sort((e, n) => e.key - n.key);
  }

  public grouped(): boolean {
    return this.groups && this.groups.length > 0;
  }
}

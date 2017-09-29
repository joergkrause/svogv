import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * This component creates a complete editor out of a viewmodel.
 * It creates one field for each property not decorated with @Hidden.
 *
 */
@Component({
    moduleId: module.id,
    selector: 'ac-autoform',
    styles: [
        'fieldset { border-top: 1px silver solid; padding: 10px; }',
        'legend { width: auto; padding-left: 10px; padding-right: 10px; font-size: 1em;}'
    ],
    template: './ac-autoform.component.html'
})
export class AcAutoForm implements OnInit {

    /**
     * A reference to the form. Required.
     */
    @Input()
    formGroup: FormGroup;
    /**
     * Ungrouped element will appear at the end, after all groupes.
     * If there are no groups this will be ignored. Optional.
     */
    @Input()
    ungroupedAfter = true;

    editors: Array<{ key: number, editor: string }>;
    groups: Array<{ key: number, name: string, desc: string, editors: Array<{ key: number, editor: string }> }>;

    constructor() {
        this.editors = new Array<{ key: number, editor: string }>();
        this.groups = new Array<{ key: number, name: string, desc: string, editors: Array<{ key: number, editor: string }> }>();
    }

    ngOnInit() {
        // take all controls as is
        var hasDecorators: boolean = ((<any>this.formGroup)['__editorModel__']);
        // loop through all fields
        for (var controlName in this.formGroup.controls) {
            let displayOrder = 0;
            let groupOrder = 0;
            let groupName: string;
            let groupDesc: string;
            let isInGroup = false;
            if (hasDecorators) {
                displayOrder = (<any>this.formGroup)['__editorModel__'][`__displayOrder__${controlName}`];
                isInGroup = !!(<any>this.formGroup)['__editorModel__'][`__isGrouped__${controlName}`];
                if (isInGroup) {
                    groupName = (<any>this.formGroup)['__editorModel__'][`__groupName__${controlName}`];
                    groupOrder = (<any>this.formGroup)['__editorModel__'][`__groupOrder__${controlName}`];
                    groupDesc = (<any>this.formGroup)['__editorModel__'][`__groupDesc__${controlName}`];
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
                let existingGroupArray = this.groups.filter(g => g.name === groupName);
                var groupExists = existingGroupArray.length === 1;
                if (!groupExists) {
                    this.groups.push({
                        key: groupOrder,
                        name: groupName,
                        desc: groupDesc,
                        editors: new Array<{ key: number, editor: string }>()
                    });
                }
                // add field to existing group (assume that here the group always exists)
                let existingGroup = this.groups.filter(g => g.name === groupName)[0];
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


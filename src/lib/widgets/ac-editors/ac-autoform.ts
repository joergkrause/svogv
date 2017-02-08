import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AcEditor } from './ac-editor';

/**
 * This component creates a complete editor out of a viewmodel.
 * It creates one field for each property not decorated with @Hidden.
 * 
 */
@Component({
    selector: 'ac-autoform',
    template: `<ng-content></ng-content>
               <ng-container *ngIf="!grouped()">
                   <ac-editor *ngFor="let editorName of editors" [name]="editorName" [userForm]="formGroup"></ac-editor>
               </ng-container>
               <ng-container *ngIf="grouped()">
                <fieldset *ngFor="let group of groups">
                    <legend [attr.title]="group.desc" *ngIf="group.name">{{ group.name }}</legend>
                    <ac-editor *ngFor="let editorName of group.editors" [name]="editorName" [userForm]="formGroup"></ac-editor>
                </fieldset>                 
               </ng-container>
              `
})
export class AcAutoForm implements OnInit {

    @Input()
    formGroup: FormGroup;

    editors: Array<{ key: number, editor: string }>;
    groups: Array<{ key:number, name: string, desc: string, editors: Array<{ key: number, editor: string }> }>;

    constructor() {
        this.editors = new Array<{ key: number, editor: string }>();
        this.groups = new Array<{ key:number, name: string, desc: string, editors: Array<{ key: number, editor: string }> }>();
    }

    ngOnInit() {
        // take all controls as is
        var hasDecorators: boolean = ((<any>this.formGroup)['__editorModel__']);
        // loop through all fields
        for (var controlName in this.formGroup.controls) {
            let displayOrder: number = 0;
            let groupOrder: number = 0;
            let groupName: string;
            let groupDesc: string;
            let isInGroup: boolean = false;
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


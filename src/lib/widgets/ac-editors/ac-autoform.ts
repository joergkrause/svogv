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
               <ac-editor *ngIf="!grouped" *ngFor="let editorName of editors" [name]="editorName" [userForm]="formGroup"></ac-editor>
               <fieldset *ngIf="grouped" *ngFor="let group in groups">
                 <legend>{{ group.desc }}</legend>
                   <ac-editor *ngFor="let editorName of group.editors" [name]="editorName" [userForm]="formGroup"></ac-editor>
               </fieldset>                 
              `
})
export class AcAutoForm implements OnInit {

    @Input()
    formGroup: FormGroup;

    editors: Array<{ key: number, editor: string }>;
    groups: Array<{ desc: string, editors: Array<{ key: number, editor: string }>};
    grouped: boolean;

    constructor() {
        this.editors = Array<{ key: number, editor: string }>();
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
            let notInGroup: boolean = true;
            if (hasDecorators) {
                displayOrder = (<any>this.formGroup)['__editorModel__'][`__displayOrder__${controlName}`];
                groupName = (<any>this.formGroup)['__editorModel__'][`__groupName__${controlName}`];
                groupOrder = (<any>this.formGroup)['__editorModel__'][`__groupOrder__${controlName}`];
                groupDesc = (<any>this.formGroup)['__editorModel__'][`__groupDesc__${controlName}`];
                notInGroup = (<any>this.formGroup)['__editorModel__'][`__grouped__${controlName}`];
            }
            if (notInGroup){
            // if not part of any group just push to main group
            this.editors.push({
                key: displayOrder,
                editor: controlName
            });
            }
        }
        // check the display decorator and sort
        this.editors.sort((e, n) => e.key - n.key);
    }
}


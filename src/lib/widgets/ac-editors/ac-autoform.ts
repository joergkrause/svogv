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
               <ac-editor *ngFor="let editorName of editors" [name]="editorName" [userForm]="formGroup"></ac-editor>
              `
})
export class AcAutoForm implements OnInit {

    @Input()
    formGroup: FormGroup;

    editors: Array<{ key: number, editor: string }>;

    constructor() {
        this.editors = Array<{ key: number, editor: string }>();
    }

    ngOnInit() {
        // take all controls as is
        var hasDecorators: boolean = ((<any>this.formGroup)['__editorModel__']);
        for (var controlName in this.formGroup.controls) {
            let displayOrder: number = 0;
            if (hasDecorators) {
                displayOrder = (<any>this.formGroup)['__editorModel__'][`__displayOrder__${controlName}`];
            }
            this.editors.push({
                key: displayOrder,
                editor: controlName
            });
        }
        // check the display decorator and sort
        this.editors.sort((e, n) => e.key - n.key);
    }
}


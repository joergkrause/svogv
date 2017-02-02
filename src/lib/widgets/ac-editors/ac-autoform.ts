import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AcEditor } from './ac-editor';

/**
 * Use this directive to propagate the form's FormGroup to all auto editors.
 * 
 * Instead of writing <ac-editor [userForm]="formGroupName"> you can now just say
 * <form autoform> and all editors get the form reference. The FormGroup just be
 * forwarded to hook the validators to the appropriate elements.  
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

    editors: Array<string>

    constructor() {
        this.editors = new Array<string>();
    }

    ngOnInit() {
        for(var controlName in this.formGroup.controls){
            this.editors.push(controlName);
        }
    }


}

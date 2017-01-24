import { Directive, ElementRef, Host, HostBinding, HostListener, ContentChildren, QueryList } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AcEditor } from '../ac-editor';

/**
 * Use this directive to propagate the form's FormGroup to all auto editors.
 * 
 * Instead of writing <ac-editor [userForm]="formGroupName"> you can now just say
 * <form autoform> and all editors get the form reference. The FormGroup just be
 * forwarded to hook the validators to the appropriate elements.  
 */
@Directive({ selector: '[autoform]' })
export class AutoForm {

    @ContentChildren('ac-editor', { descendants: false })
    editorList: QueryList<AcEditor>;

    userForm: FormGroup;

    constructor(public el: ElementRef) {
        if (el.nativeElement.tagName.toLowerString() !== "form"){
            throw { error: "This directive must appear on a form tag." }
        }
        this.userForm = (<any>el)["formGroup"];
    }

   ngAfterContentChecked() {
        this.editorList.forEach(editor => editor.userForm = this.userForm);
    }

}

import { Component, Input, Output, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * The Editor Widget. Creates a field with all required validators using decorators and forms service.
 */
@Component({
  selector: 'ac-editor',
  styles: [
    'input[type="checkbox"] { display: none; }',
    'input[type="checkbox"] + label:before { font-family: FontAwesome; }',
    'input[type="checkbox"] + label:before { content: "\\f096"; }',
    'input[type="checkbox"]:checked + label:before { content: "\\f046"; }',
    `input[type="checkbox"] + label {
      display:inline-block; width:15px; height: 20px; margin: -1px 4px 0 0; vertical-align:middle; cursor: pointer;
    }`,
  ],
  templateUrl: './ac-editor.component.html'
}) //
export class AcEditor implements OnInit {

  /**
   * Field name
   */
  @Input() name: string;
  /**
   * Editor type. Default is 'text';
   */
  @Input() type = 'text';
  /**
   * A character after the fields label. Default is ': ' (colon plus space);
   */
  @Input() labelDivider = ': ';
  /**
   * The label's name.
   */
  @Input() label: string;
  /**
   * A tooltip
   */
  @Input() tooltip: string;
  /**
   * Name of the form's group object.
   */
  @Input() userForm: FormGroup;
  /**
   * If set to true the label and the field appears in one row.
   * Otherwise the label is above the field. Default is `true`.
   */
  @Input() inline = true;
  /**
   * The values of the select field provided by an enum. For other fieldtypes it's being ignored.
   */
  @Input() enumValues: any;
  /**
   * The values of the select field provided by a list. For other fieldtypes it's being ignored.
   * The value shall be an Array that a `*ngFor` directive can execute.
   */
  @Input() listValues: Array<any>;
  /**
   * The start value for a range field. Other field types ignore this value.
   */
  @Input() fromValue = 0;
  /**
   * The end value for a range field. Other field types ignore this value.
   */
  @Input() toValue = 100;
  /**
   * An optional placeholder for empty field. The default is empty (no watermark).
   */
  @Input() waterMark = '';
  /**
   * Renders the field as read only.
   */
  @Input() readonly = false;
  /**
   * The value set to and read from the field.
   */
  @Output()
  @Input()
  value: any;

  // additional values provided by TemplateHint decorator
  params: { key: string, value: any }[];

  errors: Array<string>;

  constructor() {
    this.params = new Array<{ key: string, value: any }>();
  }

  getParams(key: string): any {
    return this.first(this.params.filter((e) => e.key === key), 0);
  }

  first(array: Array<{ key: string, value: any }>, n: number): any {
    if (array == null) {
      return void 0;
    }
    if (n == null) {
      return array[0];
    }
    if (n < 0) {
      return [];
    }
    return array.slice(0, n);
  }

  ngOnInit() {
    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    // this is set by FormValidatorService
    const editorModel = (<any>this.userForm)['__editorModel__'];
    // get type from form
    if (editorModel) {
      // get elementary types, this might get overwritten later according to decorators found
      if (typeof editorModel[this.name] === 'string') {
        this.type = 'text';
      }
      if (typeof editorModel[this.name] === 'boolean') {
        this.type = 'boolean';
      }
      if (typeof editorModel[this.name] === 'number') {
        this.type = 'number';
      }
      if (editorModel[this.name] instanceof Date){
        this.type = 'calendar';
      }
      // make an instance to read the properties
      this.label = editorModel[`__displayName__${this.name}`] || this.label || this.name;
      this.tooltip = editorModel[`__displayDesc__${this.name}`] || this.tooltip || this.name;
      // render as range id there is a range definition
      if (editorModel[`__hasRangeFrom__${this.name}`] && Number(editorModel[`__hasRangeFrom__${this.name}`])) {
        this.fromValue = <number>editorModel[`__hasRangeFrom__${this.name}`];
        this.type = 'range';
      }
      if (editorModel[`__hasRangeTo__${this.name}`] && Number(editorModel[`__hasRangeTo__${this.name}`])) {
        this.toValue = <number>editorModel[`__hasRangeTo__${this.name}`];
        this.type = 'range';
      }
      // placeholder
      if (editorModel[`__hasWatermark__${this.name}`]) {
        this.waterMark = editorModel[`__watermark__${this.name}`];
      }
      // templates
      if (editorModel[`__hasTemplateHint__${this.name}`]) {
        this.type = (<string>editorModel[`__templateHint__${this.name}`]).toLowerCase();
        if (editorModel[`__templateHintParams__${this.name}`]) {
          this.params = (<{ key: string, value: any }[]>editorModel[`__templateHintParams__${this.name}`]);
        }
      }

      // render hidden fields as hidden even in forms
      if (editorModel[`__isHidden__${this.name}`]) {
        this.type = 'hidden';
      }
      // check readonly
      if (editorModel[`__isReadonly__${this.name}`]) {
        this.readonly = !!editorModel[`__isReadonly__${this.name}`];
      }
    }
  }

  private onValueChanged(data: any) {
    // check validation on change
    this.errors = new Array<string>();
    // tslint:disable-next-line:forin
    for (const error in this.userForm.controls[this.name].errors) {
      this.errors.push(error);
    }
  }

}


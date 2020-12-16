import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Input, Output, OnInit, ViewChild, NgZone } from '@angular/core';
import {take} from 'rxjs/operators';
import { EditorModel } from './models/editor.model';

/**
 * The Editor Widget. Creates a field with all required validators using decorators and forms service.
 */
@Component({
  selector: 'ac-editor',
  styleUrls: ['./editor.component.scss'],
  templateUrl: './editor.component.html'
}) //
export class EditorComponent implements OnInit {

  @Input() model: EditorModel;

  @ViewChild('autosize') autosize: CdkTextareaAutosize;


  @Input() name: string;

  /**
   * The value set to and read from the field.
   */
  @Output()
  @Input()
  public value: any;

  // additional values provided by TemplateHint decorator
  public params: { key: string; value: any }[];

  public errors: string[];

  constructor(private _ngZone: NgZone) {
    this.params = new Array<{ key: string; value: any }>();
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  public getParams(key: string): any {
    return this.first(this.params.filter((e) => e.key === key), 0);
  }

  public first(array: { key: string; value: any }[], n: number): any {
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

  public ngOnInit() {
    this.model.formGroup.valueChanges.subscribe((data) => this.onValueChanged(data));
    // this is set by FormValidatorService
    const editorModel = (this.model.formGroup as any).__editorModel__;
    // get type from form
    if (editorModel) {
      // get elementary types, this might get overwritten later according to decorators found
      if (typeof editorModel[this.model.name] === 'string') {
        this.model.type = 'text';
      }
      if (typeof editorModel[this.model.name] === 'boolean') {
        this.model.type = 'boolean';
      }
      if (typeof editorModel[this.model.name] === 'number') {
        this.model.type = 'number';
      }
      if (editorModel[this.model.name] instanceof Date) {
        this.model.type = 'calendar';
      }
      // make an instance to read the properties
      this.model.label = editorModel[`__displayName__${this.model.name}`] || this.model.label || this.model.name;
      this.model.tooltip = editorModel[`__displayDesc__${this.model.name}`] || this.model.tooltip || this.model.name;
      // render as range id there is a range definition
      if (editorModel[`__hasRangeFrom__${this.model.name}`] && Number(editorModel[`__hasRangeFrom__${this.model.name}`])) {
        this.model.fromValue = editorModel[`__hasRangeFrom__${this.model.name}`] as number;
        this.model.type = 'range';
      }
      if (editorModel[`__hasRangeTo__${this.model.name}`] && Number(editorModel[`__hasRangeTo__${this.model.name}`])) {
        this.model.toValue = editorModel[`__hasRangeTo__${this.model.name}`] as number;
        this.model.type = 'range';
      }
      // placeholder
      if (editorModel[`__hasWatermark__${this.model.name}`]) {
        this.model.waterMark = editorModel[`__watermark__${this.model.name}`];
      }
      // templates
      if (editorModel[`__hasTemplateHint__${this.model.name}`]) {
        this.model.type = (editorModel[`__templatehint__${this.model.name}`] as string).toLowerCase();
        if (editorModel[`__templatehintParams__${this.model.name}`]) {
          this.params = editorModel[`__templatehintParams__${this.model.name}`] as { key: string; value: any }[];
        }
      }

      // render hidden fields as hidden even in forms
      if (editorModel[`__isHidden__${this.model.name}`]) {
        this.model.type = 'hidden';
      }
      // check readonly
      if (editorModel[`__isReadonly__${this.model.name}`]) {
        this.model.readonly = !!editorModel[`__isReadonly__${this.model.name}`];
      }
    }
  }

  private onValueChanged(data: any) {
    // check validation on change
    this.errors = new Array<string>();
    // tslint:disable-next-line:forin
    for (const error in this.model.formGroup.controls[this.model.name].errors) {
      this.errors.push(error);
    }
  }
}

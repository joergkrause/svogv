import { FormGroup } from "@angular/forms";

export class EditorModel {
    /**
   * Field name
   */
  public name: string;
  /**
   * Editor type. Default is 'text';
   */
  public type = 'text';
  /**
   * A character after the fields label. Default is ': ' (colon plus space);
   */
  public labelDivider = ': ';
  /**
   * The label's name.
   */
  public label: string;
  /**
   * A tooltip
   */
  public tooltip: string;
  /**
   * The form's group object.
   */
  public formGroup: FormGroup;
  /**
   * If set to true the label and the field appears in one row.
   * Otherwise the label is above the field. Default is `true`.
   */
  public inline = true;
  /**
   * The values of the select field provided by an enum. For other fieldtypes it's being ignored.
   */
  public enumValues: any;
  /**
   * The values of the select field provided by a list. For other fieldtypes it's being ignored.
   * The value shall be an Array that a `*ngFor` directive can execute.
   */
  public listValues: any[];
  /**
   * The start value for a range field. Other field types ignore this value.
   */
  public fromValue = 0;
  /**
   * The end value for a range field. Other field types ignore this value.
   */
  public toValue = 100;
  /**
   * An optional placeholder for empty field. The default is empty (no watermark).
   */
  public waterMark = '';
  /**
   * Renders the field as read only.
   */
  public readonly = false;
}

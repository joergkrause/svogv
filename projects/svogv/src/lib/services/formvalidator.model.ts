/**
 * This elements describes the grouping of elements in fieldset-controls. Each 
 * field that is decorated in an DisplayGroup with the very same name is grouped
 * into that part. The name appears in the fieldsets legend-control. The 
 * description makes a tooltip. If there are more groups the order is controlled
 * by the @see order element.
 */
export type displayGroupType = {
  'displaygroup': {
    'name': string;
    'order'?: number;
    'description'?: string
  }
};

/**
 * This element describes the UI elements label, tooltip, and order.
 */
export type displayType = {
  'display': {
    'name': string;
    'order'?: number;
    'description'?: string
  }
};

/**
 * A pipe driven formatting instruction.
 */
export type formatType = {
  'format': {
    'pipeName': any;
    'pipeParams'?: any[]
  }
};
/**
 * The field will not appear in autoforms if decorated as hidden. If the parameter
 * is omitted the type returns true due to its pure existence. 
 */
export type hiddenType = {
  'hidden'?: boolean
};
/**
 * A watermark can be applied. The @see name property is the value that appears
 * in the field. This may not work for specific controls, such as list boxes.
 */
export type placeHolderType = {
  'placeholder': {
    'name': string;
  }
}
/**
 * The field in rendered as readonly, if possible.
 */
export type readonlyType = {
  'readonly': boolean
};
/**
 * This controls the actual control type. The default values are (TypeScript type: decorator type: rendered element):
 * 
 * * string: text: &lt;input type="text"&gt;
 * * date: calendar: &lt;input type="date"&gt;
 * * boolean: boolean: &lt;input type="checkbox"&gt;
 * * number: number: &lt;input type="number"&gt;
 * 
 * This is the formatting that's autoamtically applied. The template hint goes after and can change any of these values. 
 * The allows values are:
 * 
 * * any: textarea: &lt;textarea&gt;
 * * array: enum:  &lt;select&gt;
 * * array: list: &lt;select&gt;
 * * any: template: The content of the editor element (does not work with &lt;ac-autoform&gt;)
 * 
 */
export type templateHintType = {
  'templatehint': {
    hint: string;
  }
};

/**
 * Base type for validators.
 * 
 * Give a private error message in @param msg. If omitted a error message will be generated.
 * Set to active by using @param active. Default is true.
 * Active i18n by using the @param translate. The translation module must be used separately.
 */
export type validatorType = {
  'msg'?: string;
  'active'?: boolean;
  'translate'?: boolean;
}
/**
 * Compare to fields.
 */
export type compareType = {
  'compare': {
    'fieldToCompare': string
  } | validatorType;
};
/**
 * Email
 */
export type emailType = {
  'email': validatorType;
};
/**
 * Maximum allowed length (string only)
 */
export type maxlengthType = {
  'maxlength': {
    max: number;
  } | validatorType;
};
/**
 * Minimum allowed length (string only)
 */
export type minlengthType = {
  'minlength': {
    min: number
  } | validatorType;
};
/**
 * Any regex pattern
 */
export type patternType = {
  'pattern': {
    pattern: string | RegExp;
  } | validatorType;
};
/**
 * A range for number or Date only.
 */
export type rangeType = {
  'range': {
    'from': number | Date;
    'to': number | Date;
  } | validatorType;
};
/**
 * This field is mandatory.
 */
export type requiredType = {
  'required': validatorType;
};
/**
 * Maximal and minimal allowed length (string only).
 */
export type stringLengthType = {
  'stringlength': {
    'min': number;
    'max': number;
  } | validatorType;
};


/**
 * The form description model. Use this to have a valid JSON object that can be used
 * instead of the decorators. Each type represents a single decorator. The basic
 * structure looks like this:
 * 
 * @example {
 *            "fieldName": {
 *               "display": {
 *                  "name": "The field's human readible name"
 *               }
 *            }
 *          }
 * 
 * See the different type's descriptions for detailled information.
 * 
 */
export interface FormValidatorModel {
  [field: string]: displayType | displayGroupType | formatType | hiddenType | placeHolderType | compareType | maxlengthType | minlengthType | patternType | stringLengthType | emailType | requiredType;
}




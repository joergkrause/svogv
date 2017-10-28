export type displayType = {
  'display': {
    'name': string;
    'order'?: number;
    'description'?: string
  }
};

export type displayGroupType = {
  'displaygroup': {
    'name': string;
    'order'?: number;
    'description'?: string
  }
};

export type formatType = {
  'format': {
    'pipeName': any;
    'pipeParams'?: any[]
  }
};

export type hiddenType = {
  'hidden'?: boolean
};

export type placeHolderType = {
  'placeholder': {
    'name': string;
  }
}
export type readonlyType = {
  'readonly': boolean
};
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
export type compareType = {
  'compare': {
    'fieldToCompare': string
  } | validatorType;
};
export type emailType = {
  'email': validatorType;
};
export type maxlengthType = {
  'maxlength': {
    max: number;
  } | validatorType;
};
export type minlengthType = {
  'minlength': {
    min: number
  } | validatorType;
};
export type patternType = {
  'pattern': {
    pattern: string | RegExp;
  } | validatorType;
};
export type rangeType = {
  'range': {
    'from': number | Date;
    'to': number | Date;
  } | validatorType;
};
export type requiredType = {
  'required': validatorType;
};
export type stringLengthType = {
  'stringlength': {
    'min': number;
    'max': number;
  } | validatorType;
};


export interface FormValidatorModel {
  [field: string]: displayType | displayGroupType | formatType | hiddenType | placeHolderType | compareType | maxlengthType | minlengthType | patternType | stringLengthType | emailType | requiredType;
}




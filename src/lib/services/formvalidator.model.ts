type displayType = {
  'display': {
    "name": string;
    "order"?: number;
    "description"?: string
  }
};

type displayGroupType = {
  'displaygroup': {
    "name": string;
    "order"?: number;
    "description"?: string
  }
};

type formatType = {
  "format": {
    "pipeName": any;
    "pipeParams"?: any[]
  }
};

type hiddenType = {
  "hidden": boolean
};

type placHolderType = {
  "placeholder": {
    'name': string;
  }
}
type readonlyType = {
  "readonly": boolean
};
type templateHintType = {
  "templatehint": {
    hint: string;
  }
};
type validatorType = {
  "msg": string;
  'active': boolean;
}
type compareType = {
  "compare": {
    "fieldToCompare": string
  } | validatorType;
};
type emailType = {
  "email": validatorType;
};
type maxlengthType = {
  "maxlength": {
    max: number;
  } | validatorType;
};
type minlengthType = {
  "minlength": {
    min: number
  } | validatorType;
};
type patternType = {
  "pattern": {
    pattern: string | RegExp;
  } | validatorType;
};
type rangeType = {
  "range": {
    'from': number | Date;
    'to': number | Date;
  } | validatorType;
};
type requiredType = {
  "required": validatorType;
};
type stringLengthType = {
  "stringlength": {
    'min': number;
    'max'?: number;
  } | validatorType;
};


export interface FormValidatorModel {
  [field: string]: displayType | displayGroupType | formatType | hiddenType | placHolderType | compareType | maxlengthType | minlengthType | patternType | stringLengthType | emailType | requiredType;
}

let f: FormValidatorModel = {
  'fieldname': {
    display: {
      name: "Hallo"
    },
    displaygroup: {
      name: "Group"
    }
  },
  'id': {
    hidden: true
  },
  'ccc': {
    compare: {
      msg: '',
      fieldToCompare: 'fieldname'
    }
  },
  'test': {
    required: {
      active: true,
      msg: 'message',
    }
  }
}


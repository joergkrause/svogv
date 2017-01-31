import { Meaning, Actions } from './enum-colors';

export var EnumConverter = <T>(value: number, enumerationType: T) : string => {
    let sanitizedValue = value.toString(); 
    let color: T = <T>((<any>enumerationType)[sanitizedValue]);
    return color.toString();
};

export var StringConverter = (value: any) => {
    if (value === null || value === undefined || typeof value === 'string')
    {
        return value;
    }
    return value.toString();
};

export var BooleanConverter = (value: any) => {
    if (value === null || value === undefined || typeof value === 'boolean')
    {
        return value;
    }
    return value.toString() === 'true';
};

export var NumberConverter = (value: any) => {
    if (value === null || value === undefined || typeof value === 'number')
    {
        return value;
    }
    return parseFloat(value.toString());
};

export function InputConverter(converter?: (value: any, enumerationType?: any) => any, enumerationType?: any) {
    return (target: Object, key: string) => {
        if (converter === undefined) {
            var metadata = (<any>Reflect).getMetadata('design:type', target, key);
            if (metadata === undefined || metadata === null)
                throw new Error('The reflection metadata could not be found.');
            switch (metadata.name) {
                case 'String':
                    converter = StringConverter;
                    break;
                case 'Boolean':
                    converter = BooleanConverter;
                    break;
                case 'Number':
                    converter = NumberConverter;
                    break;
                default:
                    throw new Error('There is no converter for the given property type \'' + metadata.name + '\'.');
            }
        }

        var definition = Object.getOwnPropertyDescriptor(target, key);
        if (definition) {
            Object.defineProperty(target, key, {
                get: definition.get,
                set: newValue => {
                    if (enumerationType) {
                        definition.set(converter(newValue, enumerationType));
                    } else {
                        definition.set(converter(newValue));
                    }
                },
                enumerable: true,
                configurable: true
            });
        } else {
            // create a helper to access the converter
            Object.defineProperty(target, key, {
                get: function () {
                    return this['__' + key];
                },
                set: function (newValue) {
                    this['__' + key] = enumerationType === undefined ? converter(newValue) : converter(newValue, enumerationType);
                },
                enumerable: false,
                configurable: true
            });
        }
    };
}
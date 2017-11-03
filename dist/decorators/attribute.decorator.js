"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var date_fns_1 = require("date-fns");
function Attribute(serializedName) {
    return function (target, propertyName) {
        var converter = function (dataType, value, forSerialisation) {
            if (forSerialisation === void 0) { forSerialisation = false; }
            if (!forSerialisation) {
                if (dataType === Date) {
                    return date_fns_1.parse(value);
                }
            }
            else {
                if (dataType === Date) {
                    return date_fns_1.format(value, 'YYYY-MM-DDTHH:mm:ss[Z]');
                }
            }
            return value;
        };
        var saveAnnotations = function (hasDirtyAttributes, oldValue, newValue, isNew) {
            var annotations = Reflect.getMetadata('Attribute', target) || {};
            var targetType = Reflect.getMetadata('design:type', target, propertyName);
            var mappingMetadata = Reflect.getMetadata('AttributeMapping', target) || {};
            var serializedPropertyName = serializedName !== undefined ? serializedName : propertyName;
            mappingMetadata[serializedPropertyName] = propertyName;
            Reflect.defineMetadata('AttributeMapping', mappingMetadata, target);
            var propertyHasDirtyAttributes = typeof oldValue === 'undefined' && !isNew ? false : hasDirtyAttributes;
            annotations[propertyName] = {
                newValue: newValue,
                oldValue: oldValue,
                serializedName: serializedName,
                hasDirtyAttributes: propertyHasDirtyAttributes,
                serialisationValue: converter(targetType, newValue, true)
            };
            Reflect.defineMetadata('Attribute', annotations, target);
        };
        var getter = function () {
            return this['_' + propertyName];
        };
        var setter = function (newVal) {
            var targetType = Reflect.getMetadata('design:type', target, propertyName);
            var convertedValue = converter(targetType, newVal);
            if (convertedValue !== this['_' + propertyName]) {
                saveAnnotations(true, this['_' + propertyName], newVal, !this.id);
                this['_' + propertyName] = convertedValue;
            }
        };
        if (delete target[propertyName]) {
            saveAnnotations(false, undefined, target[propertyName], target.id);
            Object.defineProperty(target, propertyName, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true
            });
        }
    };
}
exports.Attribute = Attribute;
//# sourceMappingURL=attribute.decorator.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsMatch = void 0;
const class_validator_1 = require("class-validator");
function IsMatch(property, validationOptions) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            name: 'IsMatch',
            target: object.constructor,
            propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = args.object[relatedPropertyName];
                    return value === relatedValue;
                },
                defaultMessage(args) {
                    const [relatedPropertyName] = args.constraints;
                    return `${propertyName} must match ${relatedPropertyName} exactly`;
                },
            },
        });
    };
}
exports.IsMatch = IsMatch;
//# sourceMappingURL=match.decorator.js.map
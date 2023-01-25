import { ValidationError } from "../../errors/validation-error";
import ValidatorRules from "../validator-rules";

type Values = {
    value: any;
    property: string
}

type ExpectedRule = {
    value: any;
    property: string
    rule: keyof ValidatorRules
    error: ValidationError
    params?: any
}

function assertIsInvalid({ value, property, rule, error, params }: ExpectedRule) {
    expect(() => {
        ValidatorRules.values(value, property)[rule](params)
    }).toThrow(error)
}

function assertIsValid({ value, property, rule, error, params }: ExpectedRule) {
    expect(() => {
        ValidatorRules.values(value, property)[rule](params)
    }).not.toThrow(error)
}

describe('ValidatorRules Unit Tests', () => {
    test('values method', () => {
        const validator = ValidatorRules.values('some value', 'field')
        expect(validator).toBeInstanceOf(ValidatorRules)
        expect(validator['value']).toBe('some value')
        expect(validator['property']).toBe('field')
    });

    test('require validation rule', () => {

        let arrange: Values[] = [
            { value: null, property: 'field' },
            { value: undefined, property: 'field' },
            { value: "", property: 'field' }
        ]

        const error = new ValidationError('The field is required')
        arrange.forEach(item => {
            assertIsInvalid({
                value: item.value,
                property: item.property,
                rule: 'required',
                error: error
            })
        });

        arrange = [
            { value: 'test', property: 'field' },
            { value: 5, property: 'field' },
            { value: 0, property: 'field' },
            { value: false, property: 'field' }
        ]

        arrange.forEach(item => {
            assertIsValid({
                value: item.value,
                property: item.property,
                rule: 'required',
                error: error
            })
        });
    });

    test('string validation rule', () => {
        let arrange: Values[] = [
            { value: 4, property: 'field' },
            { value: {}, property: 'field' },
            { value: false, property: 'field' }
        ]
        const error = new ValidationError('The field must be a string')
        arrange.forEach(item => {
            assertIsInvalid({
                value: item.value,
                property: item.property,
                rule: 'string',
                error: error
            })
        });

        arrange = [
            { value: null, property: 'field' },
            { value: undefined, property: 'field' },
            { value: 'test', property: 'field' }
        ]

        arrange.forEach(item => {
            assertIsValid({
                value: item.value,
                property: item.property,
                rule: 'string',
                error: error
            })
        });
    });

    test('maxLength validation rule', () => {
        let arrange: Values[] = [
            { value: 'aaaaaa', property: 'field' }
        ]
        const error = new ValidationError('The field must be less or equal than 5 characters')

        arrange.forEach(item => {
            assertIsInvalid({
                value: item.value,
                property: item.property,
                rule: 'maxLength',
                error: error,
                params: 5
            })
        });

        arrange = [
            { value: null, property: 'field' },
            { value: undefined, property: 'field' },
            { value: 'aaaaa', property: 'field' }
        ]

        arrange.forEach(item => {
            assertIsValid({
                value: item.value,
                property: item.property,
                rule: 'maxLength',
                error: error,
                params: 5
            })
        });
    });

    it("should throw a validation error when combine two or more validation rules", () => {
        let validator = ValidatorRules.values(null, "field");
        expect(() => {
            validator.required().string().maxLength(5);
        }).toThrow(new ValidationError("The field is required"));

        validator = ValidatorRules.values(5, "field");
        expect(() => {
            validator.required().string().maxLength(5);
        }).toThrow(new ValidationError("The field must be a string"));

        validator = ValidatorRules.values("aaaaaa", "field");
        expect(() => {
            validator.required().string().maxLength(5);
        }).toThrow(
            new ValidationError("The field must be less or equal than 5 characters")
        );
    });

    it("should valid when combine two or more validation rules", () => {
        expect.assertions(0);
        ValidatorRules.values("test", "field").required().string();
        ValidatorRules.values("aaaaa", "field").required().string().maxLength(5);
    });
});
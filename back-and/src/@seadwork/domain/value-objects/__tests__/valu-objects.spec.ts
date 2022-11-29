import ValueObject from "../value-objects";

class StubValueObject extends ValueObject{}

describe('ValueObject unit test', () => {
    
    it('should set value ', () => {
        let vo = new StubValueObject('string value')
        expect(vo.value).toBe('string value');

        vo = new StubValueObject({prop1: "value1"})
        expect(vo.value).toStrictEqual({prop1: "value1"});
    });
});


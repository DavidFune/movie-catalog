export default abstract class ValueObject<Value = any>{
    protected readonly _value: Value;
    constructor(value: Value){
        this._value = Object.freeze(value)
    }

    get value(): Value {
        return this._value
    }
}
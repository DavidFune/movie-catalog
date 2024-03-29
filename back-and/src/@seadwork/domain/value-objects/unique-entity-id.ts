import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import InvalidUuidError from "../errors/invalid-uuid.error";
import ValueObject from "./value-objects";
export default class UniqueEntityId extends ValueObject<string>{

    constructor(readonly id?: string){
        super(id || uuidv4());
        this.validate();
    }

    private validate() {
        const isValid: boolean = uuidValidate(this.value);
        if(!isValid){
            throw new InvalidUuidError();
        }
    }
} 
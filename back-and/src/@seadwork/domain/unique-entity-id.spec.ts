import InvalidUuidError from "../errors/invalid-uuid.error";
import UniqueEntityId from "./unique-entity-id";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";

function spyValidadeMethod() {
  return jest.spyOn(UniqueEntityId.prototype as any, 'validade')
}

describe('UniqueEntityId Unit Tests', () => {

    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");

    it('should throw error when uuid is invalid', () => {
        expect(() => new UniqueEntityId('fake id')).toThrow(new InvalidUuidError())
        expect(validateSpy).toHaveBeenCalled()
    });

    it("should accept a uuid passed in constructor", () => {
        const uuid = "9366b7dc-2d71-4799-b91c-c64adb205104";
        const vo = new UniqueEntityId(uuid);
        expect(vo.id).toBe(uuid);
        expect(validateSpy).toHaveBeenCalled();
      });

      it("should accept a uuid passed in constructor", () => {
        const vo = new UniqueEntityId();
        expect(uuidValidate(vo.id)).toBeTruthy();
        expect(validateSpy).toHaveBeenCalled();
      });
});
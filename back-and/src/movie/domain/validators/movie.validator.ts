import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import ClassValidatorFields from "../../../@seadwork/validators/class-validator-fileds";
import { MovieProps } from "../entities/movie";

export class MoveRules {
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    banner: string

    @IsString()
    @IsOptional()
    description: string
    
    @IsString()
    @IsNotEmpty()
    producer: string

    @IsString()
    @IsNotEmpty()
    director: string
    
    constructor(data: MovieProps) {
        Object.assign(this, data)
    }
}


export class MovieValidator
    extends ClassValidatorFields<MoveRules> {
    validate(data: MovieProps): boolean {
        return super.validate(new MoveRules(data))
    }
}

export default class MovieValidatorFactory{
    static create(): MovieValidator {
        return new MovieValidator();
    }
}
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import ClassValidatorFields from "../../../@seadwork/domain/validators/class-validator-fileds";
import { MovieProps } from "../entities/movie";

export class MovieRules {
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
    extends ClassValidatorFields<MovieRules> {
    validate(data: MovieProps): boolean {
        return super.validate(new MovieRules(data))
    }
}

export default class MovieValidatorFactory{
    static create(): MovieValidator {
        return new MovieValidator();
    }
}
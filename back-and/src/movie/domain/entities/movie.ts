import Entity from "../../../@seadwork/domain/entity/entity";
import UniqueEntityId from "../../../@seadwork/domain/value-objects/unique-entity-id";
import ValidatorRules from "../../../@seadwork/validators/validator-rules";
import MovieValidatorFactory, { MovieValidator } from "../validators/movie.validator";

export type MovieProps = {
    title: string,
    banner: string,
    description: string,
    producer: string,
    director: string
}

export class Movie extends Entity<MovieProps> {
    constructor(public readonly props: MovieProps, id?: UniqueEntityId) {
        Movie.validate(props)
        super(props, id)
        this.props.title = props.title
        this.props.banner = props.banner
        this.props.description = props.description
        this.props.producer = props.producer
        this.props.director = props.director
    }

    update(
        title: string,
        banner: string,
        description: string,
        producer: string,
        director: string): void {

        Movie.validate({
            title,
            banner,
            description,
            producer,
            director
        })

        this.props.title = title
        this.props.banner = banner
        this.props.description = description
        this.props.producer = producer
        this.props.director = director
    }

    static validate(props: MovieProps) {
        const validator: MovieValidator = MovieValidatorFactory.create()
        validator.validate(props)
    }
}

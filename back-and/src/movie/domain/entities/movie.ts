import Entity from "../../../@seadwork/domain/entity/entity";
import UniqueEntityId from "../../../@seadwork/domain/value-objects/unique-entity-id";

export type MovieProps = {
    title: string,
    banner: string,
    description: string,
    producer: string,
    director: string
}

export class Movie extends Entity<MovieProps> {
    constructor(public readonly props: MovieProps, id?: UniqueEntityId) {
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
        this.props.title = title
        this.props.banner = banner
        this.props.description = description
        this.props.producer = producer
        this.props.director = director
    }
}

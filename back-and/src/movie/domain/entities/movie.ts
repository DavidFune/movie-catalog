import UniqueEntityId from "../../../@seadwork/domain/value-objects/unique-entity-id";

export type MovieProps = {
    title: string,
    banner: string,
    description: string,
    producer: string,
    director: string
}

export class Movie {
    public readonly id: UniqueEntityId;
    constructor(public readonly props: MovieProps, id?: UniqueEntityId) {
        this.id = id || new UniqueEntityId()
        this.props.title = props.title
        this.props.banner = props.banner
        this.props.description = props.description
        this.props.producer = props.producer
        this.props.director = props.director
    }
}

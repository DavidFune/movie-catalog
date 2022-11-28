import { v4 as uuidv4 } from "uuid";
export type MovieProps = {
    title: string,
    banner: string,
    description: string,
    producer: string,
    director: string
}

export class Movie {
    public readonly id: string;
    constructor(public readonly props: MovieProps, id?: string) {
        this.id = id || uuidv4()
        this.props.title = props.title
        this.props.banner = props.banner
        this.props.description = props.description
        this.props.producer = props.producer
        this.props.director = props.director
    }
}

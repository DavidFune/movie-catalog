import { Movie } from "../../domain/entities/movie";

export type MovieOutput = {
    id: string
    title: string,
    banner: string,
    description: string,
    producer: string,
    director: string,
    created_at?: Date
};

export class MovieOutputMapper {
    static toOutput(entity: Movie): MovieOutput{
        return entity.toJSON();
    }
}
import MovieRepository from "../../domain/repository/movie.repository";
import { default as DefaultUseCase } from "../../../@seadwork/application/use-case";
import { MovieOutput, MovieOutputMapper } from "../dto";

export namespace UpdateMovieUseCase {
    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private movieRepo: MovieRepository.Repository) {}

       async execute(input: Input): Promise<Output> {
        const entity = await this.movieRepo.findById(input.id)
        delete input.id

        entity.update(
            input.title,
            input.banner,
            input.description,
            input.producer,
            input.director
        )

        await this.movieRepo.update(entity)
        return MovieOutputMapper.toOutput(entity)
       }
    }

    export type Input = {
        id: string;
        title: string,
        banner: string,
        description: string,
        producer: string,
        director: string
    }

    export type Output = MovieOutput;
}

export default UpdateMovieUseCase
import MovieRepository from "../../domain/repository/movie.repository";
import { default as DefaultUseCase } from "../../../@seadwork/application/use-case";
import { MovieOutput, MovieOutputMapper } from "../dto";

export namespace GetMovieUseCase {
    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private movieRepo: MovieRepository.Repository) {}

       async execute(input: Input): Promise<Output> {
        const entity = await this.movieRepo.findById(input.id)

        return MovieOutputMapper.toOutput(entity)
       }
    }

    export type Input = {
        id: string;
    }

    export type Output = MovieOutput;
}

export default GetMovieUseCase;
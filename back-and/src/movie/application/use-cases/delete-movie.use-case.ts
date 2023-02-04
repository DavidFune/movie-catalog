import MovieRepository from "../../domain/repository/movie.repository";
import { default as DefaultUseCase } from "../../../@seadwork/application/use-case";

export namespace DeleteMovieUseCase {
    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(private movieRepo: MovieRepository.Repository) {}

       async execute(input: Input): Promise<Output> {
        await this.movieRepo.delete(input.id)
        delete input.id
       }
    }

    export type Input = {
        id: string;
    }

    type Output = void
}

export default DeleteMovieUseCase;
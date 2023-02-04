import { Movie } from "../../domain/entities/movie"
import MovieRepository from "../../domain/repository/movie.repository"
import { default as DefaultUseCase } from "../../../@seadwork/application/use-case";
import { MovieOutput, MovieOutputMapper } from "../dto/movie-output";
export namespace CreateMovieUseCase {

    export class UseCase implements  DefaultUseCase<Input, Output>{
        constructor(private movieRepo: MovieRepository.Repository){}
       
        async execute(input: Input): Promise<Output>{
            const entity = new Movie(input)
            await this.movieRepo.insert(entity)
            
            return MovieOutputMapper.toOutput(entity)
        }
    }
    
    
    //DTO - Data Transfer Object
    export type Input = {
        title: string,
        banner: string,
        description: string,
        producer: string,
        director: string
    }

    export type Output = MovieOutput
}

export default CreateMovieUseCase;
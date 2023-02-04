import { PaginationOutputDto, PaginationOutputMapper } from "../../../@seadwork/application/dto/pagination-output";
import { SearchInputDto } from "../../../@seadwork/application/dto/search-input";
import { default as DefaultUseCase } from "../../../@seadwork/application/use-case";
import MovieRepository from "../../domain/repository/movie.repository";
import { MovieOutput, MovieOutputMapper } from "../dto";

export namespace ListMovieUseCase {
    export class UseCase implements DefaultUseCase<Input, Output>{
        constructor(private movieRepo: MovieRepository.Repository) {}

        async execute(input: Input): Promise<Output> {
            const params = new MovieRepository.SearchParams(input)
            const searchResult = await this.movieRepo.search(params)

            return this.toOutput(searchResult)
        }

        private toOutput(searchResult: MovieRepository.SearchResult): Output{

            const items = searchResult.items.map((item) => {
                return MovieOutputMapper.toOutput(item)
            });
            
            return PaginationOutputMapper.toOutput(items, searchResult)
        }

    }

    export type Input = SearchInputDto

    export type Output = PaginationOutputDto<MovieOutput>
}

export default ListMovieUseCase
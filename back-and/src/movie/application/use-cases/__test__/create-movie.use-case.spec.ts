import MovieInMemoryRepository from "../../../infra/repository/movie-in-memory.repository";
import {CreateMovieUseCase} from "../create-movie.use-case";

describe('CreateMovieUseCase Unit test', () => {
    let useCase: CreateMovieUseCase.UseCase
    let repository: MovieInMemoryRepository

    let movieValues = {
        title: "Castle in the Sky",
        banner: "banner.jpg",
        description: "The orphan Sheeta inherited",
        producer: "Isao Takahata",
        director: "Hayao Miyazaki"
    }

    beforeEach(() => {
        repository = new MovieInMemoryRepository()
        useCase = new CreateMovieUseCase.UseCase(repository)
    });

    it('should create a movie', async () => {

        const spyInsert = jest.spyOn(repository, "insert")
        const output = await useCase.execute(movieValues)

        expect(spyInsert).toHaveBeenCalledTimes(1);
        expect(output).toStrictEqual({
            id: repository.items[0].id,
            title: movieValues.title,
            banner: movieValues.banner, 
            description: movieValues.description, 
            producer: movieValues.producer, 
            director: movieValues.director, 
            created_at: repository.items[0].created_at
        })
    });
});
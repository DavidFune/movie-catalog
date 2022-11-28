import { Movie } from "./movie";

describe('Movie Test', () => {

    test('Construvt of movie', () => {
        const movie: Movie = new Movie("Castle in the Sky", "banner.jpg", "The orphan Sheeta inherited", "Isao Takahata", "Hayao Miyazaki")
        expect(movie.title).toBe("Castle in the Sky")
    });
});
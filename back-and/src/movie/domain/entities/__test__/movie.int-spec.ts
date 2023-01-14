import { ValidationError } from "../../../../@seadwork/errors/validation-error";
import { Movie } from "../movie";

describe('Movie Integration Tests', () => {

    let movieValues = {
        title: 'title',
        banner: "banner.jpg",
        description: "The orphan Sheeta inherited",
        producer: "Isao Takahata",
        director: "Hayao Miyazaki"
    }

    describe('created method', () => {

    });
    it('should a invalid movie when create', () => {
        expect(() => new Movie({
            ...movieValues,
            title: null,
        })
        ).toThrow(new ValidationError('The title is required'));

        expect(() => new Movie({
            ...movieValues,
            title: 5 as any,
        })
        ).toThrow(new ValidationError('The title must be a string'));
    });

    it('should a invalid movie when update', () => {

        const movie = new Movie({ ...movieValues })

        expect(() => movie.update(
            null,
            movieValues.banner,
            movieValues.description,
            movieValues.producer,
            movieValues.director
        )
        ).toThrow(new ValidationError('The title is required'));

        expect(() => movie.update(
            5 as any,
            movieValues.banner,
            movieValues.description,
            movieValues.producer,
            movieValues.director
        )
        ).toThrow(new ValidationError('The title must be a string'));
    });

    it('should a valid movie created', () => {
        expect.assertions(0)
        new Movie({ ...movieValues })
    });

    it('should a valid movie update', () => {
        expect.assertions(0)
        const movie = new Movie({ ...movieValues })

        movie.update(
            'update title',
            movieValues.banner,
            movieValues.description,
            movieValues.producer,
            movieValues.director
        )
        
    });
});
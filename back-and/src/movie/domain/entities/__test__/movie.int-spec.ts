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
        ).containsErrorMessages({
            title: [
                'title should not be empty',
                'title must be a string',
                'title must be shorter than or equal to 255 characters'
            ]
        });

        expect(() => new Movie({
            ...movieValues,
            title: 5 as any,
        })).containsErrorMessages({
            title: [
                'title must be a string',
                'title must be shorter than or equal to 255 characters'
            ]
        });
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
        ).containsErrorMessages({
            title: [
                'title should not be empty',
                'title must be a string',
                'title must be shorter than or equal to 255 characters'
            ]
        });

        expect(() => movie.update(
            5 as any,
            movieValues.banner,
            movieValues.description,
            movieValues.producer,
            movieValues.director
        )
        ).containsErrorMessages({
            title: [
                'title must be a string',
                'title must be shorter than or equal to 255 characters'
            ]
        });
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
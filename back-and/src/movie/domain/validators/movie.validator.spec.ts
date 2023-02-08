import MovieValidatorFactory, { MovieRules, MovieValidator } from "./movie.validator";

describe('MovieValidator Tests', () => {

    let validator: MovieValidator

    let movie = {
        title: '',
        banner: '',
        description: '',
        producer: '',
        director: ''
    }

    beforeEach(() => (validator = MovieValidatorFactory.create()))
    test('invalidation cases for title field', () => {

        expect({ validator, data: null }).containsErrorMessages({
            title: [
                'title should not be empty',
                'title must be a string',
                'title must be shorter than or equal to 255 characters'
            ]
        });

        expect({ validator, data: movie }).containsErrorMessages({
            title: ['title should not be empty']
        });

        expect({ validator, data: { ...movie, title: 5 as any } }).containsErrorMessages({
            title: [
                'title must be a string',
                'title must be shorter than or equal to 255 characters'
            ]
        });

        expect({ validator, data: { ...movie, title: "t".repeat(256) } }).containsErrorMessages({
            title: [
                'title must be shorter than or equal to 255 characters'
            ]
        });
    })

    test('valid case for fields ', () => {

        let isValid = validator.validate({
            ...movie,
            title: 'some value',
            banner: 'some value',
            producer: 'some value',
            director: 'some value'

        })

        expect(isValid).toBeTruthy()
        expect(validator.validatedData).toStrictEqual(new MovieRules({
            ...movie,
            title: 'some value',
            banner: 'some value',
            producer: 'some value',
            director: 'some value'

        }))
    });
})
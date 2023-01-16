import { title } from "process";
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

        let isValid = validator.validate(null)
        expect(isValid).toBeFalsy()
        expect(validator.errors['title']).toStrictEqual(
            [
                'title should not be empty',
                'title must be a string',
                'title must be shorter than or equal to 255 characters']);

        isValid = validator.validate(movie)
        expect(isValid).toBeFalsy()
        expect(validator.errors['title']).toStrictEqual(['title should not be empty']);

        
        isValid = validator.validate({...movie, title: 5 as any})
        expect(isValid).toBeFalsy()  
        expect(validator.errors['title']).toStrictEqual([
            'title must be a string',
            'title must be shorter than or equal to 255 characters'
        ]);


        isValid = validator.validate({...movie, title: "t".repeat(256)})
        expect(isValid).toBeFalsy()  
        expect(validator.errors['title']).toStrictEqual([
            'title must be shorter than or equal to 255 characters'
        ]);
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
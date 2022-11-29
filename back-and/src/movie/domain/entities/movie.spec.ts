import { Movie } from "./movie";
import UniqueEntityId from "../../../@seadwork/domain/value-objects/unique-entity-id";
describe('Movie Test', () => {

    test('Construvt of movie', () => {
        const movie: Movie = new Movie({
        title :"Castle in the Sky", 
        banner :"banner.jpg", 
        description :"The orphan Sheeta inherited", 
        producer :"Isao Takahata", 
        director :"Hayao Miyazaki"})
        
        expect(movie.props.title).toBe("Castle in the Sky")
    });

    test('Validate Id', () => {
        const movie: Movie = new Movie({
            title :"Castle in the Sky", 
            banner :"banner.jpg", 
            description :"The orphan Sheeta inherited", 
            producer :"Isao Takahata", 
            director :"Hayao Miyazaki"})

            expect(movie.id).not.toBeNull()
            expect(movie.uniqueEntityId).toBeInstanceOf(UniqueEntityId)
    });

});
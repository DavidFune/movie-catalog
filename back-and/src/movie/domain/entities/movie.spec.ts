import { Movie } from "./movie";
import { validate as uuidValidate } from "uuid";
import UniqueEntityId from "../../../@seadwork/domain/unique-entity-id";
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

    test('Validade Id', () => {
        const movie: Movie = new Movie({
            title :"Castle in the Sky", 
            banner :"banner.jpg", 
            description :"The orphan Sheeta inherited", 
            producer :"Isao Takahata", 
            director :"Hayao Miyazaki"})

            expect(movie.id).not.toBeNull()
            expect(movie.id).toBeInstanceOf(UniqueEntityId)
    });

});
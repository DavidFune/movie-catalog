
import { Movie } from "../movie";
import UniqueEntityId from "../../../../@seadwork/domain/value-objects/unique-entity-id";
describe('Movie Test', () => {

    beforeEach( () => {
        Movie.validate = jest.fn()
    })
    test('Construvt of movie', () => {
        const movie: Movie = new Movie({
        title :"Castle in the Sky", 
        banner :"banner.jpg", 
        description :"The orphan Sheeta inherited", 
        producer :"Isao Takahata", 
        director :"Hayao Miyazaki"})
        expect(Movie.validate).toHaveBeenCalled();
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

    it("should update a Movie", () => {
        const movie: Movie = new Movie({
            title :"Castle in the Sky", 
            banner :"banner.jpg", 
            description :"The orphan Sheeta inherited", 
            producer :"Isao Takahata", 
            director :"Hayao Miyazaki"})

        movie.update(
        "test update",
        "test update",
        "test update",
        "test update",
        "test update"
        );

        expect(Movie.validate).toHaveBeenCalledTimes(2);
        
        expect(movie.props.title).toBe("test update");
        expect(movie.props.banner).toBe("test update");
        expect(movie.props.description).toBe("test update");
        expect(movie.props.producer).toBe("test update");
        expect(movie.props.director).toBe("test update");
      });

});
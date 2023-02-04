import { Movie } from "../../domain/entities/movie";
import MovieInMemoryRepository from "./movie-in-memory.repository";

describe('MovieInMemoryRepository', () => {
    let repository: MovieInMemoryRepository;

    let movieValues = {
        title: 'title',
        banner: "banner.jpg",
        description: "The orphan Sheeta inherited",
        producer: "Isao Takahata",
        director: "Hayao Miyazaki"
    }

    beforeEach(() => repository = new MovieInMemoryRepository());


    it('should no filter items when filter object is null', async () => {
        const items = [new Movie(movieValues)]
        const filterSpy = jest.spyOn(items, "filter")

        let itemsFiltered = repository["applyFilter"](items, null)
        expect(filterSpy).not.toHaveBeenCalled();
        expect(itemsFiltered).toStrictEqual(itemsFiltered);
    });

    it('should filter items using filter parameter ', async () => {
        const items = [
            new Movie(movieValues),
            new Movie({...movieValues, title: "TEST"}),
            new Movie({...movieValues, title: "Fake"}),
        ]
        const filterSpy = jest.spyOn(items, "filter")

        let itemsFiltered = repository["applyFilter"](items, "title")
        expect(filterSpy).toHaveBeenCalledTimes(1);
        expect(itemsFiltered).toStrictEqual(itemsFiltered);
    });

    it('should sort by created_at hen sort params is nul', async () => {
        const created_at = new Date()

        const items = [
            new Movie({...movieValues, title: "title-1", created_at: created_at}),
            new Movie({...movieValues, title: "title-2", created_at: new Date(created_at.getTime() + 100)}),
            new Movie({...movieValues, title: "title-3", created_at: new Date(created_at.getTime() + 200)}),
        ]

        let itemsSorted = await repository["applySort"](items, null, null)
        
        expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]])
    });

    it('should sort by title', async () => {
        const created_at = new Date()

        const items = [
            new Movie({...movieValues, title: "b", created_at: new Date(created_at.getTime() + 100)}),
            new Movie({...movieValues, title: "a", created_at: created_at}),
            new Movie({...movieValues, title: "c", created_at: new Date(created_at.getTime() + 200)}),
        ]

        let itemsSorted = await repository["applySort"](items, "title", "asc")
        expect(itemsSorted).toStrictEqual([items[1], items[0], items[2]]);

        itemsSorted = await repository["applySort"](items, "title", "desc")
        expect(itemsSorted).toStrictEqual([items[2], items[0], items[1]])
    });
});
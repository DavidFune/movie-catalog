import { InMemorySearchableRepository } from "../../../@seadwork/domain/repository/in-memory.repository";
import { SortDirection } from "../../../@seadwork/domain/repository/repository-contracts";
import { Movie } from "../../domain/entities/movie";
import MovieRepository from "../../domain/repository/movie.repository";


export default class MovieInMemoryRepository
    extends InMemorySearchableRepository<Movie>
    implements MovieRepository.Repository {
    sortableFields: string[] = ["title", "created_at"];

    protected async applyFilter(
        items: Movie[], 
        filter: MovieRepository.Filter
        ): Promise<Movie[]> {
        if (!filter) {
            return items
        }

        return items.filter((item) => {
            return (
                item.props.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
        });
    }

    protected applySort(
        items: Movie[],
        sort: string | null,
        sort_dir: SortDirection | null
    ): Promise<Movie[]>{
        return !sort?
        super.applySort(items, "created_at", "desc")
        : super.applySort(items, sort, sort_dir)  
    }

}
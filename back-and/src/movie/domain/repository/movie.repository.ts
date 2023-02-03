import {
    SearchParams as DefaultSearchParams, 
    SearchResult as DefaultSearchResult, 
    SearchableRepositoryInterface } from "../../../@seadwork/domain/repository/repository-contracts";
import { Movie } from "../entities/movie";


export namespace MovieRepository{

    export type Filter = string
    
    export class SearchParams extends DefaultSearchParams<Filter>{}
    
    export class SearchResult extends DefaultSearchResult<
        Movie,
        Filter
    >{}
    export interface Repository 
        extends SearchableRepositoryInterface<
        Movie, 
        Filter, 
        SearchParams,
        SearchResult
        >{
        
    }
}

export default MovieRepository
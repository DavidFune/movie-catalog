import { SearchableRepositoryInterface } from "../../../@seadwork/domain/repository/repository-contracts";
import { Movie } from "../entities/movie";

export default interface MovieRepository extends SearchableRepositoryInterface<Movie, any, any>{
    
}
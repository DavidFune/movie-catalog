import {InMemorySearchableRepository} from "../../../@seadwork/domain/repository/in-memory.repository";
import { Movie } from "../../domain/entities/movie";
import MovieRepository from "../../domain/repository/movie.repository";


export default class MovieInMemoryRepository
    extends InMemorySearchableRepository<Movie>
    implements MovieRepository{

    }
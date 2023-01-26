import Entity from "../entity/entity"
import NotFoundError from "../errors/not-found.error"
import UniqueEntityId from "../value-objects/unique-entity-id"
import InMemoryRepository from "./in-memory.repository"

type StubEntityProps = {
    title: string
    description: string
}

class StubEntity extends Entity<StubEntityProps>{}

class StubInMemoryRepository extends InMemoryRepository<StubEntity>{}

describe('InMemoryRepository Unit Test', () => {
    
    let repository: StubInMemoryRepository
    beforeEach(() => repository = new StubInMemoryRepository())

    it('should insert a new entity', async () => {
        const entity = new StubEntity({title: 'title', description: 'teste entity - hello'})
        await repository.insert(entity)
        expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
    });

    it('should throws error when entity not found', () => {
        expect(repository.findById('fake-id')).rejects.toThrow(
            new NotFoundError('Entity Not Found using ID fake-id')
        );

        expect(repository.findById(
            new UniqueEntityId('8471cbf5-6356-44d5-9216-875d88433dff'))
            ).rejects.toThrow(
            new NotFoundError('Entity Not Found using ID 8471cbf5-6356-44d5-9216-875d88433dff')
        );

    });

    it('should finds a entity by id', async () => {
        const entity = new StubEntity({title: 'title', description: 'teste entity - hello'})
        await repository.insert(entity)
                
        let entityFound = await repository.findById(entity.id)
        expect(entityFound.toJSON()).toStrictEqual(entity.toJSON());

        entityFound = await repository.findById(entity.uniqueEntityId)
        expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
    });
    it('should retunes all entites', async() => {
        const entity = new StubEntity({title: 'title', description: 'teste entity - hello'})
        await repository.insert(entity)
        
        let entitesFound = await repository.findAll()
        expect(entitesFound).toStrictEqual([entity])
    });

    it('should throws error on update when entity not found', () => {
        const entity = new StubEntity({title: 'title', description: 'teste entity - hello'})
        
        expect(repository.update(entity)).rejects.toThrow(
            new NotFoundError(`Entity Not Found using ID ${entity.id}`)
        );

    });

    it("should updates an entity", async () => {
        const entity = new StubEntity({title: 'title', description: 'teste entity - hello'});
        await repository.insert(entity);
    
        const entityUpdated = new StubEntity(
            {title: 'title', description: 'teste entity - hello'},
          entity.uniqueEntityId
        );
        await repository.update(entityUpdated);
        expect(entityUpdated.toJSON()).toStrictEqual(repository.items[0].toJSON());
      });

      it("should throws error on delete when entity not found", () => {
        expect(repository.delete("fake-id")).rejects.toThrow(
          new NotFoundError("Entity Not Found using ID fake-id")
        );
    
        expect(
          repository.delete(
            new UniqueEntityId("8471cbf5-6356-44d5-9216-875d88433dff")
          )
        ).rejects.toThrow(
          new NotFoundError(
            `Entity Not Found using ID 8471cbf5-6356-44d5-9216-875d88433dff`
          )
        );
      });

      it("should deletes an entity", async () => {
        const entity = new StubEntity({title: 'title', description: 'teste entity - hello'});
        await repository.insert(entity);
    
        await repository.delete(entity.id);
        expect(repository.items).toHaveLength(0);
    
        await repository.insert(entity);
    
        await repository.delete(entity.uniqueEntityId);
        expect(repository.items).toHaveLength(0);
      });
    
});
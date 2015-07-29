package fr.skym.mrp.auth

import org.springframework.data.neo4j.repository.CypherDslRepository
import org.springframework.data.neo4j.repository.GraphRepository

interface UserRepository extends GraphRepository<User>, CypherDslRepository<User> {

    User findByUsername(String username)

}

package fr.skym.mrp.auth

import org.springframework.data.neo4j.annotation.GraphId
import org.springframework.data.neo4j.annotation.NodeEntity
import org.springframework.security.core.GrantedAuthority

@NodeEntity
class Authority implements GrantedAuthority {

    @GraphId Long id
    String authority

}

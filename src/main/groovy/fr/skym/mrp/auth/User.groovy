package fr.skym.mrp.auth

import org.springframework.data.neo4j.annotation.Fetch
import org.springframework.data.neo4j.annotation.GraphId
import org.springframework.data.neo4j.annotation.NodeEntity
import org.springframework.data.neo4j.annotation.RelatedTo
import org.springframework.security.core.userdetails.UserDetails

@NodeEntity
class User implements UserDetails {

    @GraphId Long id
    String username
    String password
    boolean accountNonExpired
    boolean accountNonLocked
    boolean credentialsNonExpired
    boolean enabled

    @Fetch @RelatedTo(type = "HAS_ROLE")
    Set<Authority> authorities

}

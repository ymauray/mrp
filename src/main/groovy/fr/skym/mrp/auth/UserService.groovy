package fr.skym.mrp.auth

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

import javax.annotation.PostConstruct

@Service
class UserService implements UserDetailsService {

    @Autowired
    PasswordEncoder passwordEncoder

    User user
    User admin

    @PostConstruct
    def init() {
        user = new User(
                username: "user",
                password: passwordEncoder.encode("user"),
                accountNonExpired: true,
                accountNonLocked: true,
                credentialsNonExpired: true,
                enabled: true,
                authorities: [new Authority(authority: "USER")]
        )

        admin = new User(
                username: "admin",
                password: passwordEncoder.encode("admin"),
                accountNonExpired: true,
                accountNonLocked: true,
                credentialsNonExpired: true,
                enabled: true,
                authorities: [new Authority(authority: "ADMIN"), new Authority(authority: "USER")]
        )
    }

    @Override
    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        switch (username) {
            case "user":
                return user
            case "admin":
                return admin
            default:
                throw new UsernameNotFoundException()
        }
    }
}

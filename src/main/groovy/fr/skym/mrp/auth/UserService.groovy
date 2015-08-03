package fr.skym.mrp.auth

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

import javax.annotation.PostConstruct

@Service
class UserService implements UserDetailsService {

    @Autowired
    PasswordEncoder passwordEncoder

    @Autowired
    UserRepository userRepository

    @PostConstruct
    def init() {
        User admin = userRepository.findByUsername("admin")
        if (admin == null) {
            createUser("admin", "Ch@ng3M3", "ADMIN", "USER")
        }
    }

    @Override
    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        def user = userRepository.findByUsername(username)
        if (!user) {
            throw new UsernameNotFoundException(username)
        }
        return user
    }

    User createUser(String username, String password, String... authorities) {
        def user = new User(
                username: username,
                password: passwordEncoder.encode(password),
                authorities: authorities?.collect({
                    new Authority(authority: it)
                }),
                accountNonExpired: true,
                accountNonLocked: true,
                credentialsNonExpired: true,
                enabled: true
        )
        userRepository.save(user)
        return user
    }

    @Transactional
    def getUsers() {
        userRepository.findAll().as(List.class)
    }

    @Transactional
    def get(Long id) {
        userRepository.findOne(id)
    }

    @Transactional
    def save(User user) {
        userRepository.save(user)
    }
}

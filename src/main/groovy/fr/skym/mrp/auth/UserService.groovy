/*
 *     MediaPlanner
 *     Copyright (C) 2015  Yannick Mauray
 *
 *     This program is free software; you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation; either version 2 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License along
 *     with this program; if not, write to the Free Software Foundation, Inc.,
 *     51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

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
            createUser("admin", "Ch@ng3M3", "FKBEEFXK2PFYFXGI", "ADMIN", "USER")
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

    User createUser(String username, String clearTextPassword, String totpKey, String... authorities) {
        def user = new User(
                username: username,
                password: passwordEncoder.encode(clearTextPassword),
                authorities: authorities?.collect({
                    new Authority(authority: it)
                }),
                totpKey: totpKey,
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

    @Transactional
    def createEmptyUser() {
        return new User()
    }
}

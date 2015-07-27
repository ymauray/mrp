package fr.skym.mrp

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.Bean
import org.springframework.core.Ordered
import org.springframework.core.annotation.Order
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder

@SpringBootApplication
class Application {

    static void main(String...args) {
        SpringApplication.run Application, args
    }

    @Bean
    @Order(value = Ordered.HIGHEST_PRECEDENCE)
    PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder()
    }

}

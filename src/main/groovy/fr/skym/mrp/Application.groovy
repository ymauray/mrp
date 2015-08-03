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

package fr.skym.mrp

import groovy.util.logging.Log4j
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.builder.SpringApplicationBuilder
import org.springframework.boot.context.web.SpringBootServletInitializer
import org.springframework.context.annotation.Bean
import org.springframework.core.Ordered
import org.springframework.core.annotation.Order
import org.springframework.core.env.Environment
import org.springframework.data.neo4j.config.EnableNeo4jRepositories
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.transaction.annotation.EnableTransactionManagement

import javax.annotation.PostConstruct

@SpringBootApplication
@EnableTransactionManagement(proxyTargetClass = true)
@EnableNeo4jRepositories(basePackages =  "fr.skym.mrp")
@Log4j
class Application extends SpringBootServletInitializer implements CommandLineRunner {

    static void main(String...args) {
        def app = new SpringApplication(Application)
        app.setAdditionalProfiles("embeded")
        app.run(args)
    }

    @Autowired
    Environment env

    @PostConstruct
    void init() {
        if (env.activeProfiles.length == 0) {
            log.warn "No Spring profile configured, running with default configuration"
        } else {
            log.info "Running with Spring profiles : ${Arrays.toString(env.activeProfiles)}"
        }
    }

    @Bean
    @Order(value = Ordered.HIGHEST_PRECEDENCE)
    PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder()
    }

    @Override
    void run(String... args) throws Exception {
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.profiles("deployed").sources(Application)
    }

}

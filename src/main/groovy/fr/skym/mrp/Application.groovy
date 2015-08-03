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

import org.springframework.boot.CommandLineRunner
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.builder.SpringApplicationBuilder
import org.springframework.boot.context.web.SpringBootServletInitializer
import org.springframework.context.annotation.Bean
import org.springframework.core.Ordered
import org.springframework.core.annotation.Order
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder

@SpringBootApplication
class Application extends SpringBootServletInitializer implements CommandLineRunner {

    static void main(String...args) {
        SpringApplication.run Application, args
    }

    @Bean
    @Order(value = Ordered.HIGHEST_PRECEDENCE)
    PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder()
    }

    @Override
    void run(String... args) throws Exception {
        /*
        def auth = new GoogleAuthenticator()
        def key = auth.createCredentials()
        println key.key
        */
        // FKBE EFXK 2PFY FXGI

        /*
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in))
        print "Password:"
        def password = br.readLine()
        def auth = new GoogleAuthenticator()
        boolean isCodeValid = auth.authorize("FKBEEFXK2PFYFXGI", password as int);
        println isCodeValid
        */
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(Application)
    }
}

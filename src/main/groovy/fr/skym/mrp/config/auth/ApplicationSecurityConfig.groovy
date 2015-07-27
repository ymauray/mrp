package fr.skym.mrp.config.auth

import fr.skym.mrp.auth.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.annotation.web.servlet.configuration.EnableWebMvcSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter
import org.springframework.stereotype.Component

@Component
@EnableWebMvcSecurity
class ApplicationSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    UserService userService

    @Autowired
    AuthenticationTokenProcessingFilter authenticationTokenProcessingFilter

    @Autowired
    PasswordEncoder passwordEncoder

    @Autowired
    protected void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(passwordEncoder)
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests().antMatchers("/rest/authenticate").permitAll()
        http.authorizeRequests().antMatchers("/rest/admin/**").hasRole("ADMIN")
        http.authorizeRequests().antMatchers("/rest/**").authenticated()
        http.csrf().disable()
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        http.addFilterBefore(authenticationTokenProcessingFilter, BasicAuthenticationFilter)
    }
}

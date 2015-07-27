package fr.skym.mrp.config.auth

import com.auth0.jwt.JWTVerifier
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpRequest
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.web.filter.GenericFilterBean

import javax.servlet.FilterChain
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.http.HttpServletRequest

@Component
class AuthenticationTokenProcessingFilter extends GenericFilterBean {

    @Value("{auth.secret}")
    String authSecret

    @Autowired
    UserDetailsService userDetailsService

    @Override
    void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) {
        if (!(request instanceof HttpServletRequest)) throw new RuntimeException()

        def httpRequest = request as HttpServletRequest
        def token = httpRequest.getHeader('X-Auth-Token')
        if (token) {
            def verifier = new JWTVerifier(authSecret)
            def claims = verifier.verify(token)
            def username = claims.username
            if (username) {
                def userDetails = userDetailsService.loadUserByUsername(username)
                def authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.authorities)
                authentication.details = WebAuthenticationDetailsSource.newInstance().buildDetails(httpRequest)
                SecurityContextHolder.context.authentication = authentication
            }
        }

        chain.doFilter(request, response)
    }
}

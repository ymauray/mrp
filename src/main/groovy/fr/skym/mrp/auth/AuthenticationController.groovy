package fr.skym.mrp.auth

import com.auth0.jwt.JWTSigner
import groovy.util.logging.Log4j
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/rest")
@Log4j
class AuthenticationController {

    @Value("{auth.secret}")
    String authSecret

    @Autowired
    AuthenticationManager authenticationManager

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    def authenticate(@RequestParam("username") String username, @RequestParam("password") String password) {
        def authenticationToken = new UsernamePasswordAuthenticationToken(username, password)
        def authentication = authenticationManager.authenticate(authenticationToken)
        SecurityContextHolder.context.authentication = authentication
        def signer = new JWTSigner(authSecret)
        def token = signer.sign([username: username, roles: authentication.authorities])
        return [token: token]
    }

}

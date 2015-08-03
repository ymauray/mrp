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

import com.auth0.jwt.JWTSigner
import com.warrenstrange.googleauth.GoogleAuthenticator
import groovy.util.logging.Log4j
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/rest")
@Log4j
class AuthenticationController {

    static class LoginForm {
        String username;
        String password;
        int token;
    }

    @Value("{auth.secret}")
    String authSecret

    @Autowired
    AuthenticationManager authenticationManager

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    def authenticate(@RequestBody LoginForm loginForm) {
        def authenticationToken = new UsernamePasswordAuthenticationToken(loginForm.username, loginForm.password)
        try {
            def authentication = authenticationManager.authenticate(authenticationToken)
            def principal = authentication.principal as User
            def auth = new GoogleAuthenticator()
            def authorized = auth.authorize(principal.totpKey, loginForm.token)
            if (authorized) {
                SecurityContextHolder.context.authentication = authentication
                def signer = new JWTSigner(authSecret)
                def token = signer.sign([username: loginForm.username, roles: authentication.authorities])
                return [token: token]
            } else {
                SecurityContextHolder.context.authentication = null
                return [token: null, message: "Invalid username, password or OTP token"]
            }
        }
        catch (BadCredentialsException e) {
            e.printStackTrace()
            SecurityContextHolder.context.authentication = null
            return [token: null, message: "Invalid username, password or OTP token"]
        }
    }
}

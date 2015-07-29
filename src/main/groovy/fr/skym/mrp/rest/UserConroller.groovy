package fr.skym.mrp.rest

import fr.skym.mrp.auth.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/rest/user")
class UserConroller {

    @Autowired
    UserService userService

    @RequestMapping(value = "", method = RequestMethod.GET)
    def list() {
        userService.getUsers()
    }

}

package fr.skym.mrp.rest

import fr.skym.mrp.auth.UserService
import org.codehaus.groovy.runtime.InvokerHelper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/rest/user")
class UserConroller {

    static class PresentationModel {
        int id
        String username
        String displayname
        String description
    }

    @Autowired
    UserService userService

    Closure cleanner = {
        it.password = null
        return it
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    def list() {
        userService.getUsers().collect(cleanner)
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    def update(@PathVariable(value = "id") int id, @RequestBody PresentationModel presentationModel) {
        def user = userService.get(presentationModel.id)
        if (user != null) {
            use(InvokerHelper) {
                user.setProperties(presentationModel.properties)
            }
            userService.save(user)
        }
        return user.collect(cleanner).first()
    }
}

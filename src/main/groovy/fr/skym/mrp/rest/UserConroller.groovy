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

package fr.skym.mrp.rest

import fr.skym.mrp.auth.User
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

    @RequestMapping(value = "", method = RequestMethod.PUT)
    def insert(@RequestBody PresentationModel presentationModel) {
        def user = new User()
        use(InvokerHelper) {
            user.setProperties(presentationModel.properties)
            user.id = null
        }
        userService.save(user)
    }

    @RequestMapping(value = "/create", method = RequestMethod.GET)
    def create() {
        return userService.createEmptyUser()
    }
}

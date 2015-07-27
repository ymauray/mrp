package fr.skym.mrp.rest.admin

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(value = "/rest/admin")
class DummyAdminController {

    @RequestMapping(value = "/dummy")
    def dummy() {
        return [path: "/rest/admin/dummy", role: "admin"]
    }

}

package fr.skym.mrp.rest

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(value = "/rest")
class DummyUserController {

    @RequestMapping(value = "/dummy")
    def dummy() {
        return [path: "/rest/dummy", role: "user"]
    }

}

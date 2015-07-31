package fr.skym.mrp.config

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping

@Controller
class RequestMapperConfig {

    @RequestMapping(value = "/login")
    def login() {
        return "_login.html"
    }

}

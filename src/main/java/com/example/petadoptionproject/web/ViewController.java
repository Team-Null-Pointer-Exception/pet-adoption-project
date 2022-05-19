package com.example.petadoptionproject.web;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class ViewController {

    @RequestMapping({"/", "/about", "/login", "/logout","/home", "/user", "/admin", "/error", "/loading", "/listings", "/create", "/edit", "/register", "/reset", "/admin", "/forgot"})
    public String showView(){
        return "forward:/index.html";
    }

}

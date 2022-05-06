package web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

    @RequestMapping({"/", "/about", "/login", "/home", "/listings", "/register", "/messages"})
    public String showView(){
        return "forward:/index.html";
    }

}

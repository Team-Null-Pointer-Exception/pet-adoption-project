package com.example.petadoptionproject.web;


import com.example.petadoptionproject.data.StoriesRepository;
import com.example.petadoptionproject.data.Story;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;


@CrossOrigin
@RestController
@RequestMapping(value = "/api/stories", headers = "Accept=application/json")
@AllArgsConstructor
public class StoryController {

    private StoriesRepository storiesRepository;

    @GetMapping
    public Collection<Story> getStories() {
        return storiesRepository.findAll();
    }

}
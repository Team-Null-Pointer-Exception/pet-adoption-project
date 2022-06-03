package com.example.petadoptionproject.web;

import com.example.petadoptionproject.data.StoriesRepository;
import com.example.petadoptionproject.data.Story;
import com.example.petadoptionproject.data.User;
import com.example.petadoptionproject.data.UsersRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.Collection;
import static com.example.petadoptionproject.data.User.Role.USER;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/stories", headers = "Accept=application/json")
@AllArgsConstructor
public class StoryController {

    private StoriesRepository storiesRepository;
    private UsersRepository usersRepository;

    @GetMapping
    public Collection<Story> getStories() {
        return storiesRepository.findAll();
    }

    @PostMapping
    public void createStory(@RequestBody String story, OAuth2Authentication auth) {
        Story newStory = new Story();
        newStory.setContent(story);
        String userToUpdate = auth.getName();
        User updatedUser = usersRepository.findByEmail(userToUpdate);
        newStory.setUser(updatedUser);
        newStory.setCreatedAt(LocalDate.now());
        if(updatedUser.getRole().equals(USER)) {
            newStory.setStatus(Story.Status.PENDING);
        } else {
            newStory.setStatus(Story.Status.ACTIVE);
        }
        storiesRepository.save(newStory);
    }

    @PutMapping("/{id}/updateStatus")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void updateStatus(@RequestParam String newStatus, @PathVariable long id) {
        Story updatedStory = storiesRepository.findById(id);
        updatedStory.setStatus(Story.Status.valueOf(newStatus));
        storiesRepository.save(updatedStory);
        System.out.println("Updating story status");
    }
}
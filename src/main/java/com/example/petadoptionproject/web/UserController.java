package com.example.petadoptionproject.web;


import com.example.petadoptionproject.data.*;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

import static com.example.petadoptionproject.data.User.Role.USER;

@AllArgsConstructor
@CrossOrigin
@RestController
@RequestMapping(value = "/api/users", headers = "Accept=application/json")
public class UserController {

    private UsersRepository usersRepository;
    private PasswordEncoder passwordEncoder;
    private StoriesRepository storiesRepository;

    @GetMapping
    public Collection<User> getUsers() {
        System.out.println(usersRepository);
        return usersRepository.findAll();
    }

    @GetMapping("{id}")
    public Optional<User> getById(@PathVariable long id){
        return usersRepository.findById(id);
    }

    @GetMapping("/email")
    public User getByEmail(@RequestParam String email){
        return usersRepository.findByEmail(email);
    }
    @GetMapping("/username")
    public User getByUsername(@RequestParam String username) {
        return usersRepository.findByUsername(username);
    }

    @GetMapping("/me")
    public User getCurrentUser(OAuth2Authentication auth) {
        String email = auth.getName();
        return usersRepository.findByEmail(email);
    }

    @PostMapping("/create")
    public void createUser(@RequestBody User user) {
        user.setCreatedAt(LocalDate.now());
        user.setRole(User.Role.USER);
        user.setStatus(User.Status.ACTIVE);
        String unencryptedPassword = user.getPassword();
        System.out.println(unencryptedPassword);
        String encryptedPassword = passwordEncoder.encode(unencryptedPassword);
        System.out.println(encryptedPassword);
        user.setPassword(encryptedPassword);
        ArrayList<Story> stories = new ArrayList<>();
        user.setStories(stories);
        usersRepository.save(user);
    }

    @DeleteMapping("{id}")
    public void deleteUser(@PathVariable Long id){
        usersRepository.deleteById(id);
    }

    @PutMapping("/me/updateUser")
    @PreAuthorize("hasAuthority('USER') || hasAuthority('ADMIN')")
    public void updateUser(@RequestBody User user, OAuth2Authentication auth){
        //needs to check for updated fields
        String userToUpdate = auth.getName();
        User updatedUser = usersRepository.findByEmail(userToUpdate);
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        updatedUser.setPassword(encryptedPassword);
        usersRepository.save(updatedUser);
    }

    @PutMapping("/me/updatePassword")
    @PreAuthorize("hasAuthority('USER') || hasAuthority('ADMIN')")
    public void updatePassword(@RequestParam String newPassword, OAuth2Authentication auth){
        String user = auth.getName();
        User updatedUser = usersRepository.findByEmail(user);
        String encryptedPassword = passwordEncoder.encode(newPassword);
        updatedUser.setPassword(encryptedPassword);
        usersRepository.save(updatedUser);
        System.out.println("Updating password");
    }



}



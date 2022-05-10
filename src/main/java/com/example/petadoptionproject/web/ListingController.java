package com.example.petadoptionproject.web;


import com.example.petadoptionproject.data.*;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Collection;
import java.util.Optional;

import static com.example.petadoptionproject.data.User.Role.ADMIN;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/listings", headers = "Accept=application/json")
@AllArgsConstructor
public class ListingController {
    private final ListingsRepository listingRepository;
    private final UsersRepository usersRepository;

    @GetMapping
    public Collection<Listing> getListings() {
        return listingRepository.findAll();
    }

    @GetMapping("{id}")
    public Optional<Listing> getById(@PathVariable long id){
        return listingRepository.findById(id);
    }

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('USER') || hasAuthority('ADMIN')")
    public void createListing(@RequestBody Listing listing, OAuth2Authentication auth) throws IOException {
        String email = auth.getName();
        User user = usersRepository.findByEmail(email);
        listing.setUser(user);
        listingRepository.save(listing);
    }

    @PutMapping("/edit/{id}")
    public void updateListing(@PathVariable long id, @RequestBody Listing listing, OAuth2Authentication auth) {
        String email = auth.getName();
        Listing listingToUpdate = listingRepository.getById(id);

        // update with parts that are updatable from listing

        listingRepository.save(listingToUpdate);
        }

    @DeleteMapping("{id}")
    @PreAuthorize("hasAuthority('USER') || hasAuthority('ADMIN')")
    public void deleteListing(@PathVariable Long id, OAuth2Authentication auth) {
        String email = auth.getName();
        User user = usersRepository.findByEmail(email);
        Listing listingToUpdate = listingRepository.getById(id);
        if(user.getRole().equals(ADMIN) || listingToUpdate.getUser().getEmail().equals(email)) {
            listingRepository.deleteById(id);
        }
    }





}

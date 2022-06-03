package com.example.petadoptionproject.web;

import com.example.petadoptionproject.data.*;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Optional;
import static com.example.petadoptionproject.data.User.Role.ADMIN;
import static com.example.petadoptionproject.data.User.Role.USER;

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

    @GetMapping("{id}") // this needs to be made a request variable
    public Optional<Listing> getById(@RequestParam long id){
        return listingRepository.findById(id);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('USER') || hasAuthority('ADMIN')")
    public void createListing(@RequestBody Listing listing, OAuth2Authentication auth) throws IOException {
        String email = auth.getName();
        User user = usersRepository.findByEmail(email);
        System.out.println(user);
        listing.setUser(user);
        listing.setCreatedAt(LocalDate.now());
        if(user.getRole().equals(USER)) {
            listing.setStatus(Listing.Status.PENDING);
        } else {
            listing.setStatus(Listing.Status.ACTIVE);
        }
        System.out.println(listing);
        listingRepository.save(listing);
    }

    @PutMapping("/edit/{id}")
    @PreAuthorize("hasAuthority('USER') || hasAuthority('ADMIN')")
    public void updateListing(@PathVariable long id, @RequestBody Listing newListing, OAuth2Authentication auth) {
        String email = auth.getName();
        Listing listingToUpdate = listingRepository.getById(id);
        listingToUpdate.setSummary(newListing.getSummary());
        listingToUpdate.setName(newListing.getName());
        listingToUpdate.setAnimal(newListing.getAnimal());
        listingToUpdate.setBreed(newListing.getBreed());
        listingToUpdate.setSex(newListing.getSex());
        listingToUpdate.setAge(newListing.getAge());
        listingToUpdate.setColor(newListing.getColor());
        listingToUpdate.setDescription(newListing.getDescription());
        listingToUpdate.setFixed(newListing.isFixed());
        listingToUpdate.setHealth(newListing.getHealth());
        if(newListing.getImages() != null) {
            listingToUpdate.setImages(newListing.getImages());
        }
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

    @PutMapping("{listingId}/updateStatus")
    public void updateStatus(@PathVariable Long listingId, @RequestParam String newStatus) {
        Listing listToUpdate = listingRepository.getById(listingId);
        listToUpdate.setStatus(Listing.Status.valueOf(newStatus));
        listingRepository.save(listToUpdate);
        System.out.println("Updating post number: " + listingId + " with: " + newStatus);
    }
}
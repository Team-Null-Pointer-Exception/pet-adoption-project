package web;


import data.*;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/listings", headers = "Accept=application/json")
@AllArgsConstructor
public class ListingController {
    private final ListingRepository listingRepository;
    private final UsersRepository usersRepository;
    private final PetRepository petRepository;

    @GetMapping
    public Collection<Listing> getListings() {
        return listingRepository.findAll();
    }

    @GetMapping("{id}")
    public Optional<Listing> getById(@PathVariable long id){
        return listingRepository.findById(id);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('USER') || hasAuthority('ADMIN')")
    public void createListing(@RequestBody Listing listing, OAuth2Authentication auth) throws IOException {
        String email = auth.getName();
        User user = usersRepository.findByEmail(email);
        listing.setUser(user);
        listingRepository.save(listing);
    }

    @PutMapping("{id}")
    public void updateListing(@PathVariable long id, @RequestBody Listing listing, OAuth2Authentication auth) {
        String email = auth.getName();
        Listing listingToUpdate = listingRepository.getById(id);
        User user = usersRepository.findByEmail(email);
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

    @GetMapping("searchByAnimal")
    public List<Listing> searchListingByAnimal(@RequestParam String animal){
        return listingRepository.findAllByPet(petRepository.findPetByAnimal(animal));
    }



}

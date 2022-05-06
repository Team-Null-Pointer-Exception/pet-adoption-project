package web;

import data.*;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Collection;
import java.util.Optional;

@AllArgsConstructor
@CrossOrigin
@RestController
public class PetController {
    private final PetRepository petRepository;
    private final UsersRepository usersRepository;
    private final ListingRepository listingRepository;

    @GetMapping
    public Collection<Pet> getPets() {
        return petRepository.findAll();
    }

    @GetMapping("{id}")
    public Optional<Pet> getById(@PathVariable long id){
        return petRepository.findById(id);
    }

    @PostMapping
    public void createPet(@RequestBody Pet pet) {
// update with info that must be looked up
        petRepository.save(pet);
    }

    @DeleteMapping("{id}")
    public void deletePet(@PathVariable Long id){
        petRepository.deleteById(id);
    }

    @GetMapping
    public Pet getPetByAnimal(@RequestParam String animal){
        return petRepository.findPetByAnimal(animal);
    }



}

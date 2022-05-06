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

@AllArgsConstructor
@CrossOrigin
@RestController
public class PetController {
    private final PetsRepository petRepository;
    private final UsersRepository usersRepository;
    private final ListingsRepository listingRepository;

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
        petRepository.save(pet);
    }

    @DeleteMapping("{id}")
    public void deletePet(@PathVariable Long id){
        petRepository.deleteById(id);
    }

    @GetMapping
    public List<Pet> getPetByAnimal(@RequestParam String animal){
        return petRepository.getAllByAnimal(animal);
    }



}

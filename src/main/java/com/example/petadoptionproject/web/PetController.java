package com.example.petadoptionproject.web;

import com.example.petadoptionproject.data.ListingsRepository;
import com.example.petadoptionproject.data.Pet;
import com.example.petadoptionproject.data.PetsRepository;
import com.example.petadoptionproject.data.UsersRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

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




}

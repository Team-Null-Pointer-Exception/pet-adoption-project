package data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PetsRepository extends JpaRepository<Pet, Long> {
    List<Pet> getAllByAnimal(String animal);
}

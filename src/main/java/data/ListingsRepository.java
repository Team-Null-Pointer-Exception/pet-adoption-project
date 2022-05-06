package data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ListingsRepository extends JpaRepository<Listing, Long> {
    Listing findByPet(Pet pet);
}

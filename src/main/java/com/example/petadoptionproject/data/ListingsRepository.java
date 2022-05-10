package com.example.petadoptionproject.data;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ListingsRepository extends JpaRepository<Listing, Long> {
}

package com.example.petadoptionproject.data;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StoriesRepository extends JpaRepository<Story, Long> {
    Story findById(long id);
}

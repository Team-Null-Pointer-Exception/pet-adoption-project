package com.example.petadoptionproject.data;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<User, Long>{
    User findByUsername(String username);
    User findByEmail(String email);
    User findByResetPasswordToken(String token);
    User findById(long id);
}

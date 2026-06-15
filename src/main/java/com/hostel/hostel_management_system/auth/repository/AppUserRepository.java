package com.hostel.hostel_management_system.auth.repository;

import com.hostel.hostel_management_system.auth.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {

    Optional<AppUser> findByEmail(String email);

    boolean existsByEmail(String email);
}
package com.hostel.hostel_management_system.resident.repository;

import com.hostel.hostel_management_system.resident.entity.Resident;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResidentRepository
        extends JpaRepository<Resident, Long> {
}
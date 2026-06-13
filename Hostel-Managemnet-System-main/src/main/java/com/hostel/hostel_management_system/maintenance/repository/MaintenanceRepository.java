package com.hostel.hostel_management_system.maintenance.repository;

import com.hostel.hostel_management_system.maintenance.entity.Maintenance;
import org.springframework.data.jpa.repository.JpaRepository;


    public interface MaintenanceRepository
            extends JpaRepository<Maintenance, Long> {
    }


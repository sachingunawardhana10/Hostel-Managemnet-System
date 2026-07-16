package com.hostel.hostel_management_system.allocation.repository;

import com.hostel.hostel_management_system.allocation.entity.RoomAllocation;
import com.hostel.hostel_management_system.allocation.enums.AllocationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RoomAllocationRepository extends JpaRepository<RoomAllocation, Long> {

    Optional<RoomAllocation> findByResidentIdAndStatus(Long residentId, AllocationStatus status);

    List<RoomAllocation> findByRoomId(Long roomId);

    List<RoomAllocation> findByStatus(AllocationStatus status);
}
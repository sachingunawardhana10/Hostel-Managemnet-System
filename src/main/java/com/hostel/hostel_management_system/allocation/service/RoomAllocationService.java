package com.hostel.hostel_management_system.allocation.service;

import com.hostel.hostel_management_system.allocation.dto.RoomAllocationRequest;
import com.hostel.hostel_management_system.allocation.entity.RoomAllocation;
import com.hostel.hostel_management_system.allocation.enums.AllocationStatus;
import com.hostel.hostel_management_system.allocation.repository.RoomAllocationRepository;
import com.hostel.hostel_management_system.common.exception.BadRequestException;
import com.hostel.hostel_management_system.common.exception.ResourceNotFoundException;
import com.hostel.hostel_management_system.resident.entity.Resident;
import com.hostel.hostel_management_system.resident.repository.ResidentRepository;
import com.hostel.hostel_management_system.room.entity.Room;
import com.hostel.hostel_management_system.room.enums.RoomStatus;
import com.hostel.hostel_management_system.room.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class RoomAllocationService {

    private final RoomAllocationRepository allocationRepository;
    private final ResidentRepository residentRepository;
    private final RoomRepository roomRepository;

    public RoomAllocationService(
            RoomAllocationRepository allocationRepository,
            ResidentRepository residentRepository,
            RoomRepository roomRepository) {
        this.allocationRepository = allocationRepository;
        this.residentRepository = residentRepository;
        this.roomRepository = roomRepository;
    }

    public List<RoomAllocation> getAllAllocations() {
        return allocationRepository.findAll();
    }

    public RoomAllocation createAllocation(RoomAllocationRequest request) {
        Resident resident = residentRepository.findById(request.getResidentId())
                .orElseThrow(() -> new ResourceNotFoundException("Resident not found"));

        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        allocationRepository.findByResidentIdAndStatus(resident.getId(), AllocationStatus.ACTIVE)
                .ifPresent(existing -> {
                    throw new BadRequestException("Resident already has an active room allocation");
                });

        if (room.getOccupiedBeds() >= room.getCapacity()) {
            throw new BadRequestException("Room is already full");
        }

        RoomAllocation allocation = new RoomAllocation();
        allocation.setResident(resident);
        allocation.setRoom(room);
        allocation.setBedNumber(request.getBedNumber());
        allocation.setStatus(AllocationStatus.ACTIVE);

        room.setOccupiedBeds(room.getOccupiedBeds() + 1);

        if (room.getOccupiedBeds().equals(room.getCapacity())) {
            room.setStatus(RoomStatus.FULL);
        } else {
            room.setStatus(RoomStatus.AVAILABLE);
        }

        roomRepository.save(room);

        return allocationRepository.save(allocation);
    }

    public RoomAllocation endAllocation(Long id) {
        RoomAllocation allocation = allocationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room allocation not found"));

        if (allocation.getStatus() != AllocationStatus.ACTIVE) {
            throw new BadRequestException("Allocation is not active");
        }

        allocation.setStatus(AllocationStatus.ENDED);
        allocation.setEndDate(LocalDate.now());

        Room room = allocation.getRoom();

        if (room.getOccupiedBeds() > 0) {
            room.setOccupiedBeds(room.getOccupiedBeds() - 1);
        }

        room.setStatus(RoomStatus.AVAILABLE);
        roomRepository.save(room);

        return allocationRepository.save(allocation);
    }
}
package com.hostel.hostel_management_system.resident.service;

import com.hostel.hostel_management_system.resident.dto.ResidentRequest;
import com.hostel.hostel_management_system.resident.entity.Resident;
import com.hostel.hostel_management_system.resident.enums.ResidentStatus;
import com.hostel.hostel_management_system.resident.repository.ResidentRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResidentService {

    private final ResidentRepository repository;

    public ResidentService(ResidentRepository repository) {
        this.repository = repository;
    }

    public List<Resident> getAllResidents() {
        return repository.findAll();
    }

    public Resident getResidentById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resident not found with id: " + id));
    }

    public Resident saveResident(@Valid ResidentRequest request) {

        Resident resident = new Resident();

        resident.setFullName(request.getFullName());
        resident.setEmail(request.getEmail());
        resident.setPhone(request.getPhone());
        resident.setAddress(request.getAddress());

        return repository.save(resident);
    }

    public Resident updateResident(Long id, Resident request) {

        Resident existingResident = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resident not found with id: " + id));

        existingResident.setFullName(request.getFullName());
        existingResident.setEmail(request.getEmail());
        existingResident.setPhone(request.getPhone());
        existingResident.setAddress(request.getAddress());

        return repository.save(existingResident);
    }

    public void deleteResident(Long id) {
        Resident resident = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resident not found"));

        resident.setStatus(ResidentStatus.LEFT);

        repository.save(resident);
    }
}
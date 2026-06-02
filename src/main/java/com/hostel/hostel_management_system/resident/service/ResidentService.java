package com.hostel.hostel_management_system.resident.service;

import com.hostel.hostel_management_system.resident.entity.Resident;
import com.hostel.hostel_management_system.resident.repository.ResidentRepository;
import lombok.RequiredArgsConstructor;
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
                .orElseThrow(() ->
                        new RuntimeException("Resident not found"));
    }

    public Resident saveResident(Resident resident) {
        return repository.save(resident);
    }

    public Resident updateResident(Long id,
                                   Resident resident) {

        Resident existing = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Resident not found"));

        existing.setFullName(resident.getFullName());
        existing.setEmail(resident.getEmail());
        existing.setPhone(resident.getPhone());
        existing.setAddress(resident.getAddress());

        return repository.save(existing);
    }

    public void deleteResident(Long id) {
        repository.deleteById(id);
    }
}
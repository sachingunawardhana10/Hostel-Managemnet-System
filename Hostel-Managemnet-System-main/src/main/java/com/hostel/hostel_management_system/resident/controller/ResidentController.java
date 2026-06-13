package com.hostel.hostel_management_system.resident.controller;

import com.hostel.hostel_management_system.resident.entity.Resident;
import com.hostel.hostel_management_system.resident.service.ResidentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/residents")
public class ResidentController {

    private final ResidentService service;

    public ResidentController(ResidentService service) {
        this.service = service;
    }

    @GetMapping
    public List<Resident> getAllResidents() {
        return service.getAllResidents();
    }

    @GetMapping("/{id}")
    public Resident getResidentById(
            @PathVariable Long id) {
        return service.getResidentById(id);
    }

    @PostMapping
    public Resident createResident(
            @RequestBody Resident resident) {
        return service.saveResident(resident);
    }

    @PutMapping("/{id}")
    public Resident updateResident(
            @PathVariable Long id,
            @RequestBody Resident resident) {

        return service.updateResident(id, resident);
    }

    @DeleteMapping("/{id}")
    public String deleteResident(
            @PathVariable Long id) {

        service.deleteResident(id);

        return "Resident Deleted Successfully";
    }
}

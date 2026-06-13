package com.hostel.hostel_management_system.maintenance.controller;

import com.hostel.hostel_management_system.maintenance.entity.Maintenance;
import com.hostel.hostel_management_system.maintenance.service.MaintenanceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/maintenances")
public class MaintenanceController {

    private final MaintenanceService service;

    public MaintenanceController(MaintenanceService service) {
        this.service = service;
    }

    @GetMapping
    public List<Maintenance> getAllMaintenances() {
        return service.getAllMaintenance();
    }

    @GetMapping("/{id}")
    public Maintenance getMaintenanceById(@PathVariable Long id) {
        return service.getMaintenanceById(id);
    }

    @PostMapping
    public Maintenance createMaintenance(@RequestBody Maintenance maintenance) {
        return service.saveMaintenance(maintenance);
    }

    @PutMapping("/{id}")
    public Maintenance updateMaintenance(
            @PathVariable Long id,
            @RequestBody Maintenance maintenance) {

        return service.updateMaintenance(id, maintenance);
    }

    @DeleteMapping("/{id}")
    public String deleteMaintenance(@PathVariable Long id) {

        service.deleteMaintenance(id);

        return "Maintenance Deleted Successfully";
    }
}
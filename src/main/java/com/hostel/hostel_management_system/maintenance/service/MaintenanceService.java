package com.hostel.hostel_management_system.maintenance.service;

import com.hostel.hostel_management_system.maintenance.entity.Maintenance;
import com.hostel.hostel_management_system.maintenance.repository.MaintenanceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaintenanceService {

    private final MaintenanceRepository repository;

    public MaintenanceService(MaintenanceRepository repository) {
        this.repository = repository;
    }

    public List<Maintenance> getAllMaintenance() {
        return repository.findAll();
    }

    public Maintenance getMaintenanceById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Maintenance not found"));
    }

    public Maintenance saveMaintenance(Maintenance maintenance) {
        return repository.save(maintenance);
    }

    public Maintenance updateMaintenance(Long id, Maintenance maintenance) {

        Maintenance existing = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Maintenance not found"));

        existing.setDescription(maintenance.getDescription());
        existing.setStatus(maintenance.getStatus());
        existing.setIssueType(maintenance.getIssueType());
        existing.setPriority(maintenance.getPriority());
        existing.setResidentId(maintenance.getResidentId());

        return repository.save(existing);
    }

    public void deleteMaintenance(Long id) {
        repository.deleteById(id);
    }
}
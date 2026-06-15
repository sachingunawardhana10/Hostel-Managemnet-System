package com.hostel.hostel_management_system.allocation.controller;

import com.hostel.hostel_management_system.allocation.dto.RoomAllocationRequest;
import com.hostel.hostel_management_system.allocation.entity.RoomAllocation;
import com.hostel.hostel_management_system.allocation.service.RoomAllocationService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/allocations")
public class RoomAllocationController {

    private final RoomAllocationService service;

    public RoomAllocationController(RoomAllocationService service) {
        this.service = service;
    }

    @GetMapping
    public List<RoomAllocation> getAllAllocations() {
        return service.getAllAllocations();
    }

    @PostMapping
    public RoomAllocation createAllocation(@Valid @RequestBody RoomAllocationRequest request) {
        return service.createAllocation(request);
    }

    @PutMapping("/{id}/end")
    public RoomAllocation endAllocation(@PathVariable Long id) {
        return service.endAllocation(id);
    }
}
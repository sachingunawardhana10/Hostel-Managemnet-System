package com.hostel.hostel_management_system.dashboard.controller;

import com.hostel.hostel_management_system.dashboard.dto.DashboardSummaryResponse;
import com.hostel.hostel_management_system.dashboard.service.DashboardService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService service;

    public DashboardController(DashboardService service) {
        this.service = service;
    }

    @GetMapping("/summary")
    public DashboardSummaryResponse getSummary() {
        return service.getSummary();
    }
}
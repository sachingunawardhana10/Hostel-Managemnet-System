package com.hostel.hostel_management_system.dashboard.dto;

public class DashboardSummaryResponse {

    private long totalResidents;
    private long totalRooms;
    private long totalPayments;
    private long totalMaintenanceRequests;
    private long totalNotifications;
    private long totalAllocations;

    public DashboardSummaryResponse(
            long totalResidents,
            long totalRooms,
            long totalAllocations,
            long totalPayments,
            long totalMaintenanceRequests,
            long totalNotifications) {
        this.totalResidents = totalResidents;
        this.totalRooms = totalRooms;
        this.totalAllocations = totalAllocations;
        this.totalPayments = totalPayments;
        this.totalMaintenanceRequests = totalMaintenanceRequests;
        this.totalNotifications = totalNotifications;
    }

    public long getTotalAllocations() {
        return totalAllocations;
    }

    public long getTotalResidents() {
        return totalResidents;
    }

    public long getTotalRooms() {
        return totalRooms;
    }

    public long getTotalPayments() {
        return totalPayments;
    }

    public long getTotalMaintenanceRequests() {
        return totalMaintenanceRequests;
    }

    public long getTotalNotifications() {
        return totalNotifications;
    }
}
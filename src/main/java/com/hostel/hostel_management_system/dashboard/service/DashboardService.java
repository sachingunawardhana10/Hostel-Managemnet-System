package com.hostel.hostel_management_system.dashboard.service;

import com.hostel.hostel_management_system.allocation.repository.RoomAllocationRepository;
import com.hostel.hostel_management_system.dashboard.dto.DashboardSummaryResponse;
import com.hostel.hostel_management_system.maintenance.repository.MaintenanceRepository;
import com.hostel.hostel_management_system.notification.repository.NotificationRepository;
import com.hostel.hostel_management_system.payment.repository.PaymentRepository;
import com.hostel.hostel_management_system.resident.repository.ResidentRepository;
import com.hostel.hostel_management_system.room.repository.RoomRepository;
import org.springframework.stereotype.Service;
import com.hostel.hostel_management_system.allocation.repository.RoomAllocationRepository;

@Service
public class DashboardService {

    private final ResidentRepository residentRepository;
    private final RoomRepository roomRepository;
    private final PaymentRepository paymentRepository;
    private final MaintenanceRepository maintenanceRepository;
    private final NotificationRepository notificationRepository;
    private final RoomAllocationRepository roomAllocationRepository;

    public DashboardService(
            ResidentRepository residentRepository,
            RoomRepository roomRepository,
            PaymentRepository paymentRepository,
            MaintenanceRepository maintenanceRepository,
            RoomAllocationRepository roomAllocationRepository,
            NotificationRepository notificationRepository) {
        this.residentRepository = residentRepository;
        this.roomRepository = roomRepository;
        this.paymentRepository = paymentRepository;
        this.maintenanceRepository = maintenanceRepository;
        this.notificationRepository = notificationRepository;
        this.roomAllocationRepository = roomAllocationRepository;
    }

    public DashboardSummaryResponse getSummary() {
        return new DashboardSummaryResponse(
                residentRepository.count(),
                roomRepository.count(),
                roomAllocationRepository.count(),
                paymentRepository.count(),
                maintenanceRepository.count(),
                notificationRepository.count()
        );
    }
}
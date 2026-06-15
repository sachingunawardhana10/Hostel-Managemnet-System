package com.hostel.hostel_management_system.dashboard.service;

import com.hostel.hostel_management_system.dashboard.dto.DashboardSummaryResponse;
import com.hostel.hostel_management_system.maintenance.repository.MaintenanceRepository;
import com.hostel.hostel_management_system.notification.repository.NotificationRepository;
import com.hostel.hostel_management_system.payment.repository.PaymentRepository;
import com.hostel.hostel_management_system.resident.repository.ResidentRepository;
import com.hostel.hostel_management_system.room.repository.RoomRepository;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final ResidentRepository residentRepository;
    private final RoomRepository roomRepository;
    private final PaymentRepository paymentRepository;
    private final MaintenanceRepository maintenanceRepository;
    private final NotificationRepository notificationRepository;

    public DashboardService(
            ResidentRepository residentRepository,
            RoomRepository roomRepository,
            PaymentRepository paymentRepository,
            MaintenanceRepository maintenanceRepository,
            NotificationRepository notificationRepository) {
        this.residentRepository = residentRepository;
        this.roomRepository = roomRepository;
        this.paymentRepository = paymentRepository;
        this.maintenanceRepository = maintenanceRepository;
        this.notificationRepository = notificationRepository;
    }

    public DashboardSummaryResponse getSummary() {
        return new DashboardSummaryResponse(
                residentRepository.count(),
                roomRepository.count(),
                paymentRepository.count(),
                maintenanceRepository.count(),
                notificationRepository.count()
        );
    }
}
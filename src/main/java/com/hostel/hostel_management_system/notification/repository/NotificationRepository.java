package com.hostel.hostel_management_system.notification.repository;

import com.hostel.hostel_management_system.resident.entity.Resident;
import com.hostel.hostel_management_system.room.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository
        extends JpaRepository<Notification, Long> {
}
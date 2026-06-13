package com.hostel.hostel_management_system.payment.repository;

import com.hostel.hostel_management_system.payment.entity.Payment;
import com.hostel.hostel_management_system.room.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository
        extends JpaRepository<Payment, Long> {
}
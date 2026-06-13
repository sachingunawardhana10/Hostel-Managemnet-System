package com.hostel.hostel_management_system.room.repository;

import com.hostel.hostel_management_system.room.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository
        extends JpaRepository<Room, Long> {
}
<<<<<<< HEAD
//Database access layer
// Provides database operations without writing SQL


package com.hostel.hostel_management_system.room.repository;

import com.hostel.hostel_management_system.resident.entity.Resident;
=======
package com.hostel.hostel_management_system.room.repository;

>>>>>>> origin/notification-service
import com.hostel.hostel_management_system.room.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository
        extends JpaRepository<Room, Long> {
}
package com.hostel.hostel_management_system.room.service;

import com.hostel.hostel_management_system.room.entity.Room;
import com.hostel.hostel_management_system.room.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    private final RoomRepository repository;

    public RoomService(RoomRepository repository) {
        this.repository = repository;
    }

    public List<Room> getAllRooms() {
        return repository.findAll();
    }

    public Room getRoomById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));
    }

    public Room saveRoom(Room room) {
        return repository.save(room);
    }

    public Room updateRoom(Long id, Room room) {
        Room existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        existing.setRoomNumber(room.getRoomNumber());
        existing.setCapacity(room.getCapacity());
        existing.setOccupiedBeds(room.getOccupiedBeds());
        existing.setStatus(room.getStatus());

        return repository.save(existing);
    }

    public void deleteRoom(Long id) {
        repository.deleteById(id);
    }
}
package com.hostel.hostel_management_system.room.controller;

import com.hostel.hostel_management_system.room.entity.Room;
import com.hostel.hostel_management_system.room.service.RoomService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    private final RoomService service;

    public RoomController(RoomService service) {
        this.service = service;
    }

    @GetMapping
    public List<Room> getAllRooms() {
        return service.getAllRooms();
    }

    @GetMapping("/{id}")
    public Room getRoomById(@PathVariable Long id) {
        return service.getRoomById(id);
    }

    @PostMapping
    public Room createRoom(@RequestBody Room room) {
        return service.saveRoom(room);
    }

    @PutMapping("/{id}")
    public Room updateRoom(
            @PathVariable Long id,
            @RequestBody Room room) {

        return service.updateRoom(id, room);
    }

    @DeleteMapping("/{id}")
    public String deleteRoom(@PathVariable Long id) {
        service.deleteRoom(id);
        return "Room Deleted Successfully";
    }
}
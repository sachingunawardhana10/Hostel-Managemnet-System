<<<<<<< HEAD
//  REST API endpoints
//Expose REST API endpoints

=======
>>>>>>> origin/notification-service
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
<<<<<<< HEAD

=======
>>>>>>> origin/notification-service
        this.service = service;
    }

    @GetMapping
    public List<Room> getAllRooms() {
<<<<<<< HEAD

=======
>>>>>>> origin/notification-service
        return service.getAllRooms();
    }

    @GetMapping("/{id}")
<<<<<<< HEAD
    public Room getRoomById(
            @PathVariable Long id) {
=======
    public Room getRoomById(@PathVariable Long id) {
>>>>>>> origin/notification-service
        return service.getRoomById(id);
    }

    @PostMapping
<<<<<<< HEAD
    public Room createRoom(
            @RequestBody Room room) {
=======
    public Room createRoom(@RequestBody Room room) {
>>>>>>> origin/notification-service
        return service.saveRoom(room);
    }

    @PutMapping("/{id}")
    public Room updateRoom(
            @PathVariable Long id,
            @RequestBody Room room) {

        return service.updateRoom(id, room);
    }

    @DeleteMapping("/{id}")
<<<<<<< HEAD
    public String deleteRoom(
            @PathVariable Long id) {
=======
    public String deleteRoom(@PathVariable Long id) {
>>>>>>> origin/notification-service

        service.deleteRoom(id);

        return "Room Deleted Successfully";
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> origin/notification-service

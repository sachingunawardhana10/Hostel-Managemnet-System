package com.hostel.hostel_management_system.room.entity;

import com.hostel.hostel_management_system.room.enums.RoomStatus;
import jakarta.persistence.*;

@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roomNumber;

    private Integer capacity;

    private Integer occupiedBeds;

    @Enumerated(EnumType.STRING)
    private RoomStatus status;

    @PrePersist
    public void onCreate() {
        if (occupiedBeds == null) {
            occupiedBeds = 0;
        }

        if (status == null) {
            status = RoomStatus.AVAILABLE;
        }
    }

    @PreUpdate
    public void onUpdate() {
        if (occupiedBeds == null) {
            occupiedBeds = 0;
        }

        if (status == null) {
            status = RoomStatus.AVAILABLE;
        }
    }

    public Long getId() {
        return id;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Integer getOccupiedBeds() {
        return occupiedBeds;
    }

    public void setOccupiedBeds(Integer occupiedBeds) {
        this.occupiedBeds = occupiedBeds;
    }

    public RoomStatus getStatus() {
        return status;
    }

    public void setStatus(RoomStatus status) {
        this.status = status;
    }
}
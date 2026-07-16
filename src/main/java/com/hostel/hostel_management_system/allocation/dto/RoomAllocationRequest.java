package com.hostel.hostel_management_system.allocation.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class RoomAllocationRequest {

    @NotNull(message = "Resident ID is required")
    private Long residentId;

    @NotNull(message = "Room ID is required")
    private Long roomId;

    @NotBlank(message = "Bed number is required")
    private String bedNumber;

    public Long getResidentId() {
        return residentId;
    }

    public void setResidentId(Long residentId) {
        this.residentId = residentId;
    }

    public Long getRoomId() {
        return roomId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }

    public String getBedNumber() {
        return bedNumber;
    }

    public void setBedNumber(String bedNumber) {
        this.bedNumber = bedNumber;
    }
}
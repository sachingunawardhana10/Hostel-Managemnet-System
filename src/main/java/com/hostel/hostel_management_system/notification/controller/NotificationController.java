package com.hostel.hostel_management_system.notification.controller;


import com.hostel.hostel_management_system.notification.service.NotificationService;
import com.hostel.hostel_management_system.room.entity.Notification;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService service;

    public NotificationController(NotificationService service) {
        this.service = service;
    }

    @GetMapping
    public List<Notification> getAllNotifications() {
        return service.getAllNotifications();
    }

    @GetMapping("/{id}")
    public Notification getNotificationById(@PathVariable Long id) {
        return service.getNotificationById(id);
    }

    @PostMapping
    public Notification createNotification(
            @RequestBody Notification notification) {

        return service.saveNotification(notification);
    }

    @PutMapping("/{id}")
    public Notification updateNotification(
            @PathVariable Long id,
            @RequestBody Notification notification) {

        return service.updateNotification(id, notification);
    }

    @DeleteMapping("/{id}")
    public String deleteNotification(@PathVariable Long id) {

        service.deleteNotification(id);

        return "Notification Deleted Successfully";
    }
}
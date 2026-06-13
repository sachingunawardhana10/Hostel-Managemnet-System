package com.hostel.hostel_management_system.notification.service;

// Changed 'notifications' to 'notification' to match your package structure
import com.hostel.hostel_management_system.notification.repository.NotificationRepository;
import com.hostel.hostel_management_system.room.entity.Notification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository repository;

    public NotificationService(NotificationRepository repository) {
        this.repository = repository;
    }

    public List<Notification> getAllNotifications() {
        return repository.findAll();
    }

    public Notification getNotificationById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Notification not found"));
    }

    public Notification saveNotification(Notification notification) {
        return repository.save(notification);
    }

    public Notification updateNotification(Long id, Notification notification) {

        Notification existing = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Notification not found"));

        existing.setTitle(notification.getTitle());
        existing.setMessage(notification.getMessage());
        existing.setRecipientId(notification.getRecipientId());
        existing.setType(notification.getType());
        existing.setSentAt(notification.getSentAt());

        return repository.save(existing);
    }

    public void deleteNotification(Long id) {
        repository.deleteById(id);
    }
}
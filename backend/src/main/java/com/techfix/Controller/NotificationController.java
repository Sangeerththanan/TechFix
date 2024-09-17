package com.techfix.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.techfix.Model.Notification;
import com.techfix.Service.NotificationService;

@RestController
@RequestMapping("/notification")
public class NotificationController extends GenericController<Notification, Long>{
	@Autowired
    private NotificationService service;

    // Get notifications for a specific user
    @GetMapping("/user/{Id}")
    public ResponseEntity<List<Notification>> getNotificationsByUser(@PathVariable("Id") Long Id) {
        List<Notification> notifications = service.getNotificationsByUser(Id);
        return ResponseEntity.ok(notifications);
    }
    
    @PatchMapping("/{id}")
    public ResponseEntity<Notification> updateNotificationStatus(
            @PathVariable("id") Long id, @RequestBody Map<String, String> statusMap) {
        String status = statusMap.get("status");
        Notification updatedNotification = service.updateNotificationStatus(id, status);
        if (updatedNotification != null) {
            return ResponseEntity.ok(updatedNotification);
        }
        return ResponseEntity.notFound().build();
    }
}

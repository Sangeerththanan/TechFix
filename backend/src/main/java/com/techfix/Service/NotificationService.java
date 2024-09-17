package com.techfix.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.techfix.Model.Notification;
import com.techfix.Repo.NotificationRepo;

@Service
public class NotificationService extends GenericService<Notification, Long>{
	@Autowired
    private NotificationRepo repo;

    // Method to get all notifications for a user
    public List<Notification> getNotificationsByUser(Long userId) {
        return repo.findByRecipientId(userId);
    }
    
 // Method to update the status of a notification
    public Notification updateNotificationStatus(Long id, String status) {
        Optional<Notification> optionalNotification = repo.findById(id);
        if (optionalNotification.isPresent()) {
            Notification notification = optionalNotification.get();
            notification.setStatus(status);
            return repo.save(notification);
        }
        return null; // Or throw an exception if preferred
    }
}

package com.techfix.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.techfix.Model.Notification;

@Repository
public interface NotificationRepo extends GenericRepo<Notification, Long> {
	// Custom query to find notifications by recipient ID
    @Query("SELECT n FROM Notification n WHERE n.recipient.id = ?1")
    public List<Notification> findByRecipientId(Long recipientId);
}

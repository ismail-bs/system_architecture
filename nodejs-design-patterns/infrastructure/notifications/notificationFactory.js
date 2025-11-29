/**
 * infrastructure/notifications/notificationFactory.js
 * Factory + Strategy patterns for notifications
 */
class EmailNotification {
    send(user, message) {
        console.log(`Email sent to ${user.email}: ${message}`);
    }
}

class SmsNotification {
    send(user, message) {
        console.log(`SMS sent to ${user.email}: ${message}`);
    }
}

class PushNotification {
    send(user, message) {
        console.log(`Push sent to ${user.email}: ${message}`);
    }
}

class NotificationFactory {
    static create(type) {
        switch(type) {
            case 'email': return new EmailNotification();
            case 'sms': return new SmsNotification();
            case 'push': return new PushNotification();
            default: return new EmailNotification();
        }
    }
}

module.exports = NotificationFactory;

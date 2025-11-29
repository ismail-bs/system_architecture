/**
 * infrastructure/notifications/legacyEmailAdapter.js
 * Adapter pattern: adapts legacy email system to current interface
 */
class LegacyEmailAdapter {
    send(user, message) {
        console.log(`Legacy Email Adapter: Sending email to ${user.email} with message: ${message}`);
    }
}

module.exports = LegacyEmailAdapter;

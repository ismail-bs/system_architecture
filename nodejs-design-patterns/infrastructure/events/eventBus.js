/**
 * infrastructure/events/eventBus.js
 * Observer pattern: emits events when things happen in domain
 */
const EventEmitter = require('events');
const eventBus = new EventEmitter();
module.exports = eventBus;

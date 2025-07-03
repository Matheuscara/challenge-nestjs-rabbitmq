"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const domain_error_1 = require("../errors/domain.error");
const notification_content_vo_1 = require("../value-objects/notification-content.vo");
const notification_id_vo_1 = require("../value-objects/notification-id.vo");
const notification_status_vo_1 = require("../value-objects/notification-status.vo");
class Notification {
    _id;
    _content;
    _status;
    _timestamp;
    constructor(id, content, status, timestamp) {
        this._id = id;
        this._content = content;
        this._status = status;
        this._timestamp = timestamp;
        this.validate();
    }
    static create(content) {
        return new Notification(notification_id_vo_1.NotificationId.create(), notification_content_vo_1.NotificationContent.create(content), notification_status_vo_1.NotificationStatus.awaiting(), new Date());
    }
    static createWithId(id, content) {
        return new Notification(notification_id_vo_1.NotificationId.create(id), notification_content_vo_1.NotificationContent.create(content), notification_status_vo_1.NotificationStatus.awaiting(), new Date());
    }
    validate() {
        if (!(this._timestamp instanceof Date)) {
            throw new domain_error_1.DomainError("Timestamp inválido.");
        }
        if (this._timestamp.getTime() > Date.now()) {
            throw new domain_error_1.DomainError("Timestamp não pode ser no futuro.");
        }
    }
    markSuccess() {
        this._status = notification_status_vo_1.NotificationStatus.success();
    }
    markFailure() {
        this._status = notification_status_vo_1.NotificationStatus.failure();
    }
    get id() {
        return this._id.value;
    }
    get content() {
        return this._content.value;
    }
    get status() {
        return this._status.value;
    }
    get timestamp() {
        return this._timestamp;
    }
}
exports.Notification = Notification;
//# sourceMappingURL=notification.entity.js.map
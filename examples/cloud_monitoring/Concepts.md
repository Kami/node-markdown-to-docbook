# Concepts

## Monitoring Key Terms and Concepts

### Entity

In Rackspace Cloud Monitoring, an entity is the object or resource that you want to monitor. It can be any object or device that you want to monitor. It's commonly a web server, but it might also be a website, a web page or a web service.

When you create an entity, you'll specify characteristics that describe what you are monitoring. At a minimum you must specify a name for the entity. The name is a user-friendly label or description that helps you identify the resource. You can also specify other attributes of the entity, such the entity's IP address, and any meta data that you'd like to associate with the entity.

### Check

Once you've created an entity, you can configure one or more checks for it. A check is the foundational building block of the monitoring system, and is always associated with an entity. The check specifies the parts or pieces of the entity that you want to monitor, the monitoring frequency, how many monitoring zones are launching the check, and so on. Basically it contains the specific details of how you are monitoring the entity.

You can associate one or more checks with an entity. An entity must have at least one check, but by creating multiple checks for an entity, you can monitor several different aspects of a single resource.

For each check you create within the monitoring system, you'll designate a check type. The check type tells the monitoring system which method to use, PING, HTTP, SMTP, and so on, when investigating the monitored resource. Rackspace Cloud Monitoring check types are fully described here.

Note that if something happens to your resource, the check does not trigger a notification action. Instead, notifications are triggered by alarms that you create separately and associate with the check.

### Monitoring Zones

When you create a check, you specify which monitoring zone(s) you want to launch the check from. A monitoring zone is the point of origin or "launch point" of the check. This concept of a monitoring zone is similar to that of a datacenter, however in the monitoring system, you can think of it more as a geographical region.

You can launch checks for a particular entity from multiple monitoring zones. This allows you to observe the performance of an entity from different regions of the world. It is also a way to prevent false alarms. For example, if the check from one monitoring zone reports that an entity is down, a second or third monitoring zone might report that the entity is up and running. This gives you a better picture of an entity's overall health.

### Collectors

A collector collects data from the monitoring zone and is mapped directly to an individual machine or a virtual machine. Monitoring zones contain many collectors, all of which will be within the IP address range listed in the response. Note that there may also be unallocated IP addresses or unrelated machines within that IP address range.

### Alarms

An alarm contains a set of rules that determine when the monitoring system sends a notification. You can create multiple alarms for the different checks types associated with an entity. For example, if your entity is a web server that hosts your company's website, you can create one alarm to monitor the server itself, and another alarm to monitor the website.

The alarms language provides you with scoping parameters that let you pinpoint the value that will trigger the alarm. The scoping parameters are inherently flexible, so that you can set up multiple checks to trigger a single alarm. The alarm language supplies an adaptable triggering system that makes it easy for you to define different formulas for each alarm that monitors an entity's uptime. To learn how to use the alarm language to create robust monitors, see Alert Triggering and Alarms.

### Notifications

A notification is an informational message that you receive from the monitoring system when an alarm is triggered. You can set up notifications to alert a single individual or an entire team. Rackspace Cloud Monitoring currently supports webhooks and email for sending notifications.

### Notification Plans

A notification plan contains a set of notification rules to execute when an alarm is triggered. A notification plan can contain multiple notifications for each of the following states:

* Critical
* Warning
* Ok

### Id

All objects in the monitoring system are identified by a uniquely generated Id, consisting of a two-character type prefix followed by a string of alphanumeric characters. You'll use an object's id when you want to perform certain operations on it. For example, when you want to create a check and associate it to an entity, you'll need to know the entity's id.

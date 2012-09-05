# Service API Operations

## Account

### Summary

An account contains attributes describing a customer's account. This description contains mostly read only data; however, a few properties can be modified with the API.

### Get Account

This endpoint returns information about your account.

Verb | URI | Description
---- | --- | -----------
GET | /account | Returns account information

There are no parameters for this call.

Normal Response Code: 200

Error Response Codes: 401, 403, 500, 503

#### Get Account Response: XML

```xml
<?xml version="1.0" encoding="utf-8"?>
<account>
  <metadata>
    <key>aValue</key>
  </metadata>
  <webhook_token>token12345</webhook_token>
</account>
```

#### Get Account Response: JSON

```javascript
{
    "metadata": {
        "key": "aValue"
    },
    "webhook_token": "token12345"
}
```

### Update Account

### Get Limits

This endpoint returns resource and rate limits that apply to your account.

### List Audits

Rackspace Cloud Monitoring records every write operation in an audit. See Audits for more information on how audits are recorded.

Audits are accessible as a Time Series Collection. By default the API queries the last 7 days of audit information.

## Entities

### Summary

An entity is the target of what you are monitoring. For example, you can create an entity to monitor your website, a particular web service, or your Rackspace server or server instance. Note that an entity represents only one item in the monitoring system. For example, if you wanted to monitor each server in a cluster, you would create an entity for each of the servers. You would not create a single entity to represent the entire cluster.

An entity can have multiple checks associated with it. This allows you to check multiple services on the same host by creating multiple checks on the same entity, instead of multiple entities each with a single check.

When you create a new entity in the monitoring system, you specify the follow parameters:

* A meaningful name for the entity
* The IP address(es) for the entity (optional)
* The meta-data that the monitoring system uses if an alarm is triggered (optional)

These parameters are further described in Attributes. See [Create Entities](#create-entity) for an example of how to create an entity.

### Create Entity

Verb | URI | Description
---- | --- | -----------
POST | /entities| Creates a new entity. Specify the entity's characteristics using a valid set of parameters from the table shown in the Attributes section above.

Normal Response Code: (201) 'Location' header contains a link to the newly created entity.

Error Response Codes: 400, 401, 403, 500, 503

Once you have created an entity, you will typically create a check for it. See Create Check.

#### Entity Create Request: XML

```xml
<?xml version="1.0" encoding="utf-8"?>
<entity>
  <label>Brand New Entity</label>
  <ip_addresses>
    <default>127.0.0.4</default>
    <b>127.0.0.5</b>
    <c>127.0.0.6</c>
    <test>127.0.0.7</test>
  </ip_addresses>
  <metadata>
    <all>kinds</all>
    <of>stuff</of>
    <can>go</can>
    <here>null is not a valid value</here>
  </metadata>
</entity>
```

#### Entity Create Request: JSON

```javascript
{
    "label": "Brand New Entity",
    "ip_addresses": {
        "default": "127.0.0.4",
        "b": "127.0.0.5",
        "c": "127.0.0.6",
        "test": "127.0.0.7"
    },
    "metadata": {
        "all": "kinds",
        "of": "stuff",
        "can": "go",
        "here": "null is not a valid value"
    }
}
```

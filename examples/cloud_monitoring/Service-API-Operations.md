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

### Update Account

### Get Limits

This endpoint returns resource and rate limits that apply to your account.

### List Audits

Rackspace Cloud Monitoring records every write operation in an audit. See Audits for more information on how audits are recorded.

Audits are accessible as a Time Series Collection. By default the API queries the last 7 days of audit information.

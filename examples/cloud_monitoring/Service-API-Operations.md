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

```xml label="Get Account Response: XML" file="partials/get_accounts.xml"
<?xml version="1.0" encoding="utf-8"?>
<account>
  <metadata>
    <key>aValue</key>
  </metadata>
  <webhook_token>token12345</webhook_token>
</account>
```

```json label="Get Account Response: JSON" file="partials/get_accounts.json"
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

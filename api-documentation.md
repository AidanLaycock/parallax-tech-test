# API Documentation

All api endpoints require authentication via API key, please see above to generate a new key. API keys should be sent as part of the `Authorization` header in your request.

## Devices api

The following is the device schema that is returned/can be passed to the following API's.

```javascript
{
    "id": number,
    "name": string,
    "address": string,
    "longitude": float,
    "latitude": float,
    "device_type": string,
    "manufacturer": string,
    "model": string,
    "install_date": datetime,
    "note": string,
    "eui": string,
    "serial_number": string,
    "created_at": datetime,
    "updated_at": datetime,
    "import_id": number
},
```

### Get Devices

The `/api/device` provides a paginated list of all of the devices that are currently stored in the database. It returns a subset of 50 devices per page, along with information on pagination and where to request additional devices.

#### Request

```http
GET /api/device
```

#### Response

The `/api/device` api provides the following data:

```javascript
{
    "devices": {
        "data": [
            {
                // Device Data
            }
            // ... 
        ],
        "current_page": number,
        "total": number,
        "links": [ 
            // array of links to previews, other pages and next,
        ],
    }
}
```

### Get Single Device

The `/api/device/{id}` provides data on a single device.

#### Request

```http
GET /api/device/{id}
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `id` | `number` | **Required**. The id of the device you want to retrieve. |

#### Response

The `/api/device/{id}` api provides the following data:

```javascript
{
    "device": {
        // Device data
}
```


### Create new Device

You are able to create a new device with the API below.

#### Request

```http
POST /api/device
```

You can send device data via the API to create a new device. See the device schema at the top of this documentation to see what data should be sent.

#### Response

The create api provides the following response when successful:

```javascript
{
    "Device created successfully!"
}
```

### Update Device

The update api updates a single device.

#### Request

```http
PATCH /api/device/{id}
```

You can send device data via the API to update a device. See the device schema at the top of this documentation to see what data should be sent.

*Please note that the id is not required within the request body as the URI is used to locate the correct device to update.*

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `id` | `number` | **Required**. The id of the device you want to update. |

#### Response

The update `/api/device/{id}` api provides the following data in the response:

```javascript
{
    "device": {
        // Device data
}
```
### Delete a Device

You are able to delete a device with the API below.

#### Request

```http
DELETE /api/device/{id}
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `id` | `number` | **Required**. The id of the device you want to delete. |

#### Response

The delete api provides the following response when successful:

```javascript
{
    "Device deleted successfully!"
}
```



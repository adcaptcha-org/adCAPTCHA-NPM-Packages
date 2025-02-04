# adCAPTCHA Node

This package provides a Node.js client for interacting with the adCAPTCHA API. It allows you to easily integrate adCAPTCHA’s verification and media management functionalities into your Node.js applications.

## Key Features

- **Site Management**: Create, update, delete, and fetch sites.
- **Media Management**: Upload, fetch, and manage media files for your sites.
- **Verification**: Verify tokens returned from successful CAPTCHA completions.
- **Placements API**: Manage placements associated with sites.

## Getting Started

To use this package, you'll need to:

1. Create an account on the **adCAPTCHA** platform.
2. Generate an API key.
3. Use the API key to authenticate requests in your Node.js application.

## Usage

#### API Key
The API Key is your secret key that you will need for the verification step to work. To obtain your API Key, you will need to generate one from the [AdCAPTCHA dashboard](https://app.adcaptcha.com/login). 

[Documentation](https://docs.adcaptcha.com/wordpress) to learn how to create an API Key.

#### Token
The token is exposed when the captcha has successfully been solved. [Example](/packages/react/README.md) how to get the success token. 

## Installation

```bash
npm install @adcaptcha/node
```

### 🚀 API Usage

After installing @adcaptcha/node, you need to import the AdCaptchaAPIClient from the package. Then, create an instance of the client using your API key. This instance will allow you to interact with the adCAPTCHA API and access its various features.

```typescript
const { AdCaptchaAPIClient } = require('@adcaptcha/node');
const client = new AdCaptchaAPIClient(YOUR_API_KEY); 
//YOUR_API_KEY Do not store in your code, should be kept secret (e.g. environment variables).
```

Below are the available API endpoints. Click on a category to expand and see specific API methods.

## Example Usage 📖

<details>
  <summary>&nbsp;<strong>Verify</strong></summary>

  <details>
    <summary>&nbsp;&nbsp;&nbsp;• Verify Token</summary>

### Request
```typescript
const result = await client.verify.verifyToken("Valid Token");
```

### Definitions

| Parameter | Type   | Required | Default | Description                     |
|-----------|--------|----------|---------|---------------------------------|
| token     | string | ✅ Yes   | -       | Token value.                    |

### Response
```json
{
    "status": "ok",
    "data": { "code": 200, "message": "Token verified" }
}
```

## Response from verify

| Status Code | Message               | 
|-------------|-----------------------|
| 200         | Token verified        |
| 400         | Token missing         |
| 400         | Invalid token         |
| 400         | Token already verified|

  </details>
</details>

<details>
  <summary>&nbsp;<strong>Sites</strong></summary>

  <details>
    <summary>&nbsp;&nbsp;&nbsp;• Fetch All</summary>

### Request
```typescript
const result = await client.sites.fetchAll();
```

### Definitions
 | Parameter  | Type    | Required | Default | Description               |
|------------|--------|----------|---------|---------------------------|
| page      | number | ❌ No     | 1       | Page number for pagination. |
| pageSize  | number | ❌ No     | 25      | Number of items per page.  |

### Response
```json
{
    "items": [
        {
            "id": "YOUR_SITE_ID",
            "name": "YOUR_SITE_NAME",
            "url": "",
            "createdAt": "2025-01-17T11:45:21.951Z",
            "updatedAt": "2025-01-17T11:45:21.951Z",
            "stats": {
                "totalLiveMedia": 0,
                "totalPlacement": 2,
                "last30daysHumanVerifiedCaptchas": {
                    "name": "adsSeenByConfirmedHumans",
                    "data": []
                }
            }
        }
    ],
    "meta": {
        "totalCount": 3,
        "page": 1,
        "pageSize": 25
    }
}
```
  </details>

   <details>
    <summary>&nbsp;&nbsp;&nbsp;• Fetch By ID</summary>

### Request
```typescript
const result = await client.sites.fetchByID("STE-YOUR_SITE_ID");
```

### Definitions

| Parameter | Type   | Required | Default | Description                                                         |
|-----------|--------|----------|---------|---------------------------------------------------------------------|
| id        | string | ✅ Yes   | -       | The ID of the site to fetch from the database.                      |

### Response
```json
{
  "id": "STE-YOUR_SITE_ID",
  "name": "YOUE_SITE_NAME",
  "url": "https://your-site-url.com",
  "createdAt": "2025-01-17T11:47:55.496Z",
  "updatedAt": "2025-01-17T11:47:55.496Z",
  "stats": {
    "totalLiveMedia": 2,
    "totalPlacement": 2,
    "last30daysHumanVerifiedCaptchas": { "name": "adsSeenByConfirmedHumans", "data": [] }
  }
}
```

  </details>

  <details>
    <summary>&nbsp;&nbsp;&nbsp;• Fetch Stats For Site</summary>

### Request
```typescript
const result = await client.sites.fetchStatsForSite("STE-YOUR_SITE_ID", "7");
```

### Definitions

| Parameter      | Type                  | Required | Default | Description                                                                 |
|----------------|-----------------------|----------|---------|-----------------------------------------------------------------------------|
| id             | string                | ✅ Yes   | -       | The unique identifier of the site whose stats need to be fetched.           |
| dateRange      | string                | ✅ Yes   | -       | The number of days from the current day for which the stats should be fetched. |

### Response
```json
{
  "name": "Status by day",
  "data": [
    {
      "date": "2025-01-29T15:33:15.932Z",
      "correct": 0,
      "incorrect": 0,
      "unanswered": 0,
      "skipped": 0,
      "closed": 0
    }
  ]
}
```
  </details>

  <details>
    <summary>&nbsp;&nbsp;&nbsp;• Create Site</summary>

### Request
```typescript
const result = await client.sites.createSite("Your Site Name", "https://your-site-url.com");
```

### Definitions

| Parameter      | Type                  | Required | Default | Description                                                                 |
|----------------|-----------------------|----------|---------|-----------------------------------------------------------------------------|
| siteName       | string                | ✅ Yes   | -       | The name of the site to be created.                                          |
| siteUrl        | string                | ✅ Yes   | -       | The URL of the site to be created.                                           |


### Response
```json
{
  "id": "STE-YOUR_SITE_ID",
  "name": "Your Site Name",
  "url": "https://your-site-url.com",
  "createdAt": "2025-01-30T15:41:35.936Z",
  "updatedAt": "2025-01-30T15:41:35.936Z",
  "stats": {
    "totalLiveMedia": 0,
    "totalPlacement": 0,
    "last30daysHumanVerifiedCaptchas": { "name": "adsSeenByConfirmedHumans", "data": [] }
  }
}
```
  </details>

  <details>
    <summary>&nbsp;&nbsp;&nbsp;• Update Site</summary>

### Definitions

### Request
```typescript
const result = await client.sites.updateSite("STE-YOUR_SITE_ID", "Updated Site Name", "https://updated-site-url.com");
```

| Parameter      | Type                  | Required | Default | Description                                                                 |
|----------------|-----------------------|----------|---------|-----------------------------------------------------------------------------|
| siteID         | string                | ✅ Yes   | -       | The ID of the site to be updated.                                           |
| siteName       | string                | ✅ Yes   | -       | The new name for the site to be updated.                                    |
| siteUrl        | string                | ✅ Yes   | -       | The new URL for the site to be updated.                                     |

### Response
```json
{
  "id": "TE-YOUR_SITE_ID",
  "name": "Updated Site Name",
  "url": "https://updated-site-url.com",
  "createdAt": "2025-01-17T11:47:55.496Z",
  "updatedAt": "2025-01-30T16:08:03.296Z",
  "stats": {
    "totalLiveMedia": 2,
    "totalPlacement": 2,
    "last30daysHumanVerifiedCaptchas": { "name": "adsSeenByConfirmedHumans", "data": [] }
  }
}
```
  </details>

  <details>
    <summary>&nbsp;&nbsp;&nbsp;• Delete Site</summary>

### Request
```typescript
const result = await client.sites.deleteSite("STE-YOUR_SITE_ID");
```

### Definitions

| Parameter      | Type                  | Required | Default | Description                                                                 |
|---------------|-----------------------|----------|---------|-----------------------------------------------------------------------------|
| id            | string                | ✅ Yes   | -       | The ID of the site to be deleted.                                           |

### Response
```json
{
  "status": "ok",
  "data": true
}
```
  </details>

</details>

<details>
  <summary>&nbsp;<strong>Media</strong></summary>

  <details>
    <summary>&nbsp;&nbsp;&nbsp;• Fetch Query</summary>
    
### Request
```typescript
const filters = {
      status: 'live',  
      siteID: "STE-YOUR_SITE_ID",
    };
const result = await client.media.query(filters, 1);
```

### Definitions

| Parameter      | Type                                    | Required | Default | Description                                                               |
|---------------|----------------------------------------|----------|---------|-----------------------------------------------------------------------------|
| filters       | object                                  | ✅ Yes   | -       | An object containing filter parameters for the query.                      |
| status        | string                                  | ✅ Yes   | -       | The status of the media to filter by. 'archived' or 'live' or 'pending'     |
| siteID        | string                                  | ❌ No    | -       | The ID of the site to filter media for.                                    |
| page          | number                                  | ✅ Yes   | 1       | The page number for pagination.                                            |
| pageSize      | number                                  | ❌ No    | 24      | The number of media items per page. Defaults to an API-defined value.      |

### Response
```json
{
    "items": [
        {
            "id": "MDA-YOUR_MEDIA_ID",
            "name": "YOUR_SITE_NAME",
            "type": "image",
            "keywords": [],
            "sites": [],
            "createdAt": "2025-01-27T09:11:21.066Z",
            "updatedAt": "2025-01-31T10:37:15.329Z",
            "archivedAt": null,
            "scheduleStartAt": null,
            "scheduleEndAt": "2025-12-31T23:59:59.000Z",
            "state": "live",
            "metadata": {}
        }
    ],
    "meta": {
        "totalCount": 1,
        "page": 1,
        "pageSize": 24
    }
}
```
  </details>

  <details>
    <summary>&nbsp;&nbsp;&nbsp;• Fetch All</summary>
    
### Request
```typescript
const result = await client.media.fetchAll();
```

### Definitions

| Parameter         | Type                                    | Required | Default | Description                                                               |
|------------------|----------------------------------------|----------|---------|-----------------------------------------------------------------------------|
| page            | number                                  | ❌ No    | 1       | The page number for pagination.                                             |
| selectedFilters | array                                   | ❌ No    | -       | An array of filter strings to apply to the media query.                     |
| pageSize        | number                                  | ❌ No    | 24       | The number of media items per page. Defaults to an API-defined value.      |

### Response

```json
{
    "items": [
        {
            "id": "MDA-YOUR_MEDIA_ID",
            "name": "YOUR_SITE_NAME",
            "type": "image",
            "keywords": [],
            "sites": [],
            "createdAt": "2025-01-27T09:11:21.066Z",
            "updatedAt": "2025-01-31T10:37:15.329Z",
            "archivedAt": null,
            "scheduleStartAt": null,
            "scheduleEndAt": "2025-12-31T23:59:59.000Z",
            "state": "live",
            "metadata": {}
        }
    ],
    "meta": {
        "totalCount": "2",
        "page": 1,
        "pageSize": 24
    }
}
```

  </details>

  <details>
    <summary>&nbsp;&nbsp;&nbsp;• Fetch By ID</summary>

### Request
```typescript
const result = await client.media.fetchByID("MDA-YOUR_MEDIA_ID");
```

### Definitions

| Parameter | Type   | Required | Default | Description                                         |
|-----------|--------|----------|---------|-----------------------------------------------------|
| id        | string | ✅ Yes   | -       | The unique identifier of the media item to be fetched. |

### Response

```json
{
  "id": "MDA-YOUR_MEDIA_ID",
  "name": "YOUR_SITE_NAME",
  "type": "image",
  "keywords": [],
  "sites": [],
  "createdAt": "2025-01-23T10:15:09.904Z",
  "updatedAt": "2025-01-24T11:17:58.012Z",
  "archivedAt": "2025-01-24T11:17:58.012Z",
  "scheduleStartAt": null,
  "scheduleEndAt": null,
  "state": "archived",
  "metadata": {
    "width": 600,
    "height": 338,
    "thumbnailURL": "https://adcaptcha-dev-vas-assets-cdn.s3.eu-west-2.amazonaws.com/media/images/MDA-YOUR_MEDIA_ID.jpg"
  }
}
```
  </details>

  <details>
    <summary>&nbsp;&nbsp;&nbsp;• Fetch All Archived</summary>

### Request
```typescript
const result = await client.media.fetchAllArchived();
```

### Definitions

| Parameter | Type   | Required | Default | Description                                       |
|-----------|--------|----------|---------|---------------------------------------------------|
| page      | number | ❌ No    | 1       | The page number for paginated results.           |
| pageSize  | number | ❌ No    | 24      | The number of items per page (optional).         |

### Response

```json
{
  "items": [
    {
      "id": "MDA-YOUR_MEDIA_ID",
      "name": "YOUR_SITE_NAME",
      "type": "image",
      "keywords": [],
      "sites": [],
      "createdAt": "2025-01-27T08:56:06.743Z",
      "updatedAt": "2025-01-27T09:12:17.358Z",
      "archivedAt": "2025-01-27T09:12:17.358Z",
      "scheduleStartAt": null,
      "scheduleEndAt": null,
      "state": "archived",
      "metadata": {}
    }
  ],
  "meta": { "totalCount": 8, "page": 1, "pageSize": 24 }
}
```
  </details>

  <details>
    <summary>&nbsp;&nbsp;&nbsp;• Create Media</summary>

### Request

```typescript
const mediaFile = await createFileFromAsset('./assets/your-media-file.webp'); 
const result = await client.media.createMedia(
  mediaFile,
  ['STE-YOUR_SITE_ID'],
  ['Tag1', 'Tag2'],
  new Date('2025-01-01T00:00:00Z'),
  new Date('2025-12-31T23:59:59Z')
);
```

### Definitions

| Parameter       | Type          | Required | Default | Description                                      |
|----------------|--------------|----------|---------|--------------------------------------------------|
| mediaFile      | File         | ✅ Yes   | -       | The media file to be uploaded.                  |
| siteIDs        | string[]     | ❌ No    | []      | An array of site IDs associated with the media. |
| keywords       | string[]     | ❌ No    | []      | An array of keywords for tagging the media.     |
| scheduleStartAt | Date \| null | ❌ No    | null    | The scheduled start date for the media.         |
| scheduleEndAt  | Date \| null | ❌ No    | null    | The scheduled end date for the media.           |

### Response

```json
{
    "status": "ok",
    "data": {
        "id": "MDA-YOUR_MEDIA_ID",
        "name": "YOUR_SITE_NAME",
        "type": "image",
        "keywords": ["keyword1", "keyword2"],
        "sites": [],
        "createdAt": "2025-01-31T15:09:17.897Z",
        "updatedAt": "2025-01-31T15:09:17.897Z",
        "archivedAt": null,
        "scheduleStartAt": "2025-01-01T00:00:00.000Z",
        "scheduleEndAt": "2025-12-31T23:59:59.000Z",
        "state": "pending",
        "metadata": {}
    }
}
```
  </details>

<details>
    <summary>&nbsp;&nbsp;&nbsp;• Unarchive Media</summary>

### Request
```typescript
const result = await client.media.unarchiveMedia("MDA-YOUR_MEDIA_ID");
```

### Definitions

| Parameter  | Type   | Required | Default | Description                           |
|-----------|--------|----------|---------|---------------------------------------|
| mediaID   | string | ✅ Yes   | -       | The unique identifier of the media to unarchive. |

### Response

```json
{ "status": "ok", "data": true }
```
  </details>

  <details>
    <summary>&nbsp;&nbsp;&nbsp;• Update Media</summary>

### Request
```typescript
const result = await client.media.updateMedia(
  "MDA-YOUR_MEDIA_ID",
  "Updated Media Name",
  "CUSTOMER-123",
  ["STE-YOUR_SITE_ID"],
  [],
  null,
  null
);
```

### Definitions

| Parameter       | Type          | Required | Default | Description                                      |
|----------------|--------------|----------|---------|--------------------------------------------------|
| mediaID        | string       | ✅ Yes   | -       | The unique identifier of the media to update.   |
| mediaName      | string       | ✅ Yes   | -       | The new name of the media.                      |
| customerID     | string       | ✅ Yes   | -       | The customer ID associated with the media.      |
| siteIDs        | string[]     | ❌ No    | []      | An array of site IDs linked to the media.       |
| keywords       | string[]     | ❌ No    | []      | An array of keywords for tagging the media.     |
| scheduleStartAt | Date \| null | ❌ No    | null    | The scheduled start date for the media.         |
| scheduleEndAt  | Date \| null | ❌ No    | null    | The scheduled end date for the media.           |

  ### Response

  ```json
  {
    "id": "MDA-YOUR_MEDIA_ID",
    "name": "Minimal Media Update",
    "type": "image",
    "keywords": [],
    "sites": [ { "id": "STE-YOUR_SITE_ID", "name": "YOUR_SITE_NAME" } ],
    "createdAt": "2025-01-31T15:09:17.897Z",
    "updatedAt": "2025-01-31T15:16:17.595Z",
    "archivedAt": null,
    "scheduleStartAt": null,
    "scheduleEndAt": null,
    "state": "live",
    "metadata": {
      "width": 600,
      "height": 338,
      "thumbnailURL": "https://d3exd71ujqzz3u.cloudfront.net/media/images/MDA-YOUR_MEDIA_ID.jpg"
    }
  }
```

</details>
  <details>
    <summary>&nbsp;&nbsp;&nbsp;• Delete Media</summary>

#### API Reference

### Request
```typescript
const result = await client.media.deleteMedia("MDA-YOUR_MEDIA_ID");
```

### Definitions

| Parameter | Type   | Required | Default | Description                           |
|----------|--------|----------|---------|---------------------------------------|
| id       | string | ✅ Yes   | -       | The unique identifier of the media to delete. |

### Response

```json
{ "status": "ok", "data": true }
```
  </details>
</details>

<details>
  <summary>&nbsp;<strong>Placements</strong></summary>

  <details>
    <summary>&nbsp;&nbsp;&nbsp;• Fetch All</summary>

### Request
```typescript
const result = await client.placements.fetchAll(1);
```

### Definitions

| Parameter | Type   | Required | Default | Description                           |
|----------|--------|----------|---------|---------------------------------------|
| page     | number | ✅ Yes   | -       | The page number for pagination.       |

### Response

```json
{
  "items": [
    {
      "id": "PLC-YOUR_PLACEMENT_ID",
      "name": "Updated Placement Name",
      "siteID": "STE-YOUR_SITE_ID",
      "createdAt": "2025-01-17T11:45:21.952Z",
      "updatedAt": "2025-01-17T21:37:02.923Z"
    }
  ],
  "meta": { "totalCount": 4, "page": 1, "pageSize": 25 }
}
```
  </details>

  <details>
    <summary>&nbsp;&nbsp;&nbsp;• Fetch By ID</summary>

### Request
```typescript
const result = await client.placements.fetchByID("PLC-YOUR_PLACEMENT_ID");
```

### Definitions

| Parameter | Type   | Required | Default | Description               |
|----------|--------|----------|---------|---------------------------|
| id       | string | ✅ Yes   | -       | The ID of the placement.  |

### Response

```json
{
  "id": "PLC-YOUR_PLACEMENT_ID",
  "name": "YOUR Placement NAME",
  "siteID": "STE-YOUR_SITE_ID",
  "createdAt": "2025-01-24T11:34:33.754Z",
  "updatedAt": "2025-01-24T11:36:04.291Z"
}
```
  </details>
  
  <details>
    <summary>&nbsp;&nbsp;&nbsp;• Fetch All Placements for Site</summary>
    
### Request
```typescript
const result = await client.placements.fetchAllForSite("STE-YOUR_SITE_ID", 1, 4);
```

### Definitions

| Parameter  | Type    | Required | Default | Description                           |
|------------|---------|----------|---------|---------------------------------------|
| siteID     | string  | ✅ Yes   | -       | The ID of the site to fetch placements for. |
| page       | number  | ❌ No    | 1       | The page number for pagination.       |
| pageSize   | number  | ❌ No    | 24      | The number of placements per page.    |

### Response

```json
{
  "items": [
    {
      "id": "PLC-YOUR_PLACEMENT_ID",
      "name": "YOUR PLACEMENT NAME",
      "siteID": "STE-YOUR_SITE_ID",
      "createdAt": "2025-01-24T11:34:33.754Z",
      "updatedAt": "2025-01-24T11:36:04.291Z"
    }
  ],
  "meta": { "totalCount": 2, "page": 1, "pageSize": 4 }
}
```
  </details>

  <details>
    <summary>&nbsp;&nbsp;&nbsp;• Create Placement</summary>

### Request
```typescript
const result = await client.placements.createPlacement("Your Placement Name", "STE-YOUR_SITE_ID");
```

### Definitions

| Parameter | Type    | Required | Default | Description                             |
|-----------|---------|----------|---------|-----------------------------------------|
| name      | string  | ✅ Yes   | -       | The name of the placement to be created. |
| siteID    | string  | ✅ Yes   | -       | The ID of the site where the placement will be created. |

### Response

```json
{
  "id": "PLC-YOUR_PLACEMENT_ID",
  "name": "YOUR PLACEMENT NAME",
  "siteID": "STE-YOUR_SITE_ID",
  "createdAt": "2025-01-31T16:05:00.083Z",
  "updatedAt": "2025-01-31T16:05:00.083Z"
}
```

  </details>

  <details>
    <summary>&nbsp;&nbsp;&nbsp;• Update Placement</summary>

### Request
```typescript
const result = await client.placements.updatePlacement("PLC-YOUR_PLACEMENT_ID", "Updated Placement Name", "STE-YOUR_SITE_ID");
```

### Definitions

| Parameter      | Type    | Required | Default | Description                                 |
|----------------|---------|----------|---------|---------------------------------------------|
| placementID    | string  | ✅ Yes   | -       | The ID of the placement to be updated.      |
| placementName  | string  | ✅ Yes   | -       | The new name for the placement.             |
| siteID         | string  | ✅ Yes   | -       | The ID of the site where the placement exists. |

### Response

```json
{
  "id": "PLC-YOUR_PLACEMENT_ID",
  "name": "Updated Placement Name",
  "siteID": "STE-YOUR_SITE_ID",
  "createdAt": "2025-01-24T11:34:33.754Z",
  "updatedAt": "2025-01-31T16:09:24.870Z"
}
```
  </details>

  <details>
    <summary>&nbsp;&nbsp;&nbsp;• Delete Placement</summary>

### Request
```typescript
const result = await client.placements.deletePlacement("PLC-YOUR_PLACEMENT_ID", "STE-YOUR_SITE_ID");
```

### Definitions

| Parameter   | Type    | Required | Default | Description                                      |
|-------------|---------|----------|---------|--------------------------------------------------|
| id          | string  | ✅ Yes   | -       | The ID of the placement to be deleted.           |
| siteID      | string  | ✅ Yes   | -       | The ID of the site where the placement exists.   |

```json
{"status": "ok", "data": true}
```
  </details>
</details>

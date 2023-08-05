# Climbs

## Attributes

attribute | description | type | example
--- | --- | --- | ---
id | Climb ID | Integer | ``` 200 ``` 
boulderID | Boulder ID | Integer | ``` 3 ```
sessionId | Session ID | Integer | ``` 15 ```
attempts | # of attempts | Integer | ``` 4 ```
sends | # of sends | Integer | ``` 1 ```
climbStartDate | Date the climb was started | Date | ``` 2023-02-12T08:00:00.000Z ```
climbEndDate | Date the climb ended | Date | ``` 2023-02-12T08:00:00.000Z ```

## List a climb

This method returns the data for a single climb.

```
GET /climb/:id
```

### Status Codes

Code | description
--- | ---
200 | Successfully listed climb
400 | Error occurred
404 | Id not found

### Example

```
curl -X GET http://localhost:3001/climb/200
```

```
{
    "data": [
        {
            "id": 200,
            "boulderId": 0,
            "sessionId": 0,
            "attempts": 2,
            "sends": 1,
            "climbStartDate": "2023-02-12T08:00:00.000Z",
            "climbEndDate": "2023-02-12T08:00:00.000Z"
        }
    ]
}
```



## List all climbs

This method returns all climbs

```
GET /climb
```

### Status Codes

Code | description
--- | ---
200 | Successfully listed climbs
400 | Error occurred

### Example

```
curl -X GET http://localhost:3001/climb
```

```
{
    "data": [
        {
            "id": 200,
            "boulderId": 0,
            "sessionId": 0,
            "attempts": 2,
            "sends": 1,
            "climbStartDate": "2023-02-12T08:00:00.000Z",
            "climbEndDate": "2023-02-12T08:00:00.000Z"
        },
        {
            "id": 201,
            "boulderId": 0,
            "sessionId": 1,
            "attempts": 4,
            "sends": 0,
            "climbStartDate": "2023-02-12T08:00:00.000Z",
            "climbEndDate": "2023-02-12T08:00:00.000Z"
        },
        {
            "id": 202,
            "boulderId": 1,
            "sessionId": 1,
            "attempts": 10,
            "sends": 4,
            "climbStartDate": "2023-02-12T08:00:00.000Z",
            "climbEndDate": "2023-02-12T08:00:00.000Z"
        }
    ]
}
```

## Add climb

This method adds a climb

```
POST /climb
```

### Status Codes

Code | description
--- | ---
200 | Successfully add climb
400 | Error occurred

### Example

```
curl -d '{ "boulderId": 1, "sessionId": 2, "attempts": 1, "sends": 5, "climbStartTime": "2023-08-01T02:40:00.000Z", "climbEndTime": "2023-08-01T02:41:00.000Z" }' -H "Content-Type: application/json" -X POST http://localhost:3001/climb
```

```
{
    "data": [
        {
            "id": 18
        }
    ]
}
```

## Update boulder

This method adds a climb

```
PUT /climb/:id
```

### Status Codes

Code | description
--- | ---
200 | Successfully updated climb
202 | No data updated
400 | Error occurred
404 | Id not found

### Example

```
curl -d '{ "boulderId": 1, "sessionId": 2, "attempts": 1, "sends": 5, "climbStartTime": "2023-08-01T02:40:00.000Z", "climbEndTime": "2023-08-01T02:41:00.000Z" }' -H "Content-Type: application/json" -X PUT http://localhost:3001/climb/18
```

```
{
    "data": [
        {
            "id": 18
        }
    ]
}
```

## Delete climb

This method deletes a climb

```
DELETE /climb/:id
```

### Status Codes

Code | description
--- | ---
200 | Successfully deleted climb
400 | Error occurred
404 | Id not found

### Example

```
curl -X DELETE http://localhost:3001/climb/3
```

```
{
    "data": [
        {
            "id": 3
        }
    ]
}
```


# Boulder

### Attributes

attribute | description | type | example
--- | --- | --- | ---
id | Boulder ID | Integer | ``` 200 ``` 
gymId | Gym ID | Integer | ``` 3 ```
sessionId | Session ID | Integer | ``` 15 ```
colour | Boulder colour | String | ``` red ```
rating | Boulder rating | Integer | ``` 4 ```
holdType | Holds used in the boulder | String | ``` jug undercling volume ```
boulderType | Boulder type | String | ``` slab ```
sendAttempts | # of attempts | Integer | ``` 4 ```
description | Boulder description | String | ``` Fairly easy 4 ```
startDate | Date the boulder was started | Date | ``` 2023-02-12T08:00:00.000Z ```
sendDate | Date the boulder was sent, ``` null ``` if not sent | Date | ``` 2023-02-12T08:00:00.000Z ```

## List a boulder

This method returns the boulder data for a single boulder.

```
GET /boulder/:id
```

### Example

```
curl http://localhost:3001/boulder/200
```

```
{
    "id": 200,
    "gymId": 0,
    "sessionId": 0,
    "description": "Fairly easy 4",
    "rating": 4,
    "colour": "purple",
    "holdType": "jug mini-jug undercling volume",
    "boulderType": "overhang",
    "sendAttempts": 2,
    "startDate": "2023-02-12T08:00:00.000Z",
    "sendDate": "2023-02-12T08:00:00.000Z"
}
```

***TODO***

## List all boulders

```
GET /boulders
```

### Example

```
curl http://localhost:3001/boulder?%7B%22select%22%3A%5B%22rating%22%2C%22colour%22%2C%22holdType%22%2C%22boulderType%22%2C%22sendAttempts%22%2C%22startDate%22%2C%22sendDate%22%2C%22description%22%2C%22id%22%5D%2C%22where%22%3A%22%22%2C%22orderby%22%3A%5B%7B%22id%22%3A%22DESC%22%7D%5D%2C%22limit%22%3A%222%22%7D
```

```
[
    {
        "rating": 4,
        "colour": "black",
        "holdType": "crimp pinch volume",
        "boulderType": "overhang",
        "sendAttempts": 4,
        "startDate": "2023-04-15T07:00:00.000Z",
        "sendDate": "2023-04-15T07:00:00.000Z",
        "description": "Pistol squat finish relies on a lot of trust in the feet",
        "id": 554
    },
    {
        "rating": 4,
        "colour": "orange",
        "holdType": "sloper volume",
        "boulderType": "slab",
        "sendAttempts": 2,
        "startDate": "2023-04-15T07:00:00.000Z",
        "sendDate": null,
        "description": "Beta is to do a double catch move while moving to the right",
        "id": 553
    },
    {
        "rating": 4,
        "colour": "blue",
        "holdType": "horn pinch side-pull",
        "boulderType": "slab",
        "sendAttempts": 1,
        "startDate": "2023-04-15T07:00:00.000Z",
        "sendDate": "2023-04-15T07:00:00.000Z",
        "description": "Intended beta is a crack climb, but not doing it the crack way is much easier",
        "id": 552
    }
]

```

***TODO***
## Add boulder
```
POST /boulder
```

***TODO***
## Update boulder
```
PUT /boulder
```

## Delete boulder
```
Delete /boulder/:id
```

# Users

***TODO***
## List all users
```
GET /user
```

***TODO***
## Create a user
```
POST /user/:username/:password
```

***TODO***
## Change password of user
```
PUT /user/:username/:password
```

***TODO***
## Delete user
```
Delete /user/:username/:password
```

***TODO***
## Authenticate user
```
POST /user/:username/:password/signin
```

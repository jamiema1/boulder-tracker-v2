# Gyms

## Attributes

attribute | description | type | example
--- | --- | --- | ---
id | Gym ID | Integer | ``` 1 ``` 
name | Name of gym | String | ``` The Hive Bouldering Gym ```
address | Address of gym | String | ``` 520 Industrial Ave, Vancouver, BC, V6A 2P3 ```
city | City of Gym | String | ``` Vancouver ```

## List a gym

This method returns the data for a single gym.

```
GET /gym/:id
```

### Status Codes

Code | description
--- | ---
200 | Successfully listed gym
400 | Error occurred
404 | Id not found

### Example

```
curl -X GET http://localhost:3001/gym/1
```

```
{
    "data": [
        {
            "id": 1,
            "name": "The Hive Bouldering Gym",
            "address": "520 Industrial Ave, Vancouver, BC, V6A 2P3",
            "city": "Vancouver"
        }
    ]
}
```



## List all gym

This method returns all gyms

```
GET /gym
```

### Status Codes

Code | description
--- | ---
200 | Successfully listed gyms
400 | Error occurred

### Example

```
curl -X GET http://localhost:3001/gym
```

```
{
    "data": [
        {
            "id": 1,
            "name": "The Hive Bouldering Gym",
            "address": "520 Industrial Ave, Vancouver, BC, V6A 2P3",
            "city": "Vancouver"
        },
        {
            "id": 2,
            "name": "The Hive Surrey Climbing and Fitness",
            "address": "101 – B   11125 124 Street, Surrey, BC, V3V 4",
            "city": "Surrey"
        },
        {
            "id": 3,
            "name": "The Hive PoCo",
            "address": "Unit 145, 815 Village Drive, Port Coquitlam, ",
            "city": "Port Coquitlam"
        },
        {
            "id": 4,
            "name": "The Hive North Shore Climbing and Fitness",
            "address": "140 – 2270 Dollarton Hwy, North Vancouver, BC",
            "city": "North Vancouver"
        }
    ]
}
```

## List all gyms from a query

This method returns all gyms from an encoded URI SQL query

```
GET /gym/query/:query
```

### Status Codes

Code | description
--- | ---
200 | Successfully listed gyms
400 | Error occurred

### Example

```
curl -X GET http://localhost:3001/gym/query/%7B%22select%22%3A%5B%22id%22%2C%22name%22%2C%22address%22%2C%22city%22%5D%2C%22where%22%3A%22%22%2C%22orderby%22%3A%5B%7B%22id%22%3A%22DESC%22%7D%5D%2C%22limit%22%3A%222%22%7D
```

```
{
    "data": [
        {
            "id": 4,
            "name": "The Hive North Shore Climbing and Fitness",
            "address": "140 – 2270 Dollarton Hwy, North Vancouver, BC",
            "city": "North Vancouver"
        },
        {
            "id": 3,
            "name": "The Hive PoCo",
            "address": "Unit 145, 815 Village Drive, Port Coquitlam, ",
            "city": "Port Coquitlam"
        }
    ]
}
```

## Add gym

This method adds a gym

```
POST /gym
```

### Status Codes

Code | description
--- | ---
200 | Successfully add gym
400 | Error occurred

### Example

```
curl -d '{ "name": "New Gym", "address": "123 Test Street", "city": "Climbington" }' -H "Content-Type: application/json" -X POST http://localhost:3001/gym
```

```
{
    "data": [
        {
            "id": 21
        }
    ]
}
```

## Update gym

This method adds a gym

```
PUT /gym/:id
```

### Status Codes

Code | description
--- | ---
200 | Successfully updated gym
202 | No data updated
400 | Error occurred
404 | Id not found

### Example

```
curl -d '{ "name": "New Gym 2", "address": "123 Test Street", "city": "Climbington" }' -H "Content-Type: application/json" -X PUT http://localhost:3001/gym/21
```

```
{
    "data": [
        {
            "id": 21
        }
    ]
}
```

## Delete gym

This method deletes a gym

```
DELETE /gym/:id
```

### Status Codes

Code | description
--- | ---
200 | Successfully deleted gym
400 | Error occurred
404 | Id not found

### Example

```
curl -X DELETE http://localhost:3001/gym/21
```

```
{
    "data": [
        {
            "id": 21
        }
    ]
}
```

# Locations

## Attributes

attribute | description | type | example
--- | --- | --- | ---
id | Location ID | Integer | ``` 9 ``` 
gymId | Gym ID | Integer | ``` 2 ``` 
name | Name of gym | String | ``` Educational Wall ```

## List a location

This method returns the data for a single location.

```
GET /location/:id
```

### Status Codes

Code | description
--- | ---
200 | Successfully listed location
400 | Error occurred
404 | Id not found

### Example

```
curl -X GET http://localhost:3001/location/9
```

```
{
    "data": [
        {
            "id": 9,
            "gymId": 2,
            "name": "Educational Wall"
        }
    ]
}
```



## List all locations

This method returns all locations

```
GET /location
```

### Status Codes

Code | description
--- | ---
200 | Successfully listed locations
400 | Error occurred

### Example

```
curl -X GET http://localhost:3001/location
```

```
{
    "data": [
        {
            "id": 1,
            "gymId": 1,
            "name": "slab wall"
        },
        {
            "id": 2,
            "gymId": 2,
            "name": "cavessss"
        }
    ]
}
```

## List all locations from a query

This method returns all locations from an encoded URI SQL query

```
GET /location/query/:query
```

### Status Codes

Code | description
--- | ---
200 | Successfully listed locations
400 | Error occurred

### Example

```
curl -X GET http://localhost:3001/gym/query/%7B%22select%22%3A%5B%22id%22%2C%22gymId%22%2C%22name%22%5D%2C%22where%22%3A%22%22%2C%22orderby%22%3A%5B%7B%22id%22%3A%22DESC%22%7D%5D%2C%22limit%22%3A%222%22%7D
```

```
{
    "data": [
        {
            "id": 11,
            "gymId": 1,
            "name": "test"
        },
        {
            "id": 10,
            "gymId": 2,
            "name": "new location"
        }
    ]
}
```

## Add location

This method adds a location

```
POST /location
```

### Status Codes

Code | description
--- | ---
200 | Successfully add location
400 | Error occurred

### Example

```
curl -d '{ "gymId": 1, "name": "New Location" }' -H "Content-Type: application/json" -X POST http://localhost:3001/location
```

```
{
    "data": [
        {
            "id": 12
        }
    ]
}
```

## Update location

This method adds a location

```
PUT /location/:id
```

### Status Codes

Code | description
--- | ---
200 | Successfully updated location
202 | No data updated
400 | Error occurred
404 | Id not found

### Example

```
curl -d '{ "gymId": 1, "name": "New Location Two" }' -H "Content-Type: application/json" -X PUT http://localhost:3001/location/12
```

```
{
    "data": [
        {
            "id": "12"
        }
    ]
}
```

## Delete location

This method deletes a location

```
DELETE /location/:id
```

### Status Codes

Code | description
--- | ---
200 | Successfully deleted location
400 | Error occurred
404 | Id not found

### Example

```
curl -X DELETE http://localhost:3001/location/12
```

```
{
    "data": [
        {
            "id": 12
        }
    ]
}
```

# Boulders

## Attributes

attribute | description | type | example
--- | --- | --- | ---
id | Boulder ID | Integer | ``` 1 ``` 
locationId | Location ID | Integer | ``` 4 ```
rating | Rating of boulder | Integer | ``` 1 ```
colour | Colour of boulder | String | ``` Blue ```
boulderType | Type of boulder | String | ``` Slab ```
description | Description of boulder | String | ``` Very powerful moves ```
setStartDate | Date the boulder was set | Date | ``` 2023-10-07T07:00:00.000Z ```
setEndDate | Date the boulder was removed | Date | ``` 2023-10-07T07:00:00.000Z ```

## List a boulder

This method returns the data for a single boulder.

```
GET /boulder/:id
```

### Status Codes

Code | description
--- | ---
200 | Successfully listed boulder
400 | Error occurred
404 | Id not found

### Example

```
curl -X GET http://localhost:3001/boulder/15
```

```
{
    "data": [
        {
            "id": 15,
            "locationId": 14,
            "rating": 5,
            "colour": "Blue",
            "boulderType": "Overhang",
            "description": "Very tough start with complete horizontal for 5+ moves",
            "setStartDate": "2023-10-07T07:00:00.000Z",
            "setEndDate": "0000-00-00"
        }
    ]
}
```



## List all boulders

This method returns all boulders

```
GET /boulder
```

### Status Codes

Code | description
--- | ---
200 | Successfully listed boulders
400 | Error occurred

### Example

```
curl -X GET http://localhost:3001/boulder
```

```
{
    "data": [
        {
            "id": 11,
            "locationId": 13,
            "rating": 1,
            "colour": "Yellow",
            "boulderType": "Slab",
            "description": "Nice and easy warmup",
            "setStartDate": "2023-10-07T07:00:00.000Z",
            "setEndDate": "0000-00-00"
        },
        {
            "id": 12,
            "locationId": 13,
            "rating": 2,
            "colour": "Purple",
            "boulderType": "Slab",
            "description": "Interesting grape-like holds",
            "setStartDate": "2023-10-07T07:00:00.000Z",
            "setEndDate": "0000-00-00"
        }
    ]
}
```

## List all boulders from a query

This method returns all boulders from an encoded URI SQL query

```
GET /boulder/query/:query
```

### Status Codes

Code | description
--- | ---
200 | Successfully listed boulders
400 | Error occurred

### Example

```
curl -X GET http://localhost:3001/boulder/query/%7B%22select%22%3A%5B%22id%22%2C%22rating%22%2C%22colour%22%2C%22description%22%5D%2C%22where%22%3A%22%22%2C%22orderby%22%3A%5B%7B%22id%22%3A%22DESC%22%7D%5D%2C%22limit%22%3A%222%22%7D
```

```
{
    "data": [
        {
            "id": 34,
            "rating": -1,
            "colour": "Black",
            "description": ""
        },
        {
            "id": 32,
            "rating": 4,
            "colour": "Black",
            "description": "HARD"
        }
    ]
}
```

## Add boulder

This method adds a boulder

```
POST /boulder
```

### Status Codes

Code | description
--- | ---
200 | Successfully add boulder
400 | Error occurred

### Example

```
curl -d '{ "locationId": 21, "rating": 1, "colour": "Green", "boulderType": "Overhang", "description": "Tough start", "setStartDate": "2023-10-11", "setEndDate": "2023-10-11" }' -H "Content-Type: application/json" -X POST http://localhost:3001/boulder
```

```
{
    "data": [
        {
            "id": 37
        }
    ]
}
```

## Update boulder

This method adds a boulder

```
PUT /boulder/:id
```

### Status Codes

Code | description
--- | ---
200 | Successfully updated boulder
202 | No data updated
400 | Error occurred
404 | Id not found

### Example

```
curl -d '{ "locationId": 21, "rating": 6, "colour": "Blue", "boulderType": "Slab", "description": "Tough start", "setStartDate": "2023-10-11", "setEndDate": "2023-10-11" }' -H "Content-Type: application/json" -X PUT http://localhost:3001/boulder/37
```

```
{
    "data": [
        {
            "id": "37"
        }
    ]
}
```

## Delete boulder

This method deletes a boulder

```
DELETE /boulder/:id
```

### Status Codes

Code | description
--- | ---
200 | Successfully deleted boulder
400 | Error occurred
404 | Id not found

### Example

```
curl -X DELETE http://localhost:3001/boulder/37
```

```
{
    "data": [
        {
            "id": "37"
        }
    ]
}
```

# Climbs

## Attributes

attribute | description | type | example
--- | --- | --- | ---
id | Climb ID | Integer | ``` 200 ``` 
boulderID | Boulder ID | Integer | ``` 3 ```
sessionId | Session ID | Integer | ``` 15 ```
attempts | # of attempts | Integer | ``` 4 ```
sends | # of sends | Integer | ``` 1 ```
climbStartTime | Datetime the climb was started | DateTime | ``` 2023-02-12T08:00:00.000Z ```
climbEndTime | Datetime the climb ended | DateTime | ``` 2023-02-12T08:00:00.000Z ```

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
            "climbStartTime": "2023-02-12T08:00:00.000Z",
            "climbEndTime": "2023-02-12T08:00:00.000Z"
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
            "climbStartTime": "2023-02-12T08:00:00.000Z",
            "climbEndTime": "2023-02-12T08:00:00.000Z"
        },
        {
            "id": 201,
            "boulderId": 0,
            "sessionId": 1,
            "attempts": 4,
            "sends": 0,
            "climbStartTime": "2023-02-12T08:00:00.000Z",
            "climbEndTime": "2023-02-12T08:00:00.000Z"
        },
        {
            "id": 202,
            "boulderId": 1,
            "sessionId": 1,
            "attempts": 10,
            "sends": 4,
            "climbStartTime": "2023-02-12T08:00:00.000Z",
            "climbEndTime": "2023-02-12T08:00:00.000Z"
        }
    ]
}
```

## List all climbs from a query

This method returns all climbs from an encoded URI SQL query

```
GET /climb/query/:query
```

### Status Codes

Code | description
--- | ---
200 | Successfully listed climbs
400 | Error occurred

### Example

```
curl -X GET http://localhost:3001/climb/query/%7B%22select%22%3A%5B%22id%22%2C%22boulderId%22%2C%22sessionId%22%2C%22attempts%22%2C%22sends%22%2C%22climbStartTime%22%2C%22climbEndTime%22%5D%2C%22where%22%3A%22%22%2C%22orderby%22%3A%5B%7B%22id%22%3A%22DESC%22%7D%5D%2C%22limit%22%3A%222%22%7D
```

```
{
    "data": [
        {
            "id": 27,
            "boulderId": 1,
            "sessionId": 2,
            "attempts": 1,
            "sends": 4,
            "climbStartTime": "0000-00-00 00:00:00",
            "climbEndTime": "2023-08-01T09:41:00.000Z"
        },
        {
            "id": 26,
            "boulderId": 1,
            "sessionId": 2,
            "attempts": 1,
            "sends": 4,
            "climbStartTime": "0000-00-00 00:00:00",
            "climbEndTime": "2023-08-01T09:41:00.000Z"
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

## Update climb

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


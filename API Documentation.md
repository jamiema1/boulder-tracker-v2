
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

# Boulder

***TODO***

## List a boulder

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

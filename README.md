# tmg-api-test-uladzislau

## Table of Contents
- [tmg-api-test-uladzislau](#tmg-api-test-uladzislau)
  - [Table of Contents](#table-of-contents)
  - [API](#api)
    - [Add item to stack](#add-item-to-stack)
    - [Get item from stack](#get-item-from-stack)
    - [Add value to store](#add-value-to-store)
    - [Get value from store](#get-value-from-store)
    - [Delete value from store](#delete-value-from-store)
  - [Highlights](#highlights)


## API

### Add item to stack

Endpoint:
```
POST /stack
```

Body parameters:

| Field  | Type               | Details                   |
|--------|--------------------|---------------------------|
| `item` | `string`, `number` | Item to be added to stack |

Response: **201 Created**
```
{
  "message": "Item successfully added to the stack!"
}
```

### Get item from stack

_Requesting an item from the stack also removes that item from the top of the stack_

Endpoint:
```
GET /stack
```

Response: **200 OK**
```
{
  "item": "Hello"
}
```

Response: **404 Not Found**
```
{
  "message": "No items in the stack"
}
```

### Add value to store

Endpoint:
```
POST /store
```

Body parameters:

| Field   | Type               | Details                            |
|---------|--------------------|------------------------------------|
| `key`   | `string`           | Key                                |
| `value` | `string`, `number` | Value                              |
| `ttl`   | `number`           | (Optional) Time to live in seconds |

Response: **201 Created**
```
{
  "message": "Value successfully added to the store!"
}
```

### Get value from store

Endpoint:
```
GET /store/:key
```

Parameters:

| Field   | Type               | Details                                |
|---------|--------------------|----------------------------------------|
| `key`   | `string`           | Key                                    |

Response: **200 OK**
```
{
  "value": "Hello"
}
```

Response: **404 Not Found**
```
{
  "message": "No value found for key 'word' in the store",
  "value": null,
}
```

### Delete value from store

Endpoint:
```
DELETE /store/:key
```

Parameters:

| Field   | Type               | Details                                |
|---------|--------------------|----------------------------------------|
| `key`   | `string`           | Key                                    |

Response: **200 OK**
```
{
  "message": "Value 'Hello' successfully deleted from the store"
}
```

Response: **404 Not Found**
```
{
  "message": "No value found for key 'word' in the store",
}
```

## Highlights

For production code or a larger project, I wouldn’t import dependencies (services, controllers) directly; instead, I would use dependency injection. However, I believe that for this project, it would be overengineering.
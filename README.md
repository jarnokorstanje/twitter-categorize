# twitter-categorize

## Register new user

POST request to `/register`

JSON body:
```json
{
    "username": "<username>",
    "password": "<password>"
}
```

## Login for getting Bearer Token
    
POST request to `/login`

JSON body:
```json
{
    "username": "<username>",
    "password": "<password>"
}
```


## Example requests:

### Get all categories

POST request to `/graphql`

Body:
```graphql
{
  categories {
    id
    UserId
    Title
    Accounts {
      id
      Handle
    }
  }
}
```

### Get categories by user

POST request to `/graphql`

Body:
```graphql
{
  categories(userId: "<userId>") {
    id
    UserId
    Title
    Accounts {
      id
      Handle
    }
  }
}
```

### Get category by ID

POST request to `/graphql`

Body:
```graphql
{
  category(id: "<categoryId>") {
    id
    UserId
    Title
    Accounts {
      id
      Handle
    }
  }
}
```

### Add category 

POST request to `/graphql` (Remember to add Bearer Token in Authorization)

Body:
```graphql
mutation {
  addCategory(
    UserId: "<userId>"
    Title: "<titlename>",
    Accounts: [
      {
        Handle: "<handle>"
      },
      {
        Handle: "<handle2>"
      }
    ]
  )
  {
    id
    UserId
    Title
    Accounts {
      id
      Handle
    }
  }
}
```

### Modify category

POST request to `/graphql` (Remember to add Bearer Token in Authorization)

Body:
```graphql
mutation {
    modifyCategory(    
      id: "<categoryId>",
      UserId: "<userId>"
      Title: "<titlename>",
      Accounts: [
        {
          Handle: "<handle>"
        },
        {
          Handle: "<handle2>"
        }
      ]
    )
    {
      id
      UserId
      Title
      Accounts {
        id
        Handle
      }
    }
}
```

### Delete category

POST request to `/graphql` (Remember to add Bearer Token in Authorization)

Body:
```graphql
mutation
{
	deleteCategory(id: "<categoryId>")
}
```
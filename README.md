# twitter-categorize

example requests:

```graphql
# get categories by user
{
  categories(userId: "Jarno") {
    id
    UserId
    Title
    Accounts {
      id
      Handle
    }
  }
}

# category by id
{
  category(id: "6087c96cc6cf5436b0a22593") {
    id
    UserId
    Title
    Accounts {
      id
      Handle
    }
  }
}

# add category
mutation {
  addCategory(
    UserId: "Test"
    Title: "Test",
    Accounts: [
      {
        Handle: "Test1"
      },
      {
        Handle: "Test2"
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

# modify category
mutation {
    modifyCategory(    
      id: "6086f1287d6eaa3ef0f30972",
      UserId: "UserId"
      Title: "some title",
      Accounts: [
        {
          Handle: "test",
        }
    	],
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

# delete category
mutation
{
	deleteCategory(id: "5e590b0a7536c009841db2e3")
}
```
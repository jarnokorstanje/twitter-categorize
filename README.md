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
      Title
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
      Title
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
        Title: "Test1"
      },
      {
        Title: "Test2"
      }
    ]
  )
  {
    id
    UserId
    Title
    Accounts {
      id
      Title
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
          Title: "test",
        }
    	],
    )
    {
      id
      UserId
      Title
      Accounts {
        id
        Title
      }
    }
}

# delete category
mutation
{
	deleteCategory(id: "5e590b0a7536c009841db2e3")
}
```
# twitter-categorize

example requests:

```graphql
# limit the number of categories
{
  categories(start: 0, limit: 3) {
    id
    Title
    Accounts {
      id
      Title
    }
  }
}

# category by id
{
  category(id: "6080105a39cf1943448d32b1") {
    id
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
    Title: "Stocks",
    Accounts: [
      {
        Title: "Account 1"
      }
    ]
  )
  {
    id
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
      id: "6080105a39cf1943448d32b1",
      Title: "some title",
      Accounts: [
        {
          id:"6080105a39cf1943448d32b0", 
          Title: "some title",
        }
    	],
    )
    {
      id
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
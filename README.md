# twitter-categorize

example requests:

```graphql
# limit the number of stations
{
  stations(start: 1, limit: 3) {
    id
    Title
    Connections {
        id
        Title
    }
  }
}

# station by id
{
  station(id: "60800587c2b10439604a5b0e") {
    id
    Title
    Connections {
        id
        Title
    }
  }
}

# add station
mutation {
  addStation(
    Title: "Some title",
    Connections: [
      {
        Title: "Some title"
      }
    ]
  )
  {
    id
    Title
    Connections {
        id
        Title
    }
  }
}

# modify station
mutation {
    modifyStation(    
      id: "6080105a39cf1943448d32b1",
      Title: "name",
      Connections: [
        {
          id:"6080105a39cf1943448d32b0", 
          Title: "name",
        }
    	],
    )
    {
      id
      Title
      Connections {
        id
        Title
      }
    }
}

# modify station (if you want to use separate variables)
mutation ExampleWithVariables($id: ID!, $Title: String, $Connections: [ConnectionInput]) {
    modifyStation(    
        id: $id,
        Title: $Title,
        Connections: $Connections,
    )
    {
        id
        Title
        Connections {
            id
            Title
        }
    }
}

# variables for modify station, note that format is JSON
{
    "id":"someStationID",
    "Title":"someTitle",
    "Connections":[
        {
            "id":"someConnectionID", 
            "Title": "Some title",
        }
    ],
}


#delete station
mutation
{
	deleteStation(id: "60800587c2b10439604a5b0e"){ id }
}
```
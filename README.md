# NestJs Best Practice


### MongoDb
Online free mongodb: [MongoDB Atlas](https://www.mongodb.com/atlas/database)

### `GraphQLModule`
```ts
@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
      debug: false,
      playground: true,
    })
  ]
})
```

- `GraphQLModule`: This is an import from the `@nestjs/graphql` module, which is used to provide GraphQL functionality to a NestJS application.

- `forRoot()`: This is a static method of the `GraphQLModule` class which is used to provide configuration options for the GraphQL module.

- `typePaths`: This option specifies an array of file paths or globs that contain the GraphQL schema definitions. In this case, it's set to ['./**/*.graphql'], which means to search for all `.graphql` files in the current directory and its subdirectories.

- `definitions`: This option specifies the output file path and format for the GraphQL schema type definitions. In this case, it's set to:

- `path`: The file path to generate the schema type definitions. It's set to `join(process.cwd(), 'src/graphql.ts')`, which joins the current working directory with the `src/graphql.ts` file path.

- `outputAs`: The format for the generated schema type definitions. It's set to 'class', which generates TypeScript classes.

- `debug`: This option is used to enable or disable debugging information for the GraphQL module. It's set to false in this case.

- `playground`: This option is used to enable or disable the GraphQL Playground interface, which is a graphical interface for testing and exploring GraphQL APIs. It's set to true in this case, which means that the Playground interface is enabled.


### GraphQL PlayGround
To use the Playground to test your GraphQL API, first, make sure that you have enabled the Playground in your GraphQL server's configuration. In NestJS, this is done by setting the playground property to true in the GraphQLModule.forRoot() configuration object, which we discussed earlier.

Once you have verified that the Playground is enabled, you can access it by navigating to the URL where your GraphQL API is running and adding "/graphql" to the end of it. For example, if your API is running at http://localhost:3000, you can access the Playground by going to http://localhost:3000/graphql in your web browser.

In the Playground, you can write and execute GraphQL queries, mutations, and subscriptions. On the left-hand side of the Playground, you will see a query editor where you can enter your GraphQL operations. As you type, the Playground will provide syntax highlighting, autocompletion, and validation to help you write valid GraphQL queries.

Once you have written your query, click the "Play" button to send it to the server. The results of the query will be displayed on the right-hand side of the Playground.

You can also use the Playground to explore your API's schema and documentation. You can view the schema by clicking on the "Schema" tab at the bottom of the Playground, and you can view the documentation for individual types and fields by hovering over them in the query editor.

Examples:

To get all users:

```graphql
query {
  users {
    _id
    username
    password
  }
}
```

To get a specific user by id:

```graphql
query {
  user(_id: "USER_ID_HERE") {
    _id
    username
    password
  }
}
```

To create a new user:

```graphql
mutation {
  createUser(input: {
    username: "NEW_USERNAME_HERE",
    password: "NEW_PASSWORD_HERE"
  }) {
    _id
    username
    password
  }
}
```

To update an existing user:

```graphql
mutation {
  updateUser(_id: "USER_ID_HERE", input: {
    username: "NEW_USERNAME_HERE",
    password: "NEW_PASSWORD_HERE"
  }) {
    _id
    username
    password
  }
}
```

To delete a user by id:

```graphql
mutation {
  deleteUser(_id: "USER_ID_HERE")
}
```

To delete all users:

```graphql
mutation {
  deleteAll
}
```
Just replace USER_ID_HERE, NEW_USERNAME_HERE, and NEW_PASSWORD_HERE with the appropriate values.


### Cache GraphQL Query Result

`apollo-server-cache-memcached`

Using `apollo-server-cache-memcached` with Apollo Server allows for efficient caching of query results, reducing the number of requests sent to a data source and improving the overall performance of a GraphQL API. By caching query results in Memcached, subsequent requests for the same data can be served directly from the cache, avoiding the need to execute the query and retrieve data from the data source.

### Customized Playground
NestJS provides a built-in GraphQL Playground that you can use to explore and test your GraphQL API. The Playground has several built-in features like interactive documentation, schema exploration, query testing, and code generation.

In addition to the built-in features, the Playground can also be customized using configuration options. For example, you can customize the colors, fonts, and logos of the Playground to match your branding. You can also disable certain features, like the ability to save queries, or enable other features, like the ability to download the schema as a JSON file. The customization options are available through the configuration options passed to the `GraphQLModule.forRoot` method.

### `graphql-voyager`
GraphQL Voyager is a tool for visualizing and exploring GraphQL APIs. It provides a visual representation of the entire schema and allows users to explore the types, fields, and relationships between them. With Voyager, you can easily navigate through the schema, see the types, query fields, and relationships in a graphical format, and get more context about your GraphQL API. It's useful for developers who want to learn more about an unfamiliar schema, troubleshoot issues with an existing schema, or just explore the structure of their GraphQL API. Voyager is built with React and supports a wide range of GraphQL implementations.

`http://localhost:3000/voyager`


### Custom directive in GraphQL
```
# user.graphql
directive @isAuthenticated on FIELD | FIELD_DEFINITION
directive @hasRole(role: String) on FIELD | FIELD_DEFINITION

type Query {
  users: [User!]! @isAuthenticated
}
```
This is an example of a custom directive in GraphQL that can be used to check if a user is authenticated before accessing a specific field or field definition.

The `@isAuthenticated` directive can be applied to a field or field definition in a GraphQL schema. When a client sends a query that includes this directive, the server can check whether the user is authenticated before allowing the query to be executed.

In this example, the @isAuthenticated directive is applied to the `users` field in the Query type. When a client sends a query for the `users` field, the server can check whether the user is authenticated before allowing the query to be executed. If the user is not authenticated, the server can return an error instead of executing the query.

### `dotnet`
The `dotenv` library is used to load environment variables from a `.env` file into your Node.js application's process.env object. Environment variables are values that are set outside of your application code, typically in a shell environment, and are often used to store sensitive information like API keys, passwords, and database connection strings.

When you use the `dotenv` library, it will automatically load the values from the `.env` file into the process.env object, making them available to your application code. Without using `dotenv`, you would need to set the environment variables manually or use a different method to load them into your application.

One important note is that you should never commit your `.env` file to source control, as this could expose sensitive information to others. Instead, you should add it to your `.gitignore` file or another exclusion mechanism to ensure it is not included in your commits.
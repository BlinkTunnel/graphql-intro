# graphql-intro
GraphQL demo in node

## Develop
1. `npm install && npm start`
2. visit `http://127.0.0.1/graphql`
3. try with following query string
```
query Query {
  user(username: "BlinkTunnel") {
    name
    id
    avatar_url
    html_url
    type
    name
    company
    blog
    location
    email
    bio
    public_repos
    followers
    following
    repositories {
      id
      name
      description
      stargazers_count
    }
  }
}
```

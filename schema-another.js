var Schema = require('graph.ql');
var rq = require('request-promise');

var schema = Schema(`
  # github repository
  type Repo {
    id: Int
    name: String
    description: String
    stargazers_count: Int
  }
  
  type User {
    # user id
    id: Int
    avatar_url: String
    html_url: String
    type: String
    name: String
    company: String
    blog: String
    location: String
    email: String
    bio: String
    public_repos: Int
    followers: Int
    following: Int
    login: String
    repositories: [Repo]
  }
  
  type Query {
    user(username: String!): User
  }
`, {
    User: {
      repositories(user) {
        return rq({
          uri: `https://api.github.com/users/${user.login}/repos`,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.36 Safari/537.36'
          },
          json: true
        })
      }
    },
    Query: {
      user(root, args) {
        return rq({
          uri: `https://api.github.com/users/${args.username}`,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.36 Safari/537.36'
          },
          json: true
        })
      }
    }
  });

export default schema;

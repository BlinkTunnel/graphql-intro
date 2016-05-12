import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql';
import rq from 'request-promise';

var RepoType = new GraphQLObjectType({
  name: 'Repo',
  description: 'github repository',
  fields: {
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    stargazers_count: {
      type: GraphQLInt
    }
  }
});

var UserType = new GraphQLObjectType({
  name: 'User',
  description: 'github user',
  fields: {
    id: {
      type: GraphQLInt,
      description: 'user id'
    },
    avatar_url: {
      type: GraphQLString
    },
    html_url: {
      type: GraphQLString
    },
    type: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString,
      description: 'user name'
    },
    company: {
      type: GraphQLString
    },
    blog: {
      type: GraphQLString
    },
    location: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    bio: {
      type: GraphQLString
    },
    public_repos: {
      type: GraphQLInt
    },
    followers: {
      type: GraphQLInt
    },
    following: {
      type: GraphQLInt
    },
    login: {
      type: GraphQLString
    },
    repositories: {
      type: new GraphQLList(RepoType),
      resolve: (user) => {
        return rq({
          uri: `https://api.github.com/users/${user.login}/repos`,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.36 Safari/537.36'
          },
          json: true
        })
      }
    }
  }
});

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: UserType,
        args: {
          username: {
            type: GraphQLString,
            required: true
          }
        },
        resolve: (_, args) => {
          return rq({
            uri: `https://api.github.com/users/${args.username}`,
            headers: {
              'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.36 Safari/537.36'
            },
            json: true
          })
        }
      },
    }
  })
})

export default schema;

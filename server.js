import express from 'express';
import schema from './schema';
import graphqlHTTP from 'express-graphql';
import bodyParser from 'body-parser';

let app = express();
let PORT = 3000;

app.use('/graphql', graphqlHTTP({ schema: schema, graphiql: true }));

let server = app.listen(PORT, function() {
  let host = server.address().address;
  let port = server.address().port;
  console.log('GraphQL listening at http://%s:%s', host, port);
});

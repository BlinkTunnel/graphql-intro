import express from 'express';
import schema from './schema';
import schemaAnother from './schema-another';
import graphqlHTTP from 'express-graphql';

let app = express();
let PORT = 3000;

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));
app.use('/another', graphqlHTTP({ schema: schemaAnother.schema, graphiql: true }))

let server = app.listen(PORT, function() {
  let host = server.address().address;
  let port = server.address().port;
  console.log('GraphQL listening at http://%s:%s', host, port);
});

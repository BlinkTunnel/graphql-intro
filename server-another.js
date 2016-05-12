import express from 'express';
import schema from './schema-another';
import bodyParser from 'body-parser';

let app = express();
let PORT = 3000;

app.use(bodyParser.text());

app.use('/graphql', (req, res) => {
  schema(req.body).then(response => res.json(response))
});

let server = app.listen(PORT, function() {
  let host = server.address().address;
  let port = server.address().port;
  console.log('GraphQL listening at http://%s:%s', host, port);
});

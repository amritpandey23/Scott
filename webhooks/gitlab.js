const http = require('http');

const httpServer = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method == 'POST') {
    let body = '';
    req.on('data', (data) => {
      body += data;
      res.end();
    });
    console.log(JSON.parse(body));
  }
});

httpServer.listen(8870, null, (error) => {
  if (!!error) {
    console.log(
      '\n\x1b[31m\x1b[1mError while initializing GitHub listener on 0.0.0.0:' +
        8870 +
        ' - ' +
        error +
        '\x1b[0m'
    );
    return process.exit(1);
  } else {
    console.log(
      '\x1b[32m\x1b[1mGitHub listener successfully started on 0.0.0.0:' +
        8870 +
        '\x1b[0m\n'
    );
    return true;
  }
});

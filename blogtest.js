var tumblr = require('tumblr.js');

var client = tumblr.createClient({
  consumer_key: 'a89gx1Tt3aCC2vy7DWtCSX6iPC09LgZ1X6pqXUEDFTVy2IpC93',
  consumer_secret: '7vZhUPZ8y0MwTdE4HTdX4K8BR5Il0rsu19itH2nVyY8IIlkP19',
  token: 'iSXxwxbqqg5hfJUqr4yrOR4y6sh4gsgedyTau5PpirGhzymiwW',
  token_secret: 'pkMiFWYT2jKYhAKaW3YBI6eRh8x3n5cGbTFSKe0XG26ir4R4oV'
});

client.posts('viviechu.tumblr.com', function(err, blog){


})
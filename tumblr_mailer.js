var fs = require('fs');
var ejs = require('ejs');

var csvFile = fs.readFileSync("friend_list.csv","utf8");
var emailTemplate = fs.readFileSync("email_template.html","utf8");
var tumblr = require('tumblr.js');
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('PBnSoQJ-tPErg3NGhmVamA');

var client = tumblr.createClient({
  consumer_key: 'a89gx1Tt3aCC2vy7DWtCSX6iPC09LgZ1X6pqXUEDFTVy2IpC93',
  consumer_secret: '7vZhUPZ8y0MwTdE4HTdX4K8BR5Il0rsu19itH2nVyY8IIlkP19',
  token: 'iSXxwxbqqg5hfJUqr4yrOR4y6sh4gsgedyTau5PpirGhzymiwW',
  token_secret: 'pkMiFWYT2jKYhAKaW3YBI6eRh8x3n5cGbTFSKe0XG26ir4R4oV'
});

client.posts('viviechu.tumblr.com', function(err, blog) {
	var latestPosts = [];
	var diff = 60*60*24*7*1000;
	blog.posts.forEach(function(post){
		var today = new Date();
		var blogdate = new Date(post.date);
		if(today.getTime() - blogdate.getTime() <= diff){
			latestPosts.push(post);
		}
	})
	var csv_data = csvParse(csvFile)
	csv_data.forEach(function(row){
		firstName = row['firstName'];
		numMonthsSinceContact = row['numMonthsSinceContact'];
		copyTemplate = emailTemplate;

		var customizedTemplate = ejs.render(copyTemplate, {firstName: firstName,
								   numMonthsSinceContact: numMonthsSinceContact,
								   latestPosts: latestPosts
		 });
		sendEmail(firstName, row["emailAddress"], 'vivie', "hw2428@columbia.edu", "testing", customizedTemplate);
	})
});

function csvParse(file){
  var parse = file.split('\n');
  var arr = [];
  for(var i=0 ; i < parse.length-1 ; i++){
     arr.push(parse[i].split(','));
  }
  var finalarray=[];

  for(var j=1 ; j<arr.length ;j++){
    var map = {};
    for(var k=0 ; k<= arr.length ; k++){
      map[arr[0][k]]= arr[j][k];
    }
    finalarray.push(map);
  }
  return finalarray;
}

function sendEmail(to_name, to_email, from_name, from_email, subject, message_html){
    var message = {
        "html": message_html,
        "subject": subject,
        "from_email": from_email,
        "from_name": from_name,
        "to": [{
                "email": to_email,
                "name": to_name
            }],
        "important": false,
        "track_opens": true,
        "auto_html": false,
        "preserve_recipients": true,
        "merge": false,
        "tags": [
            "Fullstack_Tumblrmailer_Workshop"
        ]
    };
    var async = false;
    var ip_pool = "Main Pool";
    mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
    	console.log(result);
    }, function(e) {
        // Mandrill returns the error as an object with name and message keys
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    });
 }
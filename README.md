# mongotweet
Tweet project for db course.
Before this will work you will need to run these two scripts on the database to 
add the mentions attribute to the records. These record all
the users that are mentioned in each tweet..

db.tweets.update({}, {$set: {"mentions": []}},false,true);

db.tweets.find().forEach(function(doc){
    var mention = doc.text.match(/@[a-z\d]+/ig);
    doc.mentions.push(mention);
    db.tweets.save(doc);
    });
    
    The database can now store the mentioned users in an array on each tweet.

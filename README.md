# mongotweet
Tweet project for db course.
Our Group consists of Ben Jones and Rihards Pacevics.
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

Deployed version is available on http://dbtweetexercise-benwebshop.rhcloud.com/#!/view1
Database is hosted in mlab, unfortunately free account have only 500 MB space, so deployed collection consist only of 1048793 tweets.
Also because of the small capacity of the free database we couldn't add the mentions array to the collection, it was too big. So the 
delpoyed version doesn't show any of the mentioned answers, we ran them locally.

The files 1,2,3,4,5 and 6 .jpg have screen shots of our results. The methods we used are here:

 Number of users:
 
 tweet.distinct('user').exec(function (err, data) {
    res.json({ numberOfUsers: data.length });
  });
  
  Five most positive tweeters:
  
  tweet.aggregate([
    { $match: { polarity: 4 } },
    { $group: { _id: '$user', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 }
  ], function (err, data) {
    res.json(data);
  });
  
  Ten most mentioned users:
  
  tweet.aggregate([
      { $unwind: '$mentions' },
      { $group: { _id: '$user',  size: { $sum: 1 } } },
      { $sort: { size: -1 } },
      { $limit: 10 }]).allowDiskUse(true).exec(function (err, data) {
    if (err) {
      return console.log('error', err);
    }

    res.json(data);
  });
  
  Five most negative Tweeters:
  
  tweet.aggregate([
      { $match: { polarity: 0 } },
      { $group: { _id: '$user', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
  ], function (err, data) {
      res.json(data);
    });
    
  10 most frequent Tweeters:
  
   tweet.aggregate([
        { $group: { _id: '$user', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
    ], function (err, data) {
        res.json(data);
      });
      
  5 most mentioned Tweeters:
  
  tweet.aggregate([
    { $group: { _id: '$mentions', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 }
  ], function (err, data) {
    res.json(data);
  });
  
These mehtods are all run from the server/routes/social.js file.
    
  

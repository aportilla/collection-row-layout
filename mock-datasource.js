var DATASOURCE = (function(){

  var startingIndex = 0;

  var files = [
    {
      filename : 'skyline.jpeg',
      width : 571,
      height : 800
    },
    {
      filename : 'be present.jpeg',
      width : 566,
      height : 800
    },
    {
      filename : 'colors.jpeg',
      width : 581,
      height : 784
    },
    {
      filename : 'quick brown fox.jpg',
      width : 500,
      height : 707
    },
    {
      filename : 'pegasus.jpeg',
      width : 600,
      height : 900
    },
    {
      filename : 'murray christmas.jpg',
      width : 337,
      height : 494
    },
    {
      filename : 'psych.jpeg',
      width : 800,
      height : 800
    },
    {
      filename : 'inner mind.jpeg',
      width : 600,
      height : 798
    },
    {
      filename : 'come back quick.jpeg',
      width : 618,
      height : 800
    },
    {
      filename : 'arizona.gif',
      width : 864,
      height : 1152
    },
    {
      filename : 'not all who wander.jpeg',
      width : 600,
      height : 800
    },
    {
      filename : 'polar bear.jpeg',
      width : 627,
      height : 800
    },
    {
      filename : 'minute at a time.jpeg',
      width : 566,
      height : 800
    },
    {
      filename : 'hornet.jpeg',
      width : 571,
      height : 800
    },
    {
      filename : 'king of the forest.jpeg',
      width : 851,
      height : 850
    },
    {
      filename : 'eye.jpeg',
      width : 1920,
      height : 1080
    },
    {
      filename : 'eclipse.jpeg',
      width : 566,
      height : 800
    },
    {
      filename : 'alphabet.jpeg',
      width : 655,
      height : 800
    },
    {
      filename : 'portrait.jpeg',
      width : 640,
      height : 794
    },
    {
      filename : 'Believe.jpg',
      width : 458,
      height : 652
    },
    {
      filename : 'never ending story.jpg',
      width : 500,
      height : 354
    },
    {
      filename : 'skull bolt.jpeg',
      width : 600,
      height : 800
    }
  ];


  var makeId = function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 5; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  };

  var makeItem = function() {

    var fileCount = files.length;
    var nextFile = files[startingIndex%files.length];

    startingIndex++;

    return { 
      id : makeId(),
      filename : nextFile.filename,
      // width : random(200,500),
      // height: random(200,500)
      width : nextFile.width,
      height : nextFile.height
    };
  };

  var random = function(start,end){
    return start + Math.floor(Math.random()*(end - start));
  };

  return {
    // trigger callback with an array of items
    getMore : function(count){

      var dfd = new $.Deferred();

      var wait = random(300,1000);
      var items = [];

      for (var i = count; i >= 0; i--) {
        items.push(makeItem());
      }

      _.delay(dfd.resolve,wait,items);

      return dfd.promise();

    }
  };

}());
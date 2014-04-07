var COLLECTION_VIEW = (function(){

  var $el = $('<div class="collection-view">'),
    
    $window = $(window),

    currentItems = [],

    imgMargin = 10,

    handleResize = _.throttle(function(){

      var currentPageWidth = $window.width();
      var targetRowAspect = 
        currentPageWidth < 400 ? 1 : 
        currentPageWidth < 700 ? 2 : 
        currentPageWidth < 1000 ? 3 : 
        currentPageWidth < 1300 ? 4 : 5;
      var itemCount = currentItems.length;
      var item;
      var currentTop = 0;
      var currentRowItems = [];
      var rowSumAspect = 0;
      var halfMargin = imgMargin / 2;
      var rowHeight = 200;

      var injectRow = function(isDynamicRowHeight){

        var frag = document.createDocumentFragment();
        var rowItemCount = currentRowItems.length;
        var adjustedRowWidth = currentPageWidth - (rowItemCount * imgMargin) - imgMargin;
        var leftPos = imgMargin;

        if (isDynamicRowHeight){
          rowHeight = adjustedRowWidth / rowSumAspect; 
        }

        for (var i = 0; i < rowItemCount; i++) {
          var rowItem = currentRowItems[i];
          var itemAspect = (rowItem.width + imgMargin) / (rowItem.height + imgMargin);
          var renderWidth = Math.floor(itemAspect * rowHeight);
          rowItem.$el.css({
            height : Math.floor(rowHeight),
            width : renderWidth,
            top : currentTop,
            left : leftPos
          });
          leftPos += renderWidth + imgMargin;
          frag.appendChild(rowItem.el);
        }

        currentTop += Math.floor(rowHeight + imgMargin);
        $el.append(frag);
        currentRowItems = [];
        rowSumAspect = 0;

      };

      for (var i = 0; i < itemCount; i++) {

        item = currentItems[i];

        if (!item.$el){
          item.$el = $('<div class="item"><div class="frame"><img src="img/' + item.filename + '"/></div></div>');
          item.el = item.$el[0];
          // item.$frame = item.$el.find('.frame');
        }

        var itemAspect = item.width / item.height;
        rowSumAspect += itemAspect;
        currentRowItems.push(item);

        // should we inject a row?
        if (rowSumAspect >= targetRowAspect){
          injectRow(true);
        }
      }

      if (currentRowItems.length > 0){
        injectRow(false);
      }

      $el.css({
        height : currentTop
      });

    },50),

    INTERFACE = {};

  INTERFACE.$el = $el;

  INTERFACE.addItems = function(items){
    currentItems = currentItems.concat(items);
    handleResize();
  };

  $window.on('resize',handleResize);

  return INTERFACE;

}());
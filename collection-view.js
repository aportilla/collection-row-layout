var COLLECTION_VIEW = (function(){

  var $el = $('<div class="collection-view">'),
    
    $window = $(window),

    currentItems = [],

    handleResize = _.throttle(function(){

      var currentPageWidth = $window.width();
      var targetRowAspect = 
        currentPageWidth < 300 ? 1 : 
        currentPageWidth < 800 ? 2 : 
        currentPageWidth < 1200 ? 3 : 
        currentPageWidth < 2000 ? 4 : 5;
      var imgMargin = 12;
      var itemCount = currentItems.length;
      var item;
      var currentTop = imgMargin;
      var currentRowItems = [];
      var rowSumAspect = 0;
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
          var itemAspect = rowItem.width / rowItem.height;
          var renderWidth = Math.floor(itemAspect * rowHeight);
          frag.appendChild(rowItem.el);
          rowItem.$el.css({
            height : Math.floor(rowHeight),
            width : renderWidth,
            top : currentTop,
            left : leftPos
          });
          leftPos += renderWidth + imgMargin;
        }
        currentTop += Math.floor(rowHeight + imgMargin);
        $el.append(frag);
        currentRowItems = [];
        rowSumAspect = 0;
      };

      for (var i = 0; i < itemCount; i++) {
        item = currentItems[i];
        if (!item.$el){
          item.$el = $('<div class="item"><div class="frame"><img src="img/' + item.filename + '"/></div><div class="meta"><p>' + item.filename + '</p><p class="sub">' + item.width + ' x ' + item.height + '</p></div></div>');
          item.el = item.$el[0];
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
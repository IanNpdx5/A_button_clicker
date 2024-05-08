var amount = 1;
   var count = 0;
   var up1p = 10;
   var up2p = 50;
   var up3p = 100;
   var up4p = 1000;
   var $b = $("#clickerButton");
   var $up1 = $("#up1");
   var $up2 = $("#up2");
   var $up3 = $("#up3");
   var $up4 = $("#up4");
   var $count = $("#count");
   $count.text("Clicks: " + count);
    
   var onClick = function() {
       count += amount;
       $count.text("Clicks: " + count);
   };

   var sBOnClick = function(price, amounttoadd) {
       if (count >= price) {
           count -= price;
           amount += amounttoadd;
           $count.text("Clicks: " + count);
       }
   };

   $b.on("click", function() {onClick();});

   $up1.on("click", function() {sBOnClick(up1p, 1);});

   $up2.on("click", function() {sBOnClick(up2p, 2);});

   $up3.on("click", function() {
       if (count >= up3p) {
           count -= up3p;
           amount += 5;
       } else {
           return;
       }
   });

   $up4.on("click", function() {
       if (count >= up4p) {
           count -= up4p;
           amount += 10;
       } else {
           return;
       }
   });

   var amount = 1;
   var count = 0;
   var tc = 0;
   var bp = 0;
   var up1p = 15;
   var up2p = 100;
   var up3p = 500;
   var up4p = 1000;
   var $b = $("#clickerButton");
   var $up1 = $("#up1");
   var $up2 = $("#up2");
   var $up3 = $("#up3");
   var $up4 = $("#up4");
   var $count = $("#count");
   var $APC = $("#amount");
   var $TC = $("#clicks");
   var $BP = $("#presses");
   $count.text("Clicks: " + count);
   $APC.text("Amount per click: " + amount);
   $TC.text("Total clicks: " + tc);
   $BP.text("Total presses: " + bp);
    
   var onClick = function() {
       count += amount;
       tc += amount;
       bp++;
       $count.text("Clicks: " + count);
       $APC.text("Amount per click: " + amount);
       $TC.text("Total clicks: " + tc);
       $BP.text("Total presses: " + bp);
   };

   var sBOnClick = function(price, amounttoadd) {
       if (count >= price) {
           count -= price;
           amount += amounttoadd;
           $count.text("Clicks: " + count);
           $APC.text("Amount per click: " + amount);
       }
   };

   $b.on("click", function() {onClick();});

   $up1.on("click", function() {sBOnClick(up1p, 1);});

   $up2.on("click", function() {sBOnClick(up2p, 10);});

   $up3.on("click", function() {sBOnClick(up3p, 20);});

   $up4.on("click", function() {sBOnClick(up4p, 100);});

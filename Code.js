   var amountPC = 1;
   var amountPS = 0;
   var count = 0;
   var tc = 0;
   var bp = 0;
   var up1p = 15;    var up1a = 1;
   var up2p = 100;   var up2a = 5;
   var up3p = 500;   var up3a = 10;
   var up4p = 1000;  var up4a = 100;
   var up5p = 5000;  var up5a = 500;
   var up6p = 100;   var up6a = 1;
   var up7p = 500;   var up7a = 5;
   var up8p = 1000;  var up8a = 10;
   var up9p = 5000;  var up9a = 50;
   var up10p = 10000;var up10a = 100;
   var $b = $("#clickerButton");
   var $up1 = $("#up1");
   var $up2 = $("#up2");
   var $up3 = $("#up3");
   var $up4 = $("#up4");
   var $up5 = $("#up5");
   var $up6 = $("#up6");
   var $up7 = $("#up7");
   var $up8 = $("#up8");
   var $up9 = $("#up9");
   var $up10 = $("#up10");
   var $count = $("#count");
   var $APC = $("#amountPC");
   var $APS = $("#amountPS");
   var $TC = $("#clicks");
   var $BP = $("#presses");
   
   $count.text("Clicks: " + count);
   $APC.text("Amount per click: " + amountPC);
   $APS.text("Click(s) per second  (CPS): " + amountPS);
   $TC.text("Total clicks: " + tc);
   $BP.text("Total presses: " + bp);
    
   var onClick = function() {
       count += amountPC;
       tc += amountPC;
       bp++;
       $count.text("Clicks: " + count);
       $APC.text("Amount per click: " + amountPC);
       $TC.text("Total clicks: " + tc);
       $BP.text("Total presses: " + bp);
   };

   var sBOnClick = function(price, amounttoadd, number) {
       if (count >= price) {
           count -= price;
           if (number === 0) {
           amountPC += amounttoadd;
           $APC.text("Amount per click: " + amountPC);
           } else if (number === 1) {
           amountPS += amounttoadd;
           $APS.text("Click(s) per second  (CPS): " + amountPS);
           }
           $count.text("Clicks: " + count);
       }
   };
   
   var autoClick = function() {
       count += amountPS;
       tc += amountPS;
       $TC.text("Total clicks: " + tc);
       $count.text("Clicks: " + count);
   };

   $b.on("click", function() {onClick();});

   $up1.on("click", function() {sBOnClick(up1p, up1a, 0);});

   $up2.on("click", function() {sBOnClick(up2p, up2a, 0);});

   $up3.on("click", function() {sBOnClick(up3p, up3a, 0);});

   $up4.on("click", function() {sBOnClick(up4p, up4a, 0);});
   
   $up5.on("click", function() {sBOnClick(up5p, up5a, 0);});
   
   $up6.on("click", function() {sBOnClick(up6p, up6a, 1);});
   
   $up7.on("click", function() {sBOnClick(up7p, up7a, 1);});
   
   $up8.on("click", function() {sBOnClick(up8p, up8a, 1);});
   
   $up9.on("click", function() {sBOnClick(up9p, up9a, 1);});
   
   $up10.on("click", function() {sBOnClick(up10p, up10a, 1);});
   
   var AutoClicker = window.setInterval(autoClick, 1000);

$(function () {
  var state = { count: 0, totalClicks: 0, presses: 0, perClick: 1, perSecond: 0 };

  // type: "pc" = per click, "ps" = per second
  var upgrades = [
    { id: "#up1",  price: 15,    amount: 1,   type: "pc" },
    { id: "#up2",  price: 100,   amount: 5,   type: "pc" },
    { id: "#up3",  price: 500,   amount: 10,  type: "pc" },
    { id: "#up4",  price: 1000,  amount: 100, type: "pc" },
    { id: "#up5",  price: 5000,  amount: 500, type: "pc" },
    { id: "#up6",  price: 100,   amount: 1,   type: "ps" },
    { id: "#up7",  price: 500,   amount: 5,   type: "ps" },
    { id: "#up8",  price: 1000,  amount: 10,  type: "ps" },
    { id: "#up9",  price: 5000,  amount: 50,  type: "ps" },
    { id: "#up10", price: 10000, amount: 100, type: "ps" }
  ];
  var PRICE_GROWTH = 1.15; // set to 1 to keep your original fixed prices

  function render() {
    $("#count").text("Clicks: " + state.count);
    $("#amountPC").text("Amount per click: " + state.perClick);
    $("#amountPS").text("Click(s) per second (CPS): " + state.perSecond);
    $("#clicks").text("Total clicks: " + state.totalClicks);
    $("#presses").text("Total presses: " + state.presses);

    upgrades.forEach(function (u) {
      $(u.id)
        .text(u.price + " clicks")
        .prop("disabled", state.count < u.price);
    });
  }

  $("#clickerButton").on("click", function () {
    state.count += state.perClick;
    state.totalClicks += state.perClick;
    state.presses++;
    render();
  });

  upgrades.forEach(function (u) {
    $(u.id).on("click", function () {
      if (state.count < u.price) return;
      state.count -= u.price;
      if (u.type === "pc") state.perClick += u.amount;
      else state.perSecond += u.amount;
      u.price = Math.ceil(u.price * PRICE_GROWTH);
      render();
    });
  });

  setInterval(function () {
    if (state.perSecond === 0) return;
    state.count += state.perSecond;
    state.totalClicks += state.perSecond;
    render();
  }, 1000);

  render();
});

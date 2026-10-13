$(function () {
  var state = { count: 0, totalClicks: 0, presses: 0, perClick: 1, perSecond: 0 };
  var SAVE_KEY = "buttonClickerSave";

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

  function saveGame() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify({
        version: 1,
        state: state,
        prices: upgrades.map(function (u) { return u.price; })
      }));
    } catch (error) {
      // The game remains playable if browser storage is unavailable.
    }
  }

  function loadGame() {
    try {
      var saved = JSON.parse(localStorage.getItem(SAVE_KEY));
      if (!saved || saved.version !== 1 || !saved.state) return;

      ["count", "totalClicks", "presses", "perClick", "perSecond"].forEach(function (key) {
        var value = saved.state[key];
        if (typeof value === "number" && Number.isFinite(value) && value >= 0) {
          state[key] = key === "perClick" ? Math.max(1, value) : value;
        }
      });

      if (Array.isArray(saved.prices)) {
        upgrades.forEach(function (u, index) {
          var price = saved.prices[index];
          if (typeof price === "number" && Number.isFinite(price) && price >= 1) {
            u.price = price;
          }
        });
      }
    } catch (error) {
      // Ignore invalid or unavailable saves and start a fresh game.
    }
  }

  function render() {
    $("#count").text("Clicks: " + state.count);
    $("#amountPC").text("Amount per click: " + state.perClick);
    $("#amountPS").text("Click(s) per second (CPS): " + state.perSecond);
    $("#clicks").text("Total clicks: " + state.totalClicks);
    $("#presses").text("Total presses: " + state.presses);

    upgrades.forEach(function (u) {
      var affordable = state.count >= u.price;
      $(u.id)
        .html('<span class="cost">' + u.price.toLocaleString() + '</span> Clicks')
        .prop("disabled", !affordable)
        .toggleClass("affordable", affordable);
    });
  }

  $("#clickerButton").on("click", function () {
    state.count += state.perClick;
    state.totalClicks += state.perClick;
    state.presses++;
    render();
    saveGame();
  });

  upgrades.forEach(function (u) {
    $(u.id).on("click", function () {
      if (state.count < u.price) return;
      state.count -= u.price;
      if (u.type === "pc") state.perClick += u.amount;
      else state.perSecond += u.amount;
      u.price = Math.ceil(u.price * PRICE_GROWTH);
      render();
      saveGame();
    });
  });

  setInterval(function () {
    if (state.perSecond === 0) return;
    state.count += state.perSecond;
    state.totalClicks += state.perSecond;
    render();
    saveGame();
  }, 1000);

  loadGame();
  window.addEventListener("pagehide", saveGame);
  render();
});

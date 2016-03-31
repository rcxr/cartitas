var initialValue = 3;

var Card = (function () {
  function Card(n) {
    this.elements = [];
    this.n = n;
  };

  Card.prototype.push = function (element) {
    this.elements.push(element);
  };

  Card.prototype.toHtml = function () {
    var container = $("<div></div>").addClass("card");

    for (var i = 0; i < this.n; ++i) {
      container.append($("<span></span>")
        .addClass("element")
        .addClass("element" + i)
        .text(this.elements[i]));
    }

    return container;
  }

  return Card;
})();

function generate(n) {
  var deck = $("#deck");
  var i, j;

  // Clear any previous deck
  deck.empty();

  // Create required cards
  var cards = [];
  //for (i = 0; i < n * (n - 1) + 1; ++i) {
  for (i = 0; i < n; ++i) {
    cards.push(new Card(n));
  }

  // Initialize first n cards
  for (i = 0; i < n; ++i) {
    cards[i].push(n * (n - 1));

    for(j = 0; j < n - 1; ++j) {
      cards[i].push(i * (n - 1) + j);
    }
  }

  // Append cards to the deck div
  for (i in cards) {
    deck.append(cards[i].toHtml());
  }
}

$(function () {
  var nField = $("#n").val(initialValue)

  $("#generate").click(function () {
    generate(nField.val());
  });
});

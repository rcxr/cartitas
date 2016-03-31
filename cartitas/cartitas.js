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
  var i, j, k;

  // Clear any previous deck
  deck.empty();

  // Create required cards
  var cards = [];
  for (i = 0; i < n * (n - 1) + 1; ++i) {
    cards.push(new Card(n));
  }

  // Fill first n cards
  for (i = 0; i < n; ++i) {
    cards[i].push(n * (n - 1));

    for(j = 0; j < n - 1; ++j) {
      cards[i].push(i * (n - 1) + j);
    }
  }

  // Fill remaining cards
  for (i = 0; i < n - 1; ++i) {
    for (j = 0; j < n - 1; ++j) {
      // Locate the card to fill
      var card = cards[n + i * (n - 1) + j];
      card.push(i);
      // Generate the n values for the given card
      for (k = 1; k < n; ++k) {
        card.push(k * (n - 1) + (i * k + j) % (n - 1));
      }
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
    generate(+nField.val());
  });

  nField.keypress(function (e) {
    if (e.which == 13) {
      generate(+nField.val());
    }
  });
});

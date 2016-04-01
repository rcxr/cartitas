function randomFunc() { return -0.5 + Math.random(); };

var initialValue = 8;
var initialSeed = 0;
var emojis = ["🐶", "🐱", "🐭", "🐹", "🐰", "🐻", "🐼", "🐨", "🐯", "🐮", "🐷", "🐽", "🐸", "🐙", "🐵", "🙈", "🙉", "🙊", "🐒", "🐔", "🐧", "🐦", "🐤", "🐣", "🐥", "🐺", "🐗", "🐴", "🐝", "🐛", "🐌", "🐞", "🐜", "🕷", "🐍", "🐢", "🐠", "🐟", "🐡", "🐬", "🐳", "🐋", "🐊", "🐆", "🐅", "🐃", "🐂", "🐄", "🐪", "🐫", "🐘", "🐐", "🐏", "🐑", "🐎", "🐖", "🐀", "🐁", "🐓", "🕊", "🐕", "🐩", "🐈", "🐇", "🐿", "🐾", "🐉", "🐲", "🌵", "🎄", "🌲", "🌳", "🌴", "🌱", "🌿", "☘", "🍀", "🎍", "🎋", "🍃", "🍂", "🍁", "🌾", "🌺", "🌻", "🌹", "🌷", "🌼", "🌸", "💐", "🍄", "🌰", "🎃", "🐚", "🕸", "🌎", "🌍", "🌏", "🌕", "🌖", "🌗", "🌘", "🌑", "🌒", "🌓", "🌔", "🌚", "🌝", "🌛", "🌜", "🌞", "🌙", "⭐️", "🌟", "💫", "✨", "☄", "☀️", "🌤", "⛅️", "🌥", "🌦", "☁️", "🌧", "⛈", "🌩", "⚡️", "🔥", "💥", "❄️", "🌨", "🔥", "💥", "❄️", "🌨", "☃️", "⛄️", "🌬", "💨", "🌪", "🌫", "☂️", "☔️", "💧", "💦", "🌊"];

var Card = (function () {
  function Card() {
    this.elements = [];
  };

  Card.prototype.push = function (element) {
    this.elements.push(element);
  };

  Card.prototype.toHtml = function () {
    var _this = this;

    var container = $("<div></div>")
      .addClass("card")
      .click(function () {
        $(".element").removeClass("selected");
        for (var i in _this.elements) {
          $(".element" + _this.elements[i]).addClass("selected");
        }
      });

    for (var i in this.elements) {
      container.append($("<div></div>")
        .addClass("element")
        .addClass("element" + this.elements[i])
        .text(emojis[this.elements[i]]));
    }

    return container;
  }

  Card.prototype.validate = function (card) {
    var duplicates = 0;
    for (var i in card.elements) {
      if (-1 < this.elements.indexOf(card.elements[i])) {
        ++duplicates;
      }
    }

    return duplicates == 1;
  }

  Card.prototype.randomize = function () {
    this.elements.sort(randomFunc);
  }

  return Card;
})();

// De: http://www.javascripter.net/faq/numberisprime.htm
function isPrime(n) {
  if (isNaN(n) || !isFinite(n) || n%1 || n<2){
    return false;
  } 

  if (n%2==0){
    return (n==2);
  }

  if (n%3==0){
    return (n==3);
  }

  var m=Math.sqrt(n);
  for (var i = 5; i <= m; i += 6) {
    if (n % i == 0) {
      return false;
    }

    if (n % (i + 2) == 0) {
      return false;
    }
  }
}

function generate(n) {
  if (!isPrime(n - 1)) {
    alert("Sólo números de la forma n = p + 1, donde p es primo están soportados :(");
    return;
  }

  // Randomize emojis
  emojis.sort(randomFunc);

  // Clear any previous deck
  var deck = $("#deck");
  deck.empty();

  var i, j, k;

  // Create required cards
  var cards = [];
  for (i = 0; i < n * (n - 1) + 1; ++i) {
    cards.push(new Card());
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

  // Force brute to validate
  for (i = 0; i < cards.length; ++i) {
    for (j = i + 1; j < cards.length; ++j) {
      if (!cards[i].validate(cards[j])) {
        alert("Validation failed :(");
      }
    }
  }

  // Randomize!
  cards.sort(randomFunc);
  for (i in cards) {
    cards[i].randomize();
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

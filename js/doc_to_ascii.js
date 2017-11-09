// import { charBinAt, charToBin, stringToBin } from './util.js';

const passage = `The last question was asked for the first time, half in jest, on May 21, 2061, at a time when humanity first stepped into the light. The question came about as a result of a five dollar bet over highballs, and it happened this way:
Alexander Adell and Bertram Lupov were two of the faithful attendants of Multivac. As well as any human beings could, they knew what lay behind the cold, clicking, flashing face -- miles and miles of face -- of that giant computer. They had at least a vague notion of the general plan of relays and circuits that had long since grown past the point where any single human could possibly have a firm grasp of the whole.

Multivac was self-adjusting and self-correcting. It had to be, for nothing human could adjust and correct it quickly enough or even adequately enough -- so Adell and Lupov attended the monstrous giant only lightly and superficially, yet as well as any men could. They fed it data, adjusted questions to its needs and translated the answers that were issued. Certainly they, and all others like them, were fully entitled to share In the glory that was Multivac's.

For decades, Multivac had helped design the ships and plot the trajectories that enabled man to reach the Moon, Mars, and Venus, but past that, Earth's poor resources could not support the ships. Too much energy was needed for the long trips. Earth exploited its coal and uranium with increasing efficiency, but there was only so much of both.

But slowly Multivac learned enough to answer deeper questions more fundamentally, and on May 14, 2061, what had been theory, became fact.

The energy of the sun was stored, converted, and utilized directly on a planet-wide scale. All Earth turned off its burning coal, its fissioning uranium, and flipped the switch that connected all of it to a small station, one mile in diameter, circling the Earth at half the distance of the Moon. All Earth ran by invisible beams of sunpower.

Seven days had not sufficed to dim the glory of it and Adell and Lupov finally managed to escape from the public function, and to meet in quiet where no one would think of looking for them, in the deserted underground chambers, where portions of the mighty buried body of Multivac showed. Unattended, idling, sorting data with contented lazy clickings, Multivac, too, had earned its vacation and the boys appreciated that. They had no intention, originally, of disturbing it.

They had brought a bottle with them, and their only concern at the moment was to relax in the company of each other and the bottle.

"It's amazing when you think of it," said Adell. His broad face had lines of weariness in it, and he stirred his drink slowly with a glass rod, watching the cubes of ice slur clumsily about. "All the energy we can possibly ever use for free. Enough energy, if we wanted to draw on it, to melt all Earth into a big drop of impure liquid iron, and still never miss the energy so used. All the energy we could ever use, forever and forever and forever."

Lupov cocked his head sideways. He had a trick of doing that when he wanted to be contrary, and he wanted to be contrary now, partly because he had had to carry the ice and glassware. "Not forever," he said.

"Oh, hell, just about forever. Till the sun runs down, Bert."

"That's not forever."

"All right, then. Billions and billions of years. Twenty billion, maybe. Are you satisfied?"

Lupov put his fingers through his thinning hair as though to reassure himself that some was still left and sipped gently at his own drink. "Twenty billion years isn't forever."

"Will, it will last our time, won't it?"`;

const charBinAt = (str, idx) => {
  return padEightBits(str.charCodeAt(idx).toString(2));
};

const charToBin = (ch) => {
  return padEightBits(ch.charCodeAt(0).toString(2));
};

const stringToBin = (str) => {
  let binString = "";
  for (let i = 0; i < str.length; i++) {
    binString = binString.concat(charToBin(str.charAt(i)));
  }
  return binString;
};

const padEightBits = (bin) => {
  const numLeadingZeros = 8 - bin.length;
  return "0".repeat(numLeadingZeros).concat(bin);
};


$(() => {
  let index = 0;
  setView(index);
  let intervalId = 0;
  intervalId = setInterval(() => {
    if (index < passage.length) {
      setView(index++);

    } else {
      clearInterval(intervalId);
    }
  }, 1);
  // let textDoc = $(".text-doc");
  // textDoc.text(passage);
  //
  // let asciiDoc = $(".ascii-doc");
  // asciiDoc.text();
});

const setView = (index) => {
  let body = $('.docs-view');
  // let textDoc = $(".text-doc");
  // let asciiDoc = $(".ascii-doc");

  let textDocContents = cursorTextDocHtml(passage, index);
  let asciiDocContents = cursorAsciiDocHtml(passage, index);
  // textDoc.html(textDocContents);
  // asciiDoc.html(asciiDocContents);
};

const cursorTextDocHtml = (txt, charIndex) => {
  const docHtml = $(".text-doc");
  const pre = $("<span>");
  pre.addClass("pre-text");
  const cur = $("<span>");
  cur.addClass("cursor");
  const post = $("<span>");

  pre.text(txt.substring(0, charIndex));
  cur.text(txt.charAt(charIndex));
  post.text(txt.substring(charIndex + 1));
  docHtml.html(pre);
  docHtml.append(cur);
  docHtml.append(post);
  return docHtml;
};

const cursorAsciiDocHtml = (txt, charIndex) => {
  const docHtml = $(".ascii-doc");
  const pre = $("<span>");
  pre.addClass("pre-text");
  const cur = $("<span>");
  cur.addClass("cursor");
  const post = $("<span>");

  let pText = stringToBin(txt.substring(0, charIndex));
  let cText = charToBin(txt.charAt(charIndex));
  pre.text(pText);
  cur.text(cText);
  // post.text(txt.substring(charIndex + 1));

  $(".bit-count").text((pText.length + cText.length).toString());

  docHtml.html(pre);
  docHtml.append(cur);
  docHtml.append(post);

  docHtml.scrollTop(docHtml[0].scrollHeight - 700);
  return docHtml;
};

// TRANSLATE TEXT
async function translateText() {
  const text = document.getElementById("inputText").value;
  const source = document.getElementById("sourceLang").value;
  const target = document.getElementById("targetLang").value;

  const outputBox = document.getElementById("outputText");

  if (!text.trim()) {
    outputBox.value = "Please enter text";
    return;
  }

  try {
    // API
    const response = await fetch("https://api.mymemory.translated.net/get?q=" +
      encodeURIComponent(text) +
      "&langpair=" + source + "|" + target
    );

    const data = await response.json();

    outputBox.value = data.responseData.translatedText;

  } catch (error) {
    console.error(error);
    outputBox.value = "Translation failed";
  }
}

// COPY 
function copyText() {
  const output = document.getElementById("outputText");
  navigator.clipboard.writeText(output.value);
  alert("Copied!");
}

//  SPEECH
function speakText() {
  const text = document.getElementById("outputText").value;

  if (!text || text.trim() === "") {
    alert("No translated text to speak");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);

  //  languages
  const targetLang = document.getElementById("targetLang").value;

  const langMap = {
      en: "en-US",   // English
  hi: "hi-IN",   // Hindi
  ta: "ta-IN",   // Tamil
  te: "te-IN",   // Telugu
  fr: "fr-FR",   // French
  es: "es-ES",   // Spanish

};
  

  utterance.lang = langMap[targetLang] || "en-US";

  
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;

  window.speechSynthesis.cancel(); // stop previous speech
  window.speechSynthesis.speak(utterance);
}


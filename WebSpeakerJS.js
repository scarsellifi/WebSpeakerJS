let audioSymbol = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-volume-up-fill" viewBox="0 0 16 16">
<path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
<path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89z"/>
<path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>
</svg>`;
let playSymbol = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
<path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
</svg>`;
let resetSymbol = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-repeat" viewBox="0 0 16 16">
<path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192Zm3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z"/>
</svg>`;

let stopSymbol = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-circle" viewBox="0 0 16 16">
<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
<path d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0z"/>
</svg>`;

class WebSpeakerJsComponent extends HTMLElement {
  constructor() {
    super();
    this.speaker = window.speechSynthesis;
    this.attachShadow({ mode: "open" });
    this.paused = true;
    this.utterance = null;
  }

  connectedCallback() {
    this.targetId = this.getAttribute("target-id");
    this.lang = this.getAttribute("lang") || "en-US";
    this.voiceName = this.getAttribute("voice");
    this.render();
    this.shadowRoot
      .getElementById("toggle")
      .addEventListener("click", () => this.togglePlay());
    this.shadowRoot
      .getElementById("reset")
      .addEventListener("click", () => this.resetSpeech());
    this.shadowRoot
      .getElementById("toggle")
      .addEventListener("keydown", (e) => this.handleKeyPress(e, "toggle"));
    this.shadowRoot
      .getElementById("reset")
      .addEventListener("keydown", (e) => this.handleKeyPress(e, "reset"));
  }

  handleKeyPress(e, buttonType) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (buttonType === "toggle") {
        this.togglePlay();
      } else if (buttonType === "reset") {
        this.resetSpeech();
      }
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
        <style>
            .btn {
                display: inline-block;
                padding: 0.375rem 0.75rem;
                margin: 0.375rem;
                font-size: 1rem;
                font-weight: 400;
                line-height: 1.5;
                text-align: center;
                text-decoration: none;
                vertical-align: middle;
                cursor: pointer;
                background-color: transparent;
                border: 1px solid transparent;
                border-radius: 0.25rem;
                transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            }

            .btn-primary {
                color: #fff;
                background-color: #007bff;
                border-color: #007bff;
            }

            .btn-primary:hover {
                background-color: #0069d9;
                border-color: #0062cc;
            }

            .btn-secondary {
                color: #fff;
                background-color: #6c757d;
                border-color: #6c757d;
            }

            .btn-secondary:hover {
                background-color: #5a6268;
                border-color: #545b62;
            }
        </style>

        <button id="toggle" class="btn btn-primary" aria-label="Play" tabindex="0">${audioSymbol}</button>
        <button id="reset" class="btn btn-secondary" aria-label="Reset" tabindex="0">${resetSymbol} ${audioSymbol}</button>
    `;
  }

  togglePlay() {
    if (this.utterance && !this.paused) {
      this.speaker.pause();
      this.paused = true;
      this.updateButtonSymbol(playSymbol);
    } else {
      if (this.paused && this.utterance) {
        this.speaker.resume();
      } else {
        this.prepareAndReadText();
      }
      this.paused = false;
      this.updateButtonSymbol(stopSymbol);
    }
  }

  prepareAndReadText() {
    const targetElement = document.getElementById(this.targetId);
    if (targetElement) {
      const textToRead = targetElement.textContent;
      this.utterance = new SpeechSynthesisUtterance(textToRead);
      this.utterance.lang = this.lang;

      if (this.voiceName) {
        const voices = this.speaker.getVoices();
        const selectedVoice = voices.find(
          (voice) => voice.name === this.voiceName
        );
        if (selectedVoice) {
          this.utterance.voice = selectedVoice;
        }
      }

      this.speaker.speak(this.utterance);
    }
  }

  updateButtonSymbol(symbol) {
    this.shadowRoot.getElementById("toggle").innerHTML = symbol;
  }

  resetSpeech() {
    if (this.speaker.speaking) {
      this.speaker.cancel();
    }
    this.paused = true;
    this.utterance = null;
    this.updateButtonSymbol(playSymbol);
    console.log("TTS reset by user");
  }
}

window.customElements.define("web-speaker-js", WebSpeakerJsComponent);

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

        <button id="toggle" class="btn btn-primary">🕪</button>
        <button id="reset" class="btn btn-secondary">🔁🕪</button>
    `;
  }

  togglePlay() {
    if (this.utterance && !this.paused) {
      this.speaker.pause();
      this.paused = true;
      this.updateButtonSymbol("▶");
    } else {
      if (this.paused && this.utterance) {
        this.speaker.resume();
      } else {
        this.prepareAndReadText();
      }
      this.paused = false;
      this.updateButtonSymbol("⏸");
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
    this.shadowRoot.getElementById("toggle").textContent = symbol;
  }

  resetSpeech() {
    if (this.speaker.speaking) {
      this.speaker.cancel();
    }
    this.paused = true;
    this.utterance = null;
    this.updateButtonSymbol("▶");
    console.log("TTS reset by user");
  }
}

window.customElements.define("web-speaker-js", WebSpeakerJsComponent);

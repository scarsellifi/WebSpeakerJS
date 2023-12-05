
# WebSpeakerJsComponent

WebSpeakerJsComponent is a pure JavaScript (Vanilla JS) web component that enables text-to-speech functionality on any DOM element using the modern browser's SpeechSynthesis API. It's easy to integrate and customize, ideal for adding speech synthesis capabilities to your web pages.

## Features

- Read aloud the text of any DOM element.
- Built-in playback controls: Play/Pause and Reset.
- Customization of narration language and voice.
- Customizable control styles with Bootstrap.

## Installation

Include `WebSpeakerJsComponent` in your project by copying the class code into your JavaScript file or creating a separate file, e.g., `WebSpeakerJsComponent.js`.

```html
<script src="path/to/WebSpeakerJsComponent.js"></script>
```

## Usage

To use the WebSpeakerJsComponent, insert the `web-speaker-js` tag in your HTML and specify the ID of the element whose text you want to read.

```html
<web-speaker-js target-id="element-id" lang="en-US" voice="Google US English"></web-speaker-js>
```

### Attributes

- `target-id`: ID of the DOM element whose text is to be read.
- `lang`: Language code for the narration (optional, default: "en-US").
- `voice`: Name of the voice to be used for the narration (optional).

### Example

```html
<div id="my-text">This is an example text to be read.</div>
<web-speaker-js target-id="my-text"></web-speaker-js>
```

## Custom Styles

You can customize the style of the control buttons using CSS. The component uses Bootstrap for default styles, but you can override them as you prefer.

## Contributing

Contributions to the library are welcome! Feel free to fork the repository, open issues, and submit pull requests.

## License

WebSpeakerJsComponent is released under the [MIT License](LINK_TO_LICENSE).

import { LitElement, html, css } from 'lit';
import "./nasa-image.js";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
export class NasaSearch extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      alt: { type: String},
      loading: { type: Boolean, reflect: true },
      items: { type: Array, },
      value: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      :host([loading]) .results {
        opacity: 0.1;
        visibility: hidden;
        height: 1px;
      }
      .results {
        visibility: visible;
        height: 100%;
        opacity: 1;
        transition-delay: .5s;
        transition: .5s all ease-in-out;
        text-align: center;
      }

      details {
        margin: var(--ddd-spacing-4);
        padding: var(--ddd-spacing-4);
        background-color: var(--ddd-theme-default-beaverBlue);
      }

      summary {
       
        padding: var(--ddd-spacing-2);
        color: white;
        font-size: 42px;
      }
      
      input {
        font-size: 20px;
        line-height: 40px;
        width: 100%;
      }

      a{
        text-decoration: none;
      }
    `;
  }

  constructor() {
    super();
    this.value = null;
    this.alt = '';
    this.title = '';
    this.loading = false;
    this.items = [];
  }

  render() {
    return html`
    <h2>${this.title}</h2>
    <details open>
      <summary>Search inputs</summary>
      <div>
        <input id="input" placeholder="Search NASA images" @input="${this.inputChanged}" />
      </div>
    </details>
    <div class="results">
      ${this.items.map((item, index) => html`

      <a href="${item.links[0].href}" target="_blank">
        <nasa-image
          source="${item.links[0].href}"
          title="${item.data[0].title}"
          alt="${this.alt}"
        ></nasa-image>
      </a>
      `)}
    </div>
    `;
  }

  inputChanged(e) {
    this.value = this.shadowRoot.querySelector('#input').value;
  }
  // life cycle will run when anything defined in `properties` is modified
  updated(changedProperties) {
    // see if value changes from user input and is not empty
    if (changedProperties.has('value') && this.value) {
      this.updateResults(this.value);
    }
    else if (changedProperties.has('value') && !this.value) {
      this.items = [];
    }
    // @debugging purposes only
    if (changedProperties.has('items') && this.items.length > 0) {
      console.log(this.items);
    }
  }

  updateResults(value) {
    this.loading = true;
    fetch(`https://images-api.nasa.gov/search?media_type=image&q=${value}`).then(d => d.ok ? d.json(): {}).then(data => {
      if (data.collection) {
        this.items = [];
        this.items = data.collection.items;
        this.loading = false;
      }  
    });
  }

  static get tag() {
    return 'nasa-search';
  }
}
customElements.define(NasaSearch.tag, NasaSearch);
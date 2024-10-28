import { LitElement, html, css } from "lit";

export class NasaImage extends LitElement {

  constructor() {
    super();
    this.title = '';
    this.source = '';
  }

  static get properties() {
    return {
        source: { type: String },
        title: { type: String },
    };
  }

  static get styles() {
    return [css`
    

    .image {
        display: inline-block;
        background-color: var(--ddd-theme-default-navy80);
        height: 300px;
        width: 280px;
        margin: var(--ddd-spacing-4);
        padding-top: var(--ddd-spacing-6);
        text-align: center;
        border-radius: var(--ddd-radius-lg);
        color: var(--ddd-theme-default-accent);
    }

    .image:hover{
        background-color: var(--ddd-theme-default-beaver80);
    }

    .image div {
        font-size: 16px;
        font-weight: bold;
        border-radius: var(--ddd-radius-md);
    }

    .image img {
        width: 240px;
        height: 240px;
    }

    .image div:hover{
        background-color: var(--ddd-theme-default-landgrantBrown);
    }

    `];
  }

  render() {
    return html`
    <div class="image">
        <img src="${this.source}"/>
        <div>${this.title}</div>
    </div>
    `;
  }
  static get tag() {
    return "nasa-image";
  }
}
customElements.define(NasaImage.tag, NasaImage);
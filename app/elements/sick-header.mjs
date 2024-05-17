export default function SickHeader({ html }) {
  return html`
    <header>
      <div class="bar">
        <h1>
          <a href="/">Throwback Games</a>
        </h1>
        <div>
          <slot as="div" name="nav-items"></slot>
        </div>
      </div>
      <slot name="search-bar"></slot>
    </header>
  `;
}

export default function BlogPagination({ html, state }) {
  const { store } = state;
  const { count, page, pageCount } = store;

  const prevClass = page <= 1 ? "disabled" : "";
  const nextClass = page >= pageCount ? "disabled" : "";

  return html`
    <style>
      .disabled {
        pointer-events: none;
        color: grey;
      }
    </style>
    <div class="pagination__styles">
      <a
        class="${prevClass}"
        href="?page=${page - 1}"
        aria-disabled="${page <= 1}"
      >
        <span aria-disabled=${page <= 1}>Prev</span>
      </a>
      <p>Page ${page} of ${pageCount}</p>
      <p>${count} Items Total</p>
      <a
        class=${nextClass}
        aria-disabled="${nextClass}"
        href="?page=${page + 1}"
      >
        <span aria-disabled=${nextClass}>Next</span>
      </a>
    </div>
  `;
}

export default function SignUpForm({ html, state }) {
  const { session } = state.store;

  const successMessage = session?.message
    ? html`<p id="sign__up__success">${session?.message}</p>`
    : null;

  return html`
    <form class="login__form__styles" action="/signup" method="post">
      <h2>Sign Up For an Account</h2>
      <fieldset>
        ${successMessage}
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autocomplete="email"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autocomplete="password"
          />
        </label>
        <button type="submit">Sign Up</button>
      </fieldset>
    </form>
  `;
}

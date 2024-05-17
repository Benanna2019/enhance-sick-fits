export default function SignIn({ html, state }) {
  return html` <form action="/login" method="post" class="login__form__styles">
    <h2>Log In to Your Account</h2>
    <fieldset>
      <div id="email__div">
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="signin__email"
            placeholder="Your Email Address"
          />
        </label>
      </div>
      <div id="password__div">
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="signin__password"
            placeholder="Password"
          />
        </label>
      </div>
      <button type="submit">Sign In!</button>
    </fieldset>
  </form>`;
}

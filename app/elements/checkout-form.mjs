export default function CheckoutForm({ html, state }) {
  return html`
    <form id="checkoutForm" class="checkout__form">
      <div id="card-element"></div>
      <button class="sick__button">
        <span style="font-family: kongtext;">Check Out Now</span>
      </button>
      <div class="submitting__container" style="background: none;">
        <img
          src="/_public/styles/block-loading.svg"
          class="submitting__checkout"
          style="width: 24px; height: 24px; background: none;"
          alt="loading"
        />
      </div>
    </form>

    <script>
      var stripe = Stripe(
        "pk_test_51IVMuwCvGFED1fF2B8kb2I27V7Vx8lkFxSAi4yI4nq8dNGVKZuLiO4jvqRarNyUzcOuOzxmDYd7lDmc3o8ZQdAze00aB3z7e5G"
      );

      console.log("stripe", stripe);
      var elements = stripe.elements();
      var card = elements.create("card");
      var form = document.querySelector(".checkout__form");
      console.log("card", card);
      card.mount("#card-element");

      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        console.log("event", event);
        //htmx.addClass(htmx.find(".submitting__checkout"), "htmx-indicator");
        console.log("hit");

        // this literally dies right here. There is no response from stripe.
        // this works perfectly fine in a normal architect project.
        // so I am not sure what I am missing here. But also,
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card,
        });
        console.log("paymentMethod", paymentMethod);
        console.log("error", error);

        await fetch("/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ paymentMethod: paymentMethod.id }),
        });

        // htmx.ajax("POST", "/checkout", { values: { token: paymentMethod.id } });
      });
    </script>
  `;
}

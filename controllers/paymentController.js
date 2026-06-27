const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
  try {
    const { planName, price } = req.body; 

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd", 
            product_data: { 
              name: `${planName} Membership Plan`,
              description: `Upgrade account to ${planName} package`,
            },
            unit_amount: price * 100, 
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      // ⚡ Redirect hamesha Frontend (localhost:3000) par hoga, backend par nahi!
      success_url: `http://localhost:3000/payment-success?session_id={CHECKOUT_SESSION_ID}&plan=${planName}`,
      cancel_url: `http://localhost:3000/pricing`, 
    });

    res.status(200).json({ id: session.id, url: session.url });
  } catch (error) {
    res.status(500).json({ message: "Stripe Session Error", error: error.message });
  }
}
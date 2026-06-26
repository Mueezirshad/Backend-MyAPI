const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
  try {
    const { planName, price } = req.body; 

    // Stripe Checkout Session create karna
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
            unit_amount: price * 100, // Stripe cents mein amount leta hai
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      // Payment kamyab hone par Success Page par redirect hoga
      success_url: `http://backend-my-api-ten.vercel.app/payment-success?session_id={CHECKOUT_SESSION_ID}&plan=${planName}`,
      // Cancel karne par ya back karne par user wapas pricing page par chala jaye
      cancel_url: `http://backend-my-api-ten.vercel.app/pricing`, 
      customer_email: req.user.email,
    });

    res.status(200).json({ id: session.id, url: session.url });
  } catch (error) {
    res.status(500).json({ message: "Stripe Session Error", error: error.message });
  }
};
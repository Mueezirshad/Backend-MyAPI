// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// exports.createCheckoutSession = async (req, res) => {
//   const { planName, price } = req.body; 

//   try {
//     const session = await stripe.checkout.sessions.create({
//       mode: "payment",
//       // ⚡ Redirect hamesha Frontend (localhost:3000) par hoga, backend par nahi!
//       success_url: `http://localhost:3000/payment-success?session_id={CHECKOUT_SESSION_ID}&plan=${planName}`,
//       cancel_url: `http://localhost:3000/pricing`, 
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "usd", 
//             product_data: { 
//               name: `${planName} Membership Plan`,
//               description: `Upgrade account to ${planName} package`,
//             },
//             unit_amount: price + "00", 
//           },
//           quantity: 1,
//         },
//       ],
      
//     });

//     res.status(200).json({ id: session.id, url: session.url });
//   } catch (error) {
//     res.status(500).json({ message: "Stripe Session Error", error: error.message });
//   }
// }


const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
  try {
    // ⚡ Frontend se jo bhi aa raha hai pehle lock karo
    const { planName } = req.body; 
    
    console.log("Plan Name Received:", planName); // Vercel log mein dekhne ke liye

    if (!planName) {
      return res.status(400).json({ success: false, message: "Plan Name bhejna zaroori hai!" });
    }

    let price = 0;
    const plan = planName.toLowerCase().trim(); // spaces saaf karne ke liye

    if (plan === "silver") {
      price = 10;
    } else if (plan === "gold") {
      price = 25;
    } else if (plan === "platinum") {
      price = 50;
    } else {
      return res.status(400).json({ success: false, message: `Invalid plan name received: ${planName}` });
    }

    // ⚡ Pure Integer calculation (Koi undefined ka chance hi nahi)
    const amount = Math.round(price * 100); 

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd", 
            product_data: { 
              name: `${plan.toUpperCase()} Membership Plan`,
              description: `Upgrade account to ${plan} package`,
            },
            unit_amount: amount, 
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/payment-success?session_id={CHECKOUT_SESSION_ID}&plan=${plan}`,
      cancel_url: `http://localhost:3000/pricing`, 
    });

    return res.status(200).json({ id: session.id, url: session.url });

  } catch (error) {
    console.error("🔴 Stripe Checkout Error:", error.message);
    return res.status(500).json({ 
      message: "Stripe Session Error", 
      error: error.message // Yeh alert mein 'undefined00' phenk raha tha
    });
  }
}
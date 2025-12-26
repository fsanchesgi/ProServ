import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

serve(async (req) => {
  try {
    const { plano, user_id, email } = await req.json();

    const prices: Record<string, number> = {
      basico: 29.9,
      premium: 49.9,
    };

    if (!prices[plano]) {
      return new Response(JSON.stringify({ error: "Plano inválido" }), {
        status: 400,
      });
    }

    const preference = {
      items: [
        {
          title: `Plano ${plano.toUpperCase()} - ProServ`,
          quantity: 1,
          unit_price: prices[plano],
          currency_id: "BRL",
        },
      ],
      payer: {
        email,
      },
      external_reference: user_id,
      back_urls: {
        success: "https://seusite.com/sucesso.html",
        failure: "https://seusite.com/erro.html",
        pending: "https://seusite.com/pendente.html",
      },
      auto_return: "approved",
    };

    const mpResponse = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Deno.env.get(
            "MERCADOPAGO_ACCESS_TOKEN"
          )}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preference),
      }
    );

    const data = await mpResponse.json();

    return new Response(
      JSON.stringify({ init_point: data.init_point }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erro ao criar checkout" }), {
      status: 500,
    });
  }
});

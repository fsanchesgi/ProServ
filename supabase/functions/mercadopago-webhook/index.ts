import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    const body = await req.json();

    if (body.type !== "payment") {
      return new Response("Evento ignorado", { status: 200 });
    }

    const paymentId = body.data.id;

    const paymentResponse = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${Deno.env.get(
            "MERCADOPAGO_ACCESS_TOKEN"
          )}`,
        },
      }
    );

    const payment = await paymentResponse.json();

    if (payment.status !== "approved") {
      return new Response("Pagamento não aprovado", { status: 200 });
    }

    const userId = payment.external_reference;
    const description = payment.description || "";

    const plano =
      description.includes("PREMIUM") ? "premium" : "basico";

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("TOKEN_SUPABASE_SERVICE_ROLE_KEY")!
    );

    await supabase
      .from("profiles")
      .update({
        plano,
        status_assinatura: "ativa",
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    return new Response("Plano atualizado com sucesso", { status: 200 });
  } catch (error) {
    return new Response("Erro no webhook", { status: 500 });
  }
});

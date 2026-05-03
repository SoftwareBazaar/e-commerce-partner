const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM = `You are SmartAlgos Assistant, a friendly expert helping forex traders understand and choose between Expert Advisors (EAs), indicators, trading bots, and mentorship packages on the SmartAlgos platform.

Be concise (2-4 short paragraphs max), warm, and practical. When users ask which tool to choose, ask 1-2 quick clarifying questions about their experience, platform (MT4/MT5), and trading style (scalping, swing, trend, SMC, indices). Recommend specific products when relevant: Smart Reversal Pro, Apex Scalper EA, Engulfing Master, FVG Hunter Bot, Trend Rider EA, SMC Toolkit Bundle. Suggest the Free Discovery Call for unsure beginners. Never give financial advice or guarantees about returns.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { messages } = await req.json();
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) throw new Error("LOVABLE_API_KEY missing");

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "system", content: SYSTEM }, ...messages],
      }),
    });

    if (resp.status === 429) {
      return new Response(JSON.stringify({ reply: "Rate limit reached. Please try again in a moment." }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (resp.status === 402) {
      return new Response(JSON.stringify({ reply: "AI credits depleted. Please contact support." }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (!resp.ok) {
      const text = await resp.text();
      console.error("AI gateway error", resp.status, text);
      throw new Error("AI gateway error");
    }
    const data = await resp.json();
    const reply = data.choices?.[0]?.message?.content ?? "Sorry, no response.";
    return new Response(JSON.stringify({ reply }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ reply: "Sorry, something went wrong." }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});

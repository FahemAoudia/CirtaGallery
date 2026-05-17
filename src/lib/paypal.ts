type PayPalMode = "sandbox" | "live";

function mode(): PayPalMode {
  return process.env.PAYPAL_MODE === "live" ? "live" : "sandbox";
}

function apiBase() {
  return mode() === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";
}

async function getAccessToken(): Promise<string> {
  const id = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;
  if (!id || !secret) {
    throw new Error("PayPal client credentials are not configured");
  }
  const auth = Buffer.from(`${id}:${secret}`).toString("base64");
  const res = await fetch(`${apiBase()}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`PayPal token error: ${res.status} ${t}`);
  }
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

/** After client capture: confirm order is COMPLETED and read payer email if present */
export async function fetchPayPalOrder(orderId: string): Promise<{
  status: string;
  payerEmail?: string;
}> {
  const token = await getAccessToken();
  const res = await fetch(`${apiBase()}/v2/checkout/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`PayPal order fetch failed: ${res.status} ${t}`);
  }
  const order = (await res.json()) as {
    status: string;
    payer?: { email_address?: string };
  };
  return {
    status: order.status,
    payerEmail: order.payer?.email_address,
  };
}

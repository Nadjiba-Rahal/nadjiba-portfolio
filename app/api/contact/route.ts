import { Resend } from "resend";

const recipient = "rahalnadjiba5@gmail.com";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const name = typeof data.name === "string" ? data.name.trim() : "";
    const email = typeof data.email === "string" ? data.email.trim() : "";
    const requestType = typeof data.requestType === "string" ? data.requestType.trim() : "";
    const budget = typeof data.budget === "string" ? data.budget.trim() : "";
    const timeline = typeof data.timeline === "string" ? data.timeline.trim() : "";
    const details = typeof data.details === "string" ? data.details.trim() : "";

    if (!name || !email || !requestType || !details) {
      return Response.json({ error: "Please complete the required fields." }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      return Response.json({ error: "Email delivery is not configured yet." }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from: "Website brief <onboarding@resend.dev>",
      to: recipient,
      replyTo: email,
      subject: `Project brief from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Request type: ${requestType}`,
        `Budget: ${budget || "Not specified"}`,
        `Timeline: ${timeline || "Not specified"}`,
        "",
        "Project details:",
        details,
      ].join("\n"),
    });

    if (result.error) {
      console.error("Resend email error:", result.error.message);
      return Response.json({ error: result.error.message }, { status: 502 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return Response.json({ error: "The email could not be sent." }, { status: 500 });
  }
}

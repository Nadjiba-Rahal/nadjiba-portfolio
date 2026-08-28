import { Resend } from "resend";

const recipient = "rahalnadjiba5@gmail.com";

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] || character);
}

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
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeRequestType = escapeHtml(requestType);
    const safeBudget = escapeHtml(budget || "Not specified");
    const safeTimeline = escapeHtml(timeline || "Not specified");
    const safeDetails = escapeHtml(details).replace(/\r?\n/g, "<br />");
    const result = await resend.emails.send({
      from: "Website brief <onboarding@resend.dev>",
      to: recipient,
      replyTo: email,
      subject: `Project brief from ${name}`,
      html: `
        <div style="margin:0;background:#0d0c13;color:#f3f0f8;font-family:Arial,Helvetica,sans-serif;padding:32px 16px;">
          <div style="max-width:680px;margin:0 auto;background:#15131e;border:1px solid #3a3548;">
            <div style="padding:28px 32px;background:#0d0c13;border-bottom:1px solid #3a3548;">
              <div style="color:#b39cff;font-family:monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;">NADJIBA RAHAL / WEBSITE</div>
              <h1 style="margin:18px 0 0;color:#f3f0f8;font-size:30px;line-height:1.1;font-weight:600;">New project brief</h1>
              <p style="margin:10px 0 0;color:#aaa4b5;font-size:15px;line-height:1.5;">Someone has sent you a new project request.</p>
            </div>
            <div style="padding:32px;">
              <div style="margin-bottom:28px;padding:20px;background:#1a1725;border-left:3px solid #b39cff;">
                <div style="color:#706a7d;font-family:monospace;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;">From</div>
                <div style="margin-top:8px;color:#f3f0f8;font-size:22px;">${safeName}</div>
                <a href="mailto:${safeEmail}" style="display:inline-block;margin-top:6px;color:#b39cff;font-size:14px;">${safeEmail}</a>
              </div>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin-bottom:28px;">
                <tr><td style="width:50%;padding:14px 12px 14px 0;border-bottom:1px solid #3a3548;"><div style="color:#706a7d;font-family:monospace;font-size:10px;text-transform:uppercase;">Request type</div><div style="margin-top:6px;color:#f3f0f8;font-size:15px;">${safeRequestType}</div></td><td style="width:50%;padding:14px 0 14px 12px;border-bottom:1px solid #3a3548;"><div style="color:#706a7d;font-family:monospace;font-size:10px;text-transform:uppercase;">Budget</div><div style="margin-top:6px;color:#f3f0f8;font-size:15px;">${safeBudget}</div></td></tr>
                <tr><td colspan="2" style="padding:14px 0;border-bottom:1px solid #3a3548;"><div style="color:#706a7d;font-family:monospace;font-size:10px;text-transform:uppercase;">Timeline</div><div style="margin-top:6px;color:#f3f0f8;font-size:15px;">${safeTimeline}</div></td></tr>
              </table>
              <div style="color:#706a7d;font-family:monospace;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;">Project details</div>
              <div style="margin-top:12px;color:#f3f0f8;font-size:16px;line-height:1.7;">${safeDetails}</div>
              <a href="mailto:${safeEmail}" style="display:inline-block;margin-top:30px;padding:13px 18px;background:#b39cff;color:#0d0c13;font-size:13px;font-weight:bold;text-decoration:none;">Reply to ${safeName}</a>
            </div>
            <div style="padding:18px 32px;border-top:1px solid #3a3548;color:#706a7d;font-family:monospace;font-size:10px;letter-spacing:1px;text-transform:uppercase;">AI / SOFTWARE / DATA / AUTOMATION</div>
          </div>
        </div>
      `,
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

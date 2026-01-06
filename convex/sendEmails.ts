import { components } from "./_generated/api";
import { Resend } from "@convex-dev/resend";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Types for components.resend will be generated after running `npx convex dev`
export const resend: Resend = new Resend((components as any).resend, {
  testMode: false,
});
export const sendContactForm = mutation({
  args: {
    name: v.string(),
    businessName: v.string(),
    email: v.string(),
    service: v.string(),
    budget: v.string(),
    phone: v.string(),
    details: v.string(),
  },
  handler: async (ctx, args) => {
    // 1. Check for existing user
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    let userId;

    if (existingUser) {
      // 2. Update existing user
      userId = existingUser._id;
      await ctx.db.patch(existingUser._id, {
        name: args.name,
        phone: args.phone,
        businessName: args.businessName || undefined,
        lastContactAt: Date.now(),
      });
    } else {
      // 3. Create new user
      userId = await ctx.db.insert("users", {
        name: args.name,
        email: args.email,
        phone: args.phone,
        businessName: args.businessName || undefined,
        lastContactAt: Date.now(),
      });
    }

    // 4. Save contact submission linked to user
    await ctx.db.insert("contacts", {
      name: args.name,
      email: args.email,
      service: args.service,
      budget: args.budget,
      phone: args.phone,
      details: args.details,
      businessName: args.businessName || undefined,
      userId: userId,
    });

    // Send email
    await resend.sendEmail(ctx, {
      from: "Shadow Forge Contact <onboarding@resend.dev>",
      to: "harishmkdev@gmail.com",
      replyTo: [args.email],
      subject: `🚀 New Lead: ${args.name} - ${args.service}`,
      text: `
New Project Inquiry from Shadow Forge

Name: ${args.name}
Email: ${args.email}
Phone: ${args.phone}

Service Interest: ${args.service}
Budget Range: ${args.budget}

Project Details:
${args.details}

---
This inquiry was submitted via Shadow Forge contact form.
Reply directly to this email to contact ${args.name}.
      `,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Project Inquiry</title>
        </head>
        <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 0; padding: 40px 20px;">
            <tr>
              <td align="center">
                <!-- Main Container -->
                <table role="presentation" style="max-width: 600px; width: 100%; background: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);">
                  
                  <!-- Header with Gradient -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 40px 40px 30px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">
                        ✨ New Project Inquiry
                      </h1>
                      <p style="margin: 12px 0 0; color: #a0a0a0; font-size: 16px; font-weight: 400;">
                        Shadow Forge Contact Form
                      </p>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      
                      <!-- Client Info Section -->
                      <div style="margin-bottom: 32px;">
                        <h2 style="margin: 0 0 20px; color: #1a1a1a; font-size: 20px; font-weight: 600; border-bottom: 2px solid #f0f0f0; padding-bottom: 12px;">
                          👤 Client Information
                        </h2>
                        
                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                          <tr>
                            <td style="padding: 12px 0;">
                              <span style="display: block; color: #666; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Name</span>
                              <span style="display: block; color: #1a1a1a; font-size: 18px; font-weight: 600;">${args.name}</span>
                            </td>
                          </tr>
                          ${
                            args.businessName
                              ? `
                          <tr>
                            <td style="padding: 12px 0;">
                              <span style="display: block; color: #666; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Business/Shop</span>
                              <span style="display: block; color: #1a1a1a; font-size: 18px; font-weight: 600;">${args.businessName}</span>
                            </td>
                          </tr>
                          `
                              : ""
                          }
                          <tr>
                            <td style="padding: 12px 0;">
                              <span style="display: block; color: #666; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Email</span>
                              <a href="mailto:${args.email}" style="display: block; color: #4f46e5; font-size: 18px; font-weight: 600; text-decoration: none;">${args.email}</a>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 12px 0;">
                              <span style="display: block; color: #666; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Phone</span>
                              <a href="tel:${args.phone}" style="display: block; color: #1a1a1a; font-size: 18px; font-weight: 600; text-decoration: none;">${args.phone}</a>
                            </td>
                          </tr>
                        </table>
                      </div>

                      <!-- Project Details Section -->
                      <div style="background: linear-gradient(135deg, #f8f9fa 0%, #f1f3f5 100%); border-radius: 16px; padding: 24px; margin-bottom: 32px; border-left: 4px solid #4f46e5;">
                        <h2 style="margin: 0 0 16px; color: #1a1a1a; font-size: 20px; font-weight: 600;">
                          💼 Project Details
                        </h2>
                        
                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                          <tr>
                            <td style="padding: 10px 0;">
                              <span style="display: block; color: #666; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Service Interest</span>
                              <span style="display: inline-block; background: #4f46e5; color: #ffffff; font-size: 16px; font-weight: 600; padding: 8px 16px; border-radius: 8px;">${args.service}</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 10px 0;">
                              <span style="display: block; color: #666; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Budget Range</span>
                              <span style="display: inline-block; background: #10b981; color: #ffffff; font-size: 16px; font-weight: 600; padding: 8px 16px; border-radius: 8px;">${args.budget}</span>
                            </td>
                          </tr>
                        </table>
                      </div>

                      <!-- Message Section -->
                      ${
                        args.details
                          ? `
                      <div style="margin-bottom: 32px;">
                        <h2 style="margin: 0 0 16px; color: #1a1a1a; font-size: 20px; font-weight: 600; border-bottom: 2px solid #f0f0f0; padding-bottom: 12px;">
                          💬 Project Description
                        </h2>
                        <p style="margin: 0; color: #4a5568; font-size: 16px; line-height: 1.7; white-space: pre-wrap; background: #f9fafb; padding: 20px; border-radius: 12px; border: 1px solid #e5e7eb;">
                          ${args.details}
                        </p>
                      </div>
                      `
                          : ""
                      }

                      <!-- CTA Button -->
                      <div style="text-align: center; margin-top: 32px;">
                        <a href="mailto:${args.email}?subject=Re: Your Project Inquiry - ${args.service}" style="display: inline-block; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); color: #ffffff; font-size: 16px; font-weight: 600; padding: 16px 40px; border-radius: 12px; text-decoration: none; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); transition: transform 0.2s;">
                          📧 Reply to ${args.name}
                        </a>
                      </div>

                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background: #f9fafb; padding: 24px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
                      <p style="margin: 0; color: #9ca3af; font-size: 14px; line-height: 1.6;">
                        This inquiry was submitted via <strong style="color: #1a1a1a;">Shadow Forge</strong> contact form<br>
                        <span style="font-size: 12px;">Reply directly to this email to contact the client</span>
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });
  },
});

# ElevenLabs AI Agent Integration Guide

## Overview

The Shadow Forge website now has full integration with the ElevenLabs AI agent (Jessica). The agent can collect user information through conversation and automatically fill the contact form.

---

## Features Implemented

### 1. **AI-to-Form Integration**

The contact form exposes two global JavaScript functions that the AI agent can call:

#### `window.fillContactForm(data)`

Fills the contact form with user data collected by the AI.

**Parameters:**

```typescript
{
  name?: string;        // User's full name
  service?: string;     // Selected service (must match one from the list)
  budget?: string;      // Project budget (e.g., "₹5k-10k")
  email?: string;       // User's email address
  phone?: string;       // User's phone number
  details?: string;     // Additional project details
}
```

**Example Usage:**

```javascript
window.fillContactForm({
  name: "John Doe",
  service: "Full website",
  budget: "₹10k-15k",
  email: "john@example.com",
  phone: "+91 9876543210",
  details: "Need an e-commerce website for my startup",
});
```

#### `window.submitContactForm()`

Programmatically submits the contact form after it's been filled.

**Example Usage:**

```javascript
// Fill the form first
window.fillContactForm({...});

// Then submit it
window.submitContactForm();
```

---

### 2. **Available Services**

The AI agent should only use these exact service names when filling the form:

- "Landing page"
- "Full website"
- "Website SEO"
- "E-commerce"
- "UI/UX to design conversion"
- "Logo design"

---

### 3. **Available Budget Options**

The AI agent should only use these exact budget values:

- "₹2k-3k"
- "₹3k-5k"
- "₹5k-10k"
- "₹10k-15k"
- "₹15k-20k"
- ">₹20k"

---

### 4. **Mobile Responsive Widget**

The ElevenLabs widget is now fully responsive:

- **Desktop (≥768px)**: Full size, positioned 24px from bottom-right
- **Tablet (≤767px)**: 90% scale, positioned 16px from bottom-right
- **Mobile (≤480px)**: 85% scale, positioned 12px from bottom-right

The widget automatically adjusts to avoid interfering with mobile navigation.

---

## AI Agent Configuration

### Recommended Agent Behavior

1. **Greeting**:

   - "Hi! I'm Jessica, Shadow Forge's AI assistant. I can help you schedule a consultation, answer questions about our services, or fill out the contact form for you. How can I help today?"

2. **Information Collection**:

   - Ask for user's name
   - Ask what service they're interested in
   - Ask about their budget range
   - Ask for email and phone number
   - Ask if they have any specific requirements

3. **Form Filling**:

   - Once all information is collected, say: "Great! Let me fill out the contact form for you."
   - Call `window.fillContactForm(data)` with the collected information
   - The form will auto-scroll into view
   - Ask: "I've filled out the form with your information. Would you like me to submit it now?"

4. **Form Submission**:
   - If user confirms, call `window.submitContactForm()`
   - Confirm: "Perfect! Your request has been submitted. Our team will contact you at [email] within 24 hours."

---

## Example Conversation Flow

```
AI: Hi! I'm Jessica, Shadow Forge's AI assistant. How can I help you today?

User: I need a website for my business.

AI: Great! I'd love to help you with that. Can I get your name?

User: John Doe

AI: Nice to meet you, John! What type of website are you looking for?
We offer: Landing pages, Full websites, E-commerce, Website SEO,
UI/UX to design conversion, and Logo design.

User: I need a full website with e-commerce

AI: Perfect! What's your budget range for this project?
₹2k-3k, ₹3k-5k, ₹5k-10k, ₹10k-15k, ₹15k-20k, or >₹20k?

User: Around 10k to 15k

AI: Excellent! Can I get your email address?

User: john@example.com

AI: And your phone number?

User: +91 9876543210

AI: Do you have any specific requirements or details about your project?

User: Yes, I need it to sell handmade jewelry

AI: Perfect! Let me fill out the contact form for you with all this information.
[Calls window.fillContactForm()]
I've filled out the form. Would you like me to submit it now?

User: Yes, please

AI: [Calls window.submitContactForm()]
Done! Your request has been submitted. Our team will contact you at
john@example.com within 24 hours. Is there anything else I can help you with?
```

---

## Testing the Integration

### Manual Testing in Browser Console

1. Open the website: `http://localhost:3001`
2. Scroll to the contact section
3. Open browser console (F12)
4. Test filling the form:

```javascript
window.fillContactForm({
  name: "Test User",
  service: "Full website",
  budget: "₹10k-15k",
  email: "test@example.com",
  phone: "+91 1234567890",
  details: "This is a test",
});
```

5. Test submitting the form:

```javascript
window.submitContactForm();
```

---

## Form Validation

The form has built-in HTML5 validation:

- **Name**: Required field
- **Email**: Required, must be valid email format
- **Phone**: Required field
- **Service**: User must select from dropdown
- **Budget**: User must select one option
- **Details**: Optional field

If the AI tries to submit an incomplete form, the browser will show validation errors.

---

## Security Considerations

1. **Data Validation**: All form inputs are validated on the client side
2. **XSS Protection**: React automatically escapes user input
3. **Form Submission**: Currently shows an alert (replace with actual backend API call)

---

## Next Steps

### For Production:

1. **Backend Integration**:

   - Replace the `alert()` in `handleSubmit` with actual API call
   - Send form data to your backend/CRM
   - Add email notification system

2. **ElevenLabs Agent Configuration**:

   - Configure the agent with the conversation flow above
   - Add the JavaScript functions to the agent's knowledge base
   - Test the full conversation flow

3. **Analytics**:
   - Track AI-assisted form submissions
   - Monitor conversion rates
   - A/B test AI vs manual form filling

---

## Troubleshooting

### Form not filling?

- Check browser console for errors
- Verify the data format matches the interface
- Ensure service and budget values match exactly

### Form not submitting?

- Check if all required fields are filled
- Verify email format is valid
- Check browser console for validation errors

### Widget not visible on mobile?

- Clear browser cache
- Check if the widget script is loaded
- Verify CSS is not being overridden

---

## Support

For issues or questions:

- Check browser console for errors
- Review the form state in React DevTools
- Test the global functions manually first

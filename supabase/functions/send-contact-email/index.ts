import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  type: 'contact' | 'landlord' | 'room-application';
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
  inquiry?: string;
  // Room application specific fields
  selectedRoom?: string;
  moveInDate?: string;
  stayDuration?: string;
  nairobiPurpose?: string;
  selectedCharacteristics?: string[];
  nationality?: string;
  occupation?: string;
  additionalMessage?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    console.log("Received form submission:", formData);

    let emailSubject = "";
    let emailContent = "";

    // Generate email content based on form type
    switch (formData.type) {
      case 'contact':
        emailSubject = `Contact Form: ${formData.subject || 'New Inquiry'}`;
        emailContent = `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
          <p><strong>Inquiry Type:</strong> ${formData.inquiry || 'Not specified'}</p>
          <p><strong>Subject:</strong> ${formData.subject || 'No subject'}</p>
          <p><strong>Message:</strong></p>
          <p>${(formData.message || '').replace(/\n/g, '<br>')}</p>
        `;
        break;

      case 'landlord':
        emailSubject = "Landlord Partnership Inquiry";
        emailContent = `
          <h2>New Landlord Partnership Inquiry</h2>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Property Information & Partnership Interest:</strong></p>
          <p>${(formData.message || '').replace(/\n/g, '<br>')}</p>
        `;
        break;

      case 'room-application':
        emailSubject = `Room Application from ${formData.name}`;
        emailContent = `
          <h2>New Room Application</h2>
          <h3>Personal Information</h3>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
          <p><strong>Nationality:</strong> ${formData.nationality || 'Not provided'}</p>
          <p><strong>Occupation:</strong> ${formData.occupation || 'Not provided'}</p>
          
          <h3>Room Preferences</h3>
          <p><strong>Selected Room:</strong> ${formData.selectedRoom || 'Not specified'}</p>
          <p><strong>Move-in Date:</strong> ${formData.moveInDate || 'Not specified'}</p>
          <p><strong>Stay Duration:</strong> ${formData.stayDuration ? `${formData.stayDuration} month(s)` : 'Not specified'}</p>
          <p><strong>Purpose in Nairobi:</strong> ${formData.nairobiPurpose || 'Not provided'}</p>
          
          <h3>Preferred Living Vibes</h3>
          <ul>
            ${formData.selectedCharacteristics?.map(char => `<li>${char}</li>`).join('') || '<li>None selected</li>'}
          </ul>
          
          ${formData.additionalMessage ? `
            <h3>Additional Message</h3>
            <p>${formData.additionalMessage.replace(/\n/g, '<br>')}</p>
          ` : ''}
        `;
        break;

      default:
        throw new Error('Invalid form type');
    }

    const emailResponse = await resend.emails.send({
      from: "Anza Living <onboarding@resend.dev>",
      to: ["anzalivingnbo@gmail.com"],
      subject: emailSubject,
      html: emailContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, id: emailResponse.data?.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
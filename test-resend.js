// Quick test to verify Resend API key works
const API_KEY = "re_jP7Afsv9_NXVtsrfMzfEseVVe6kceiyZN";

async function testResend() {
  try {
    console.log("Testing Resend API with key:", API_KEY.substring(0, 10) + "...");
    
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: "birdbiggest651@gmail.com",
        subject: "🍎 Test Email from Fresh Tropics",
        html: "<h1>Test Email</h1><p>This is a test email from Fresh Tropics using Resend</p>"
      })
    });

    console.log("Response status:", response.status);
    const data = await response.json();
    console.log("Response data:", JSON.stringify(data, null, 2));
    
    if (response.ok) {
      console.log("✅ SUCCESS! Email sent successfully!");
    }
    
  } catch (error) {
    console.error("Error:", error.message);
  }
}

testResend();

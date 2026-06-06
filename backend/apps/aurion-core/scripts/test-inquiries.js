// Integration test script for inquiries endpoints
const BASE = process.env.BASE ?? 'http://localhost:9000';

async function runTest(label, payload, expectedStatus) {
  console.log(`\n--- Test: ${label} ---`);
  try {
    const res = await fetch(`${BASE}/inquiries`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const body = await res.json().catch(() => null);
    console.log(`Response Status: ${res.status} (Expected: ${expectedStatus})`);
    
    if (res.status === expectedStatus) {
      console.log('✔ PASS');
      if (res.status >= 200 && res.status < 300) {
        console.log(`Saved Record ID: ${body.id}`);
        console.log(`Saved websitePlatforms: ${JSON.stringify(body.websitePlatforms)}`);
        console.log(`Saved requiredPages: ${JSON.stringify(body.requiredPages)}`);
        console.log(`Saved name/fullName: ${body.name}`);
        console.log(`Saved customRequests/customRequirements: ${body.customRequests}`);
      }
      return true;
    } else {
      console.log('❌ FAIL');
      console.log('Response Body:', JSON.stringify(body, null, 2));
      return false;
    }
  } catch (err) {
    console.error('❌ Connection/Execution Error:', err.message);
    return false;
  }
}

(async function main() {
  console.log(`Testing inquiries API at ${BASE}...`);

  // Test 1: Legacy submission (backward compatibility)
  const legacyPayload = {
    name: "Legacy User",
    email: "legacy.user@example.com",
    phone: "+91 9999999999",
    businessType: ["Clinic"],
    operationalGoal: ["Lead Generation"],
    currentWebsite: ["No website"],
    pages: ["Homepage", "Contact Page"],
    features: ["WhatsApp Integration"],
    infrastructure: ["Hosting & Deployment"],
    support: "Monthly Maintenance",
    customRequests: "Legacy custom comments"
  };
  const t1 = await runTest("Legacy Format Submission", legacyPayload, 201);

  // Test 2: Extended new submission
  const newPayload = {
    fullName: "Extended User",
    email: "extended.user@example.com",
    phone: "+91 8888888888",
    businessType: "Restaurant", // Test string-to-array conversion
    websitePlatforms: ["WordPress", "Shopify"],
    budgetRange: "₹10,000–₹20,000",
    needDomain: true,
    needHosting: true,
    googleBusinessProfile: true,
    instagramBusinessPage: true,
    facebookBusinessPage: false,
    primaryGoal: "Appointment Booking",
    requiredPages: ["Home", "About", "Services", "FAQ"],
    customRequirements: "New custom requirements text"
  };
  const t2 = await runTest("Extended Format Submission", newPayload, 201);

  // Test 3: Reject invalid websitePlatforms
  const invalidPlatformPayload = {
    fullName: "Platform Errors",
    email: "err1@example.com",
    websitePlatforms: ["WordPress", "SquareSpaceInvalid"], // Invalid option
    budgetRange: "Not Decided",
    primaryGoal: "Portfolio"
  };
  const t3 = await runTest("Reject Invalid Website Platform Options", invalidPlatformPayload, 400);

  // Test 4: Reject invalid budgetRange
  const invalidBudgetPayload = {
    fullName: "Budget Errors",
    email: "err2@example.com",
    websitePlatforms: ["WordPress"],
    budgetRange: "₹50,000+", // Invalid budget enum option
    primaryGoal: "Portfolio"
  };
  const t4 = await runTest("Reject Invalid Budget Range Option", invalidBudgetPayload, 400);

  // Test 5: Reject missing email (required field)
  const missingEmailPayload = {
    fullName: "No Email",
    budgetRange: "Not Decided"
  };
  const t5 = await runTest("Reject Missing Email Field", missingEmailPayload, 400);

  console.log('\n--- Final Test Summary ---');
  if (t1 && t2 && t3 && t4 && t5) {
    console.log('ALL TESTS PASSED SUCCESSFULLY! 🚀');
    process.exit(0);
  } else {
    console.log('SOME TESTS FAILED. ❌');
    process.exit(1);
  }
})();

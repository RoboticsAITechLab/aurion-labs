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
      let createdId = null;
      if (res.status >= 200 && res.status < 300 && body) {
        createdId = body.id;
        console.log(`Saved Record ID: ${createdId}`);
        console.log(`Saved websitePlatforms: ${JSON.stringify(body.websitePlatforms)}`);
        console.log(`Saved requiredPages: ${JSON.stringify(body.requiredPages)}`);
        console.log(`Saved name/fullName: ${body.name}`);
        console.log(`Saved customRequests/customRequirements: ${body.customRequests}`);
      }
      return { success: true, id: createdId };
    } else {
      console.log('❌ FAIL');
      console.log('Response Body:', JSON.stringify(body, null, 2));
      return { success: false };
    }
  } catch (err) {
    console.error('❌ Connection/Execution Error:', err.message);
    return { success: false };
  }
}

(async function main() {
  console.log(`Testing inquiries API at ${BASE}...`);

  let legacyId = null;
  let extendedId = null;

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
  const t1Result = await runTest("Legacy Format Submission", legacyPayload, 201);
  const t1 = t1Result.success;
  legacyId = t1Result.id;

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
  const t2Result = await runTest("Extended Format Submission", newPayload, 201);
  const t2 = t2Result.success;
  extendedId = t2Result.id;

  // Test 3: Reject invalid websitePlatforms
  const invalidPlatformPayload = {
    fullName: "Platform Errors",
    email: "err1@example.com",
    websitePlatforms: ["WordPress", "SquareSpaceInvalid"], // Invalid option
    budgetRange: "Not Decided",
    primaryGoal: "Portfolio"
  };
  const t3Result = await runTest("Reject Invalid Website Platform Options", invalidPlatformPayload, 400);
  const t3 = t3Result.success;

  // Test 4: Reject invalid budgetRange
  const invalidBudgetPayload = {
    fullName: "Budget Errors",
    email: "err2@example.com",
    websitePlatforms: ["WordPress"],
    budgetRange: "₹50,000+", // Invalid budget enum option
    primaryGoal: "Portfolio"
  };
  const t4Result = await runTest("Reject Invalid Budget Range Option", invalidBudgetPayload, 400);
  const t4 = t4Result.success;

  // Test 5: Reject missing email (required field)
  const missingEmailPayload = {
    fullName: "No Email",
    budgetRange: "Not Decided"
  };
  const t5Result = await runTest("Reject Missing Email Field", missingEmailPayload, 400);
  const t5 = t5Result.success;

  // New Integration Tests for PATCH status & notes updates
  console.log('\n--- Creating Record for PATCH Update Testing ---');
  let t6 = false;
  let t7 = false;
  let t8 = false;
  try {
    const createRes = await fetch(`${BASE}/inquiries`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ fullName: "Patch Tester", email: "patch.tester@example.com", budgetRange: "Under ₹5,000" }),
    });
    const createdRecord = await createRes.json();
    const recordId = createdRecord.id;
    console.log(`Created Record ID: ${recordId}`);

    // Test 6: Valid PATCH Status update
    console.log(`\n--- Test: Valid PATCH Status Update ---`);
    const statusRes = await fetch(`${BASE}/inquiries/${recordId}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ status: 'CONTACTED' }),
    });
    const statusBody = await statusRes.json();
    t6 = statusRes.status === 200 && statusBody.status === 'CONTACTED';
    console.log(`Response Status: ${statusRes.status} (Expected: 200)`);
    console.log(`Updated Status: ${statusBody.status}`);
    console.log(t6 ? '✔ PASS' : '❌ FAIL');

    // Test 7: Valid PATCH Notes update
    console.log(`\n--- Test: Valid PATCH Notes Update ---`);
    const notesRes = await fetch(`${BASE}/inquiries/${recordId}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ notes: 'These are internal admin notes.' }),
    });
    const notesBody = await notesRes.json();
    t7 = notesRes.status === 200 && notesBody.notes === 'These are internal admin notes.';
    console.log(`Response Status: ${notesRes.status} (Expected: 200)`);
    console.log(`Updated Notes: ${notesBody.notes}`);
    console.log(t7 ? '✔ PASS' : '❌ FAIL');

    // Test 8: Reject Invalid Status update
    console.log(`\n--- Test: Reject Invalid Status ---`);
    const invalidStatusRes = await fetch(`${BASE}/inquiries/${recordId}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ status: 'INVALID_STATUS' }),
    });
    t8 = invalidStatusRes.status === 400;
    console.log(`Response Status: ${invalidStatusRes.status} (Expected: 400)`);
    console.log(t8 ? '✔ PASS' : '❌ FAIL');

    // Cleanup
    console.log('\n--- Cleaning up test records ---');
    if (legacyId) {
      console.log(`Deleting legacy test record ID: ${legacyId}`);
      await fetch(`${BASE}/inquiries/${legacyId}`, { method: 'DELETE' });
    }
    if (extendedId) {
      console.log(`Deleting extended test record ID: ${extendedId}`);
      await fetch(`${BASE}/inquiries/${extendedId}`, { method: 'DELETE' });
    }
    if (recordId) {
      console.log(`Deleting patch test record ID: ${recordId}`);
      await fetch(`${BASE}/inquiries/${recordId}`, { method: 'DELETE' });
    }
  } catch (err) {
    console.error('❌ PATCH testing execution error:', err.message);
  }

  console.log('\n--- Final Test Summary ---');
  if (t1 && t2 && t3 && t4 && t5 && t6 && t7 && t8) {
    console.log('ALL TESTS PASSED SUCCESSFULLY! 🚀');
    process.exit(0);
  } else {
    console.log('SOME TESTS FAILED. ❌');
    process.exit(1);
  }
})();

// Integration test script for price negotiation and custom overrides
const BASE = process.env.BASE ?? 'http://localhost:9000';

async function runTest() {
  console.log(`Testing negotiation flow at ${BASE}...`);
  let recordId = null;

  try {
    // 1. Create a new scoping inquiry
    console.log('\nStep 1: Creating a mock inquiry...');
    const createRes = await fetch(`${BASE}/inquiries`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        fullName: "Negotiation Tester",
        email: "negotiation.tester@example.com",
        phone: "9999999999",
        businessType: "E-Commerce",
        websitePlatforms: ["Shopify"],
        budgetRange: "₹20,000+",
        requiredPages: ["Home", "Custom"],
        primaryGoal: "Online Store",
        support: "Monthly Maintenance"
      }),
    });
    
    if (!createRes.ok) {
      const errBody = await createRes.json().catch(() => ({}));
      throw new Error(`Failed to create inquiry: ${createRes.status}. Details: ${JSON.stringify(errBody)}`);
    }
    
    const inquiry = await createRes.json();
    recordId = inquiry.id;
    console.log(`✔ Inquiry created with ID: ${recordId}`);

    // 2. Fetch the initial proposal details
    console.log('\nStep 2: Fetching the default rule-based proposal...');
    const propRes1 = await fetch(`${BASE}/inquiries/${recordId}/proposal`);
    if (!propRes1.ok) {
      throw new Error(`Failed to get proposal: ${propRes1.status}`);
    }
    const propData1 = await propRes1.json();
    console.log(`✔ Original Pricing: Setup: ${propData1.pricing.oneTimeFee} | Monthly: ${propData1.pricing.monthlyFee}`);
    
    // Assert defaults
    if (propData1.pricing.oneTimeFee !== '₹34,999' || propData1.pricing.monthlyFee !== '₹999/mo') {
      console.error(`❌ Expected default setup ₹34,999 and monthly ₹999/mo, got: Setup: ${propData1.pricing.oneTimeFee}, Monthly: ${propData1.pricing.monthlyFee}`);
      process.exit(1);
    }

    // 3. Simulate Client submitting a counter-offer
    console.log('\nStep 3: Simulating client submitting a counter offer...');
    const clientOfferPatch = await fetch(`${BASE}/inquiries/${recordId}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        clientSetupOffer: "₹25,000",
        clientMonthlyOffer: "₹800/mo",
        clientMessage: "We have a strict limit of 25k setup, but monthly of 800 is perfect.",
        status: "REVIEWED"
      }),
    });
    
    if (!clientOfferPatch.ok) {
      throw new Error(`Failed to patch client offer: ${clientOfferPatch.status}`);
    }
    const clientPatchData = await clientOfferPatch.json();
    console.log(`✔ Counter offer stored: Setup: ${clientPatchData.clientSetupOffer} | Monthly: ${clientPatchData.clientMonthlyOffer}`);
    console.log(`✔ Message: "${clientPatchData.clientMessage}" | Status: ${clientPatchData.status}`);

    if (clientPatchData.clientSetupOffer !== '₹25,000' || clientPatchData.status !== 'REVIEWED') {
      console.error('❌ Counter-offer details mismatch in patched response');
      process.exit(1);
    }

    // 4. Fetch proposal during active counter-offer (should still show original prices until accepted)
    console.log('\nStep 4: Fetching proposal during active negotiation...');
    const propRes2 = await fetch(`${BASE}/inquiries/${recordId}/proposal`);
    const propData2 = await propRes2.json();
    console.log(`✔ Proposal Pricing is still original: Setup: ${propData2.pricing.oneTimeFee} | Monthly: ${propData2.pricing.monthlyFee}`);
    if (propData2.pricing.oneTimeFee !== '₹34,999') {
      console.error('❌ Proposal pricing should not change until override is set');
      process.exit(1);
    }

    // 5. Simulate Admin overriding prices manually (not accepting yet, just a custom price)
    console.log('\nStep 5: Simulating admin setting custom price override...');
    const customOverridePatch = await fetch(`${BASE}/inquiries/${recordId}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        adjustedSetupFee: "₹30,000",
        adjustedMonthlyFee: "₹950/mo"
      }),
    });
    if (!customOverridePatch.ok) {
      throw new Error(`Failed to patch custom override: ${customOverridePatch.status}`);
    }
    const overrideData = await customOverridePatch.json();
    console.log(`✔ Custom overrides saved: Setup: ${overrideData.adjustedSetupFee} | Monthly: ${overrideData.adjustedMonthlyFee}`);
    
    // Check proposal endpoint returns overrides
    const propRes3 = await fetch(`${BASE}/inquiries/${recordId}/proposal`);
    const propData3 = await propRes3.json();
    console.log(`✔ Proposal Pricing now reflects custom override: Setup: ${propData3.pricing.oneTimeFee} | Monthly: ${propData3.pricing.monthlyFee}`);
    if (propData3.pricing.oneTimeFee !== '₹30,000' || propData3.pricing.monthlyFee !== '₹950/mo') {
      console.error('❌ Proposal did not reflect custom overrides');
      process.exit(1);
    }

    // 6. Simulate Admin accepting client's counter-offer (copies offer to adjusted fees, clears offers, status -> CONVERTED)
    console.log('\nStep 6: Simulating admin accepting the client counter offer...');
    const acceptCounterPatch = await fetch(`${BASE}/inquiries/${recordId}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        adjustedSetupFee: "₹25,000", 
        adjustedMonthlyFee: "₹800/mo",
        clientSetupOffer: null,
        clientMonthlyOffer: null,
        status: "CONVERTED"
      }),
    });
    if (!acceptCounterPatch.ok) {
      throw new Error(`Failed to accept counter offer: ${acceptCounterPatch.status}`);
    }
    const acceptData = await acceptCounterPatch.json();
    console.log(`✔ Accepted Counter Offer successfully:`);
    console.log(`  - status: ${acceptData.status}`);
    console.log(`  - adjustedSetupFee: ${acceptData.adjustedSetupFee}`);
    console.log(`  - adjustedMonthlyFee: ${acceptData.adjustedMonthlyFee}`);
    console.log(`  - clientSetupOffer: ${acceptData.clientSetupOffer}`);
    console.log(`  - clientMonthlyOffer: ${acceptData.clientMonthlyOffer}`);

    if (
      acceptData.status !== 'CONVERTED' ||
      acceptData.adjustedSetupFee !== '₹25,000' ||
      acceptData.adjustedMonthlyFee !== '₹800/mo' ||
      acceptData.clientSetupOffer !== null ||
      acceptData.clientMonthlyOffer !== null
    ) {
      console.error('❌ Data mismatch after accepting counter-offer');
      process.exit(1);
    }

    // 7. Verify the proposal reflects accepted counter-offer prices
    console.log('\nStep 7: Verifying proposal reflects final negotiated rates...');
    const propRes4 = await fetch(`${BASE}/inquiries/${recordId}/proposal`);
    const propData4 = await propRes4.json();
    console.log(`✔ Final proposal pricing: Setup: ${propData4.pricing.oneTimeFee} | Monthly: ${propData4.pricing.monthlyFee}`);
    if (propData4.pricing.oneTimeFee !== '₹25,000' || propData4.pricing.monthlyFee !== '₹800/mo') {
      console.error('❌ Final proposal rates did not match accepted values');
      process.exit(1);
    }

    // Cleanup
    console.log('\nStep 8: Cleaning up test inquiry...');
    const deleteRes = await fetch(`${BASE}/inquiries/${recordId}`, { method: 'DELETE' });
    if (deleteRes.ok) {
      console.log('✔ Deleted test inquiry successfully');
    }

    console.log('\n🎉 ALL NEGOTIATION INTEGRATION TESTS PASSED!');
    process.exit(0);

  } catch (err) {
    console.error('❌ Test Execution Error:', err.message);
    if (recordId) {
      console.log('Attempting cleanup of test inquiry...');
      await fetch(`${BASE}/inquiries/${recordId}`, { method: 'DELETE' }).catch(() => null);
    }
    process.exit(1);
  }
}

runTest();

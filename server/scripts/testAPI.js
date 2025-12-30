// scripts/testAPI.js
async function testEnrollmentAPI() {
    const testData = {
      website: '', // Honeypot should be empty
      firstName: 'Test',
      lastName: 'User',
      contactMethod: 'Email',
      contactInfo: 'test@example.com',
      certificates: ['Beauty & Spa Therapy']
    };
  
    try {
      console.log('Testing enrollment API...');
      const response = await fetch('http://localhost:3000/api/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData)
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('✅ API test passed!');
        console.log('Response:', data);
      } else {
        console.log('❌ API test failed');
        console.log('Error:', data);
      }
    } catch (error) {
      console.error('❌ Network error:', error);
    }
  }
  
  testEnrollmentAPI();
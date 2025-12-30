import admin from 'firebase-admin';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

try {
  // Load service account JSON directly
  const serviceAccountPath = join(__dirname, '..', 'vanuaacademy-51b5b3d32f0b.json');
  const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log('✓ Firebase initialized');

  const db = admin.firestore();
  db.settings({ databaseId: 'students_db' });

  // Test 1: Write a test document
  async function testWrite() {
    console.log('\n--- Testing Write ---');
    const testData = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      preferredContactMethod: 'Email',
      qualifications: ['Beauty & Spa Therapy'],
      submittedAt: admin.firestore.FieldValue.serverTimestamp(),
      isTest: true
    };

    const docRef = await db.collection('enrollments').add(testData);
    console.log('✓ Document written with ID:', docRef.id);
    return docRef.id;
  }

  // Test 2: Read the document back
  async function testRead(docId) {
    console.log('\n--- Testing Read ---');
    const docRef = db.collection('enrollments').doc(docId);
    const doc = await docRef.get();

    if (doc.exists) {
      console.log('✓ Document data:', doc.data());
      return doc.data();
    } else {
      console.log('✗ Document not found');
      return null;
    }
  }

  // Test 3: Query documents
  async function testQuery() {
    console.log('\n--- Testing Query ---');
    const snapshot = await db.collection('enrollments')
      .where('isTest', '==', true)
      .limit(5)
      .get();

    console.log(`✓ Found ${snapshot.size} test documents`);
    snapshot.forEach(doc => {
      console.log(`  - ${doc.id}:`, doc.data());
    });
  }

  // Test 4: Delete test document
  async function testDelete(docId) {
    console.log('\n--- Testing Delete ---');
    await db.collection('enrollments').doc(docId).delete();
    console.log('✓ Document deleted:', docId);
  }

  // Run all tests
  async function runTests() {
    try {
      const docId = await testWrite();
      await testRead(docId);
      await testQuery();
      await testDelete(docId);
      
      console.log('\n✅ All tests passed!');
      process.exit(0);
    } catch (error) {
      console.error('\n❌ Test failed:', error);
      process.exit(1);
    }
  }

  runTests();

} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
  process.exit(1);
}
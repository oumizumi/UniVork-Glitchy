import React from 'react';

const StudentTerms = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
      <h1>Student Terms and Conditions</h1>
      <p>
        Welcome to UniVork! By signing up and using our platform as a student, you agree to the
        following terms and conditions. Please read them carefully.
      </p>
      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing and using our platform, you agree to abide by these terms, including any
        updates we may make from time to time.
      </p>
      <h2>2. Usage of Platform</h2>
      <p>
        As a student, you are expected to use the platform responsibly and only for its intended
        purpose of finding internship opportunities, jobs, or similar tasks.
      </p>
      <h2>3. Privacy Policy</h2>
      <p>
        We value your privacy. Please refer to our{' '}
        <a href="/privacy-policy">Privacy Policy</a> to understand how we handle your
        information.
      </p>
      <h2>4. Prohibited Activities</h2>
      <p>
        Students must refrain from any activities that:
        <ul>
          <li>Violate any laws or regulations.</li>
          <li>Involve misleading or false information in your profile or applications.</li>
          <li>Disrupt the operation of the platform.</li>
        </ul>
      </p>
      <h2>5. Termination</h2>
      <p>
        UniVork reserves the right to suspend or terminate your account for violations of these
        terms.
      </p>
      <h2>6. Contact Us</h2>
      <p>
        If you have any questions or concerns about these terms, feel free to contact us at{' '}
        <a href="mailto:support@univork.com">support@univork.com</a>.
      </p>
    </div>
  );
};

export default StudentTerms;

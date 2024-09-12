/* eslint-disable react/no-unescaped-entities */
import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1 className="md:text-5xl text-3xl font-bold text-center mb-10 text-cyan-600">
        Privacy Policy
      </h1>
      <h3 className="text-center text-cyan-700 text-lg">
        {" "}
        We Respect Your Privacy ❤
      </h3>

      <div className="space-y-6 mt-8 text-gray-600">
        <section>
          {/* <h2 className="text-2xl font-bold text-cyan-600">Introduction</h2> */}
          <p className="font-semibold text-gray-700 text-lg">
            Welcome to TeaBridge! We are committed to protecting your privacy
            and ensuring that your personal information is handled in a safe and
            responsible manner. This Privacy Policy outlines how we collect,
            use, disclose, and protect your information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-cyan-600">
            Information We Collect
          </h2>
          <ul className="list-disc list-inside">
            <li>
              <strong>Personal Information:</strong> Name, email address, phone
              number, postal address, and any other information you provide when
              you register or use our services.
            </li>
            <li>
              <strong>Transaction Information:</strong> Details of your
              transactions with us, including the products you buy or sell and
              your payment information.
            </li>
            <li>
              <strong>Technical Information:</strong> IP address, browser type,
              device information, and other technical details collected when you
              use our website or mobile application.
            </li>
            <li>
              <strong>Usage Information:</strong> Information about your
              interactions with our services, such as the pages you visit and
              the features you use.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-cyan-600">
            How We Use Your Information
          </h2>
          <ul className="list-disc list-inside">
            <li>
              <strong>To Provide and Improve Our Services:</strong> To process
              transactions, provide customer support, and improve our platform’s
              functionality and user experience.
            </li>
            <li>
              <strong>To Communicate with You:</strong> To send you updates,
              newsletters, marketing materials, and other information that may
              be of interest to you.
            </li>
            <li>
              <strong>To Ensure Security:</strong> To protect against and
              prevent fraud, unauthorized transactions, claims, and other
              liabilities.
            </li>
            <li>
              <strong>To Comply with Legal Obligations:</strong> To comply with
              applicable laws, regulations, and legal processes.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-cyan-600">
            Information Sharing and Disclosure
          </h2>
          <p>
            We do not sell or rent your personal information to third parties.
            However, we may share your information with:
          </p>
          <ul className="list-disc list-inside">
            <li>
              <strong>Service Providers:</strong> Third-party vendors,
              consultants, and other service providers who perform services on
              our behalf and need access to your information to carry out their
              work.
            </li>
            <li>
              <strong>Legal Requirements:</strong> If required to do so by law
              or in response to a subpoena or court order, or when we believe
              disclosure is necessary to protect our rights, your safety, or the
              safety of others.
            </li>
            <li>
              <strong>Business Transfers:</strong> In connection with, or during
              negotiations of, any merger, sale of company assets, financing, or
              acquisition of all or a portion of our business to another
              company.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-cyan-600">Data Security</h2>
          <p>
            We implement a variety of security measures to maintain the safety
            of your personal information. These measures include physical,
            electronic, and managerial procedures to protect your data from
            unauthorized access, use, or disclosure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-cyan-600">
            Your Rights and Choices
          </h2>
          <p>You have the right to:</p>
          <ul className="list-disc list-inside">
            <li>
              <strong>Access Your Information:</strong> Request access to the
              personal information we hold about you.
            </li>
            <li>
              <strong>Update Your Information:</strong> Correct or update any of
              your personal information.
            </li>
            <li>
              <strong>Delete Your Information:</strong> Request the deletion of
              your personal information.
            </li>
            <li>
              <strong>Opt-Out:</strong> Opt-out of receiving marketing
              communications from us.
            </li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at{" "}
            <a
              className="text-cyan-600 hover:text-lime-600"
              href="mailto:support@teabridge.com"
            >
              support@teabridge.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-cyan-600">
            Changes to This Privacy Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. When we do, we
            will post the updated policy on this page and update the policy's
            effective date. We encourage you to review this Privacy Policy
            periodically to stay informed about how we are protecting your
            information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-cyan-600">Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy,
            please contact us at:
          </p>
          <address className="not-italic">
            TeaBridge <br />
            Email:{" "}
            <a
              className="text-cyan-600 hover:text-lime-600"
              href="mailto:support@teabridge.com"
            >
              support@teabridge.com
            </a>{" "}
            <br />
            Phone: +94 123 456 789 <br />
            Address: 123 TeaBridge Road, Colombo, Sri Lanka
          </address>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

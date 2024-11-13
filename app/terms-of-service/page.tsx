// pages/terms-of-service.tsx
import { Card } from "@/components/ui/card";

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-12">Terms of Service</h1>

      <div className="space-y-8">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
          <p>
            By accessing and using snapstoryai.com (&quot;the Website&quot;),
            you agree to be bound by these Terms of Service. If you disagree
            with any part of these terms, you may not access the Website or use
            our services.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            2. Description of Service
          </h2>
          <div className="space-y-4">
            <p>
              SnapStoryAI provides an AI-powered platform for creating and
              sharing stories (&quot;the Service&quot;). The Service includes:
            </p>
            <ul className="list-disc pl-6">
              <li>Story generation using AI technology</li>
              <li>Story editing and customization tools</li>
              <li>Story sharing capabilities</li>
              <li>Cloud storage for created content</li>
            </ul>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
          <div className="space-y-4">
            <p>When creating an account, you agree to:</p>
            <ul className="list-disc pl-6">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Promptly update your account information when necessary</li>
              <li>
                Accept responsibility for all activities under your account
              </li>
            </ul>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            4. Subscription and Payments
          </h2>
          <div className="space-y-4">
            <h3 className="text-xl font-medium">4.1 Subscription Terms</h3>
            <ul className="list-disc pl-6">
              <li>Subscription fees are billed in advance</li>
              <li>Automatic renewal unless cancelled</li>
              <li>Pro-rated refunds for cancellations</li>
            </ul>

            <h3 className="text-xl font-medium">4.2 Payment Processing</h3>
            <p>
              All payments are processed securely through our payment providers.
              We do not store your complete payment information on our servers.
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">5. User Content</h2>
          <div className="space-y-4">
            <p>By submitting content to the Service, you:</p>
            <ul className="list-disc pl-6">
              <li>Retain all ownership rights to your content</li>
              <li>
                Grant us a license to use, modify, and display your content
              </li>
              <li>Agree not to submit illegal or prohibited content</li>
              <li>Accept responsibility for all submitted content</li>
            </ul>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            6. Intellectual Property
          </h2>
          <div className="space-y-4">
            <p>
              The Service and its original content, features, and functionality
              are owned by SnapStoryAI and are protected by international
              copyright, trademark, and other intellectual property laws.
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            7. Prohibited Activities
          </h2>
          <div className="space-y-4">
            <p>Users are prohibited from:</p>
            <ul className="list-disc pl-6">
              <li>Violating any applicable laws or regulations</li>
              <li>Impersonating others or providing false information</li>
              <li>Attempting to breach security measures</li>
              <li>Interfering with the Service&apos;s functionality</li>
              <li>Engaging in unauthorized data collection</li>
            </ul>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">8. Termination</h2>
          <div className="space-y-4">
            <p>
              We reserve the right to terminate or suspend your account and
              access to the Service:
            </p>
            <ul className="list-disc pl-6">
              <li>For violations of these Terms</li>
              <li>At our sole discretion without notice</li>
              <li>Upon your request for account deletion</li>
            </ul>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            9. Limitation of Liability
          </h2>
          <p>
            SnapStoryAI shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages resulting from your use
            or inability to use the Service.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will
            notify users of any material changes via email or through the
            Website. Continued use of the Service after such modifications
            constitutes acceptance of the updated Terms.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            11. Contact Information
          </h2>
          <p>
            For questions about these Terms, please contact us at:
            <br />
            Email: support@ahaapple.com
            <br />
            Website: snapstoryai.com
          </p>
        </Card>

        <div className="text-center text-sm">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

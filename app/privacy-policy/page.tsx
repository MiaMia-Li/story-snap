// pages/privacy-policy.tsx
import { Card } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-12">Privacy Policy</h1>

      <div className="space-y-8">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p>
            Welcome to SnapStoryAI. We respect your privacy and are committed to
            protecting your personal information. This Privacy Policy explains
            how we collect, use, disclose, and safeguard your information when
            you visit our website snapstoryai.com.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Information We Collect
          </h2>
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Personal Information</h3>
            <ul className="list-disc pl-6">
              <li>Name and email address</li>
              <li>Profile information</li>
              <li>Payment information</li>
              <li>Usage data and preferences</li>
            </ul>

            <h3 className="text-xl font-medium">
              Automatically Collected Information
            </h3>
            <ul className="list-disc pl-6">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device information</li>
              <li>Cookies and usage data</li>
            </ul>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 ">
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Information Disclosure
          </h2>
          <p className="mb-4">We may share your information with:</p>
          <ul className="list-disc pl-6 ">
            <li>Service providers and business partners</li>
            <li>Law enforcement when required by law</li>
            <li>Third-party analytics services</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Data Protection Measures
          </h2>
          <ul className="list-disc pl-6">
            <li>SSL/TLS encryption</li>
            <li>Secure data storage</li>
            <li>Regular security assessments</li>
            <li>Access control and authentication</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at:
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

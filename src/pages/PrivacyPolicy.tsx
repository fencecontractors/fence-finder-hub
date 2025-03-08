// src/pages/PrivacyPolicy.tsx

import PageLayout from "@/components/layout/PageLayout";

const PrivacyPolicy = () => {
  return (
    <PageLayout
      title="Privacy Policy - Fence Finder Hub"
      description="Read our privacy policy to understand how we collect, use, and protect your personal information."
    >
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground mb-6">
            Effective Date: [Insert Date Here]
          </p>
          <p className="text-muted-foreground mb-6">
            This Privacy Policy describes how Fence Finder Hub ("we," "us," or "our") collects, uses, and shares personal information of users of our website (the "Site").  By accessing or using the Site, you agree to the terms of this Privacy Policy.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p className="text-muted-foreground mb-6">
            We may collect the following types of information:
          </p>
          <ul className="list-disc list-inside text-muted-foreground mb-6">
            <li><strong>Information You Provide Directly:</strong>  This includes information you provide when you create an account, fill out a form, contact us, or otherwise interact with the Site. This may include your name, email address, phone number, location, and any other information you choose to provide.</li>
            <li><strong>Automatically Collected Information:</strong> We may automatically collect information about your use of the Site, such as your IP address, browser type, operating system, pages viewed, and the dates/times of your visits.  We may use cookies and similar technologies to collect this information.</li>
            <li><strong>Information from Third Parties:</strong> We may receive information about you from third parties, such as social media platforms or business partners.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="text-muted-foreground mb-6">
            We may use your information for the following purposes:
          </p>
          <ul className="list-disc list-inside text-muted-foreground mb-6">
            <li>To operate and maintain the Site.</li>
            <li>To provide you with information, products, or services that you request.</li>
            <li>To communicate with you, including responding to your inquiries and sending you updates.</li>
            <li>To improve the Site and develop new features.</li>
            <li>To personalize your experience on the Site.</li>
            <li>To comply with legal obligations.</li>
            <li>For other purposes with your consent.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">Sharing Your Information</h2>
          <p className="text-muted-foreground mb-6">
            We may share your information with:
          </p>
          <ul className="list-disc list-inside text-muted-foreground mb-6">
            <li>Service providers who assist us in operating the Site.</li>
            <li>Contractors listed on the Site, if you choose to contact them.</li>
            <li>Business partners, with your consent.</li>
            <li>Law enforcement or other government agencies, if required by law.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">Your Choices</h2>
          <p className="text-muted-foreground mb-6">
            You may have certain choices regarding your personal information, such as opting out of receiving marketing emails.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Security</h2>
           <p className="text-muted-foreground mb-6">
            We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
          <p className="text-muted-foreground mb-6">
            We may update this Privacy Policy from time to time.  We will post any changes on this page and update the Effective Date.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-muted-foreground mb-6">
           If you have any questions regarding the policy, please contact us via email at: <a
              href="mailto:info@fencefinderhub.com"
              className="text-primary hover:underline"
            >
              info@fencefinderhub.com
            </a>
          </p>

        </div>
      </section>
    </PageLayout>
  );
};

export default PrivacyPolicy;
// src/pages/TermsOfService.tsx

import PageLayout from "@/components/layout/PageLayout";

const TermsOfService = () => {
  return (
    <PageLayout
      title="Terms of Service - Fence Finder Hub"
      description="Read our terms of service to understand the rules and guidelines for using our website."
    >
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-6">
            Effective Date: [Insert Date Here]
          </p>
          <p className="text-muted-foreground mb-6">
            These Terms of Service ("Terms") govern your access to and use of the Fence Finder Hub website (the "Site"). By accessing or using the Site, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Site.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Use of the Site</h2>
          <p className="text-muted-foreground mb-6">
            You may use the Site only for lawful purposes and in accordance with these Terms.  You agree not to:
          </p>
          <ul className="list-disc list-inside text-muted-foreground mb-6">
            <li>Use the Site in any way that violates any applicable law or regulation.</li>
            <li>Use the Site to transmit any advertising or promotional material without our prior written consent.</li>
            <li>Impersonate any person or entity, or falsely state or misrepresent your affiliation with any person or entity.</li>
            <li>Interfere with or disrupt the operation of the Site.</li>
            <li>Attempt to gain unauthorized access to the Site or any other systems or networks connected to the Site.</li>
            <li>Use any robot, spider, or other automatic device or process to access the Site for any purpose.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
          <p className="text-muted-foreground mb-6">
            The Site and its content, features, and functionality are owned by Fence Finder Hub and are protected by intellectual property laws.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Disclaimer of Warranties</h2>
          <p className="text-muted-foreground mb-6">
            The Site is provided "as is" and without warranties of any kind.  We do not warrant that the Site will be error-free or uninterrupted.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
          <p className="text-muted-foreground mb-6">
            We will not be liable for any damages arising out of your use of the Site.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
          <p className="text-muted-foreground mb-6">
            These Terms will be governed by and construed in accordance with the laws of [Your State/Jurisdiction].
          </p>

          <h2 className="text-2xl font-semibold mb-4">Changes to These Terms</h2>
          <p className="text-muted-foreground mb-6">
            We may update these Terms from time to time. We will post any changes on this page and update the Effective Date.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-muted-foreground mb-6">
           If you have any questions regarding the terms, please contact us via email at: <a
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

export default TermsOfService;
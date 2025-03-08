// src/pages/About.tsx

import PageLayout from "@/components/layout/PageLayout";

const About = () => {
  return (
    <PageLayout
      title="About Us - Fence Finder Hub"
      description="Learn about Fence Finder Hub, our mission, and how we connect you with the best fence contractors."
    >
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">About Fence Finder Hub</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                At Fence Finder Hub, our mission is to simplify the process of finding and connecting with reliable, high-quality fence contractors. We understand that finding the right contractor for your fencing project can be challenging. That's why we've built a platform that brings transparency, convenience, and peace of mind to homeowners and businesses alike.
              </p>
              <p className="text-muted-foreground mb-6">
                We strive to provide a comprehensive directory of vetted fence contractors, complete with ratings, reviews, and detailed service information. Our goal is to empower you to make informed decisions and find the perfect contractor to meet your specific needs.
              </p>

              <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
              <ul className="list-disc list-inside text-muted-foreground">
                <li>Extensive network of pre-screened fence contractors</li>
                <li>Easy-to-use search and filtering tools</li>
                <li>Genuine customer reviews and ratings</li>
                <li>Direct communication with contractors</li>
                <li>Free and convenient access to contractor information</li>
              </ul>
            </div>
            <div>
              {/* Image (replace with your own) */}
              <img
                src="/about-us-image.jpg"
                alt="About Fence Finder Hub"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
          <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-4 text-center">Our Commitment</h2>
              <p className="text-muted-foreground text-center">
                We are committed to maintaining a high standard of quality and integrity on our platform.  We continuously work to improve our services and provide the best possible experience for both users and contractors.
              </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
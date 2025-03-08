// src/components/layout/Footer.tsx
import { Link } from "react-router-dom";
import { useLocationData } from "@/data";
import { formatStateForUrl } from "@/utils";

const Footer = () => {
  const { data: locationData } = useLocationData();

  return (
    <footer className="bg-muted mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* ... existing footer content ... */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-xl">F</span>
              </div>
              <span className="font-display font-medium text-xl">
                Fence Finder Hub
              </span>
            </Link>
            <p className="text-muted-foreground">
              Connecting you with top-rated fence contractors in your area.
            </p>
          </div>

          <div>
            <h3 className="font-display font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/contractors"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Find Contractors
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
              {/* Add other links here */}
                <li>
                    <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                    About Us
                    </Link>
                </li>
                <li>
                    <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                    Contact Us
                    </Link>
                </li>
                <li>
                    <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                    </Link>
                </li>
                <li>
                    <Link to="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors">
                    Terms of Service
                    </Link>
                </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-medium text-lg mb-4">Top States</h3>
            <ul className="space-y-2">
              {locationData?.states.slice(0, 5).map((state) => (
                <li key={state}>
                  <Link
                    to={`/contractors/${formatStateForUrl(state)}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {state}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-medium text-lg mb-4">Contact</h3>
            <p className="text-muted-foreground mb-2">
              Have questions or feedback?
            </p>
            <a
              href="mailto:info@fencefinderhub.com"
              className="text-primary hover:underline"
            >
              info@fencefinderhub.com
            </a>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Fence Finder Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
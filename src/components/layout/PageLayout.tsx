
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MetaTags from "./MetaTags";

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

const PageLayout = ({ 
  children, 
  title = "Fence Contractors Directory", 
  description = "Find the best fence contractors in your area", 
  canonicalUrl,
  ogImage
}: PageLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <MetaTags 
        title={title}
        description={description}
        canonicalUrl={canonicalUrl}
        ogImage={ogImage}
      />
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;

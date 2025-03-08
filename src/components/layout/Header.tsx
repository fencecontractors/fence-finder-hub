// src/components/layout/Header.tsx

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchModal from "@/components/search/SearchModal";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="container flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-xl">F</span>
            </div>
            <span className="font-display font-medium text-xl hidden sm:inline-block">
              Fence Finder Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/contractors"
              className="text-foreground/90 hover:text-primary transition-colors"
            >
              Find Contractors
            </Link>
            <Link
              to="/blog"
              className="text-foreground/90 hover:text-primary transition-colors"
            >
              Blog
            </Link>
            <Link
              to="/about"  // Add About link
              className="text-foreground/90 hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"  // Add Contact link
              className="text-foreground/90 hover:text-primary transition-colors"
            >
              Contact
            </Link>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="ml-2"
            >
              <Search size={18} />
              <span className="sr-only">Search</span>
            </Button>
          </nav>

          {/* Mobile Navigation Buttons */}
          <div className="flex items-center md:hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="mr-2"
            >
              <Search size={18} />
              <span className="sr-only">Search</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background pt-24 px-6 transform transition-transform duration-300 ease-in-out md:hidden overflow-auto",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col space-y-6 text-lg">
          <Link
            to="/"
            className="pb-4 border-b border-border"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/contractors"
            className="pb-4 border-b border-border"
            onClick={() => setIsMenuOpen(false)}
          >
            Find Contractors
          </Link>
          <Link
            to="/blog"
            className="pb-4 border-b border-border"
            onClick={() => setIsMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            to="/about" // Add About link
            className="pb-4 border-b border-border"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
            <Link
            to="/contact" // Add Contact link
            className="pb-4 border-b border-border"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </nav>
      </div>

      {/* Search Modal */}
      <SearchModal open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Extra space to offset the fixed header */}
      <div className={isScrolled ? "h-16" : "h-20"} />
    </>
  );
};

export default Header;
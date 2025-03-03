
import { Contractor, SearchFilters } from "../types";

// Format a phone number for display
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, "");
  
  // Check if the input is valid
  if (cleaned.length !== 10) {
    return phone;
  }
  
  // Format as (XXX) XXX-XXXX
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
};

// Format address to title case
export const formatAddress = (address: string): string => {
  return address
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

// Format city name (convert camelCase to proper space-separated format)
export const formatCityName = (city: string): string => {
  // Insert a space before all caps and uppercase the first character
  const formattedCity = city
    .replace(/([A-Z])/g, " $1")
    .trim();
  
  return formattedCity.charAt(0).toUpperCase() + formattedCity.slice(1);
};

// Format state name for URL (lowercase and dash-separated)
export const formatStateForUrl = (state: string): string => {
  return state.toLowerCase().replace(/\s+/g, "-");
};

// Format city name for URL (lowercase and dash-separated)
export const formatCityForUrl = (city: string): string => {
  // First convert camelCase to space-separated
  const spaceSeparated = city.replace(/([A-Z])/g, " $1").trim();
  
  // Then convert to lowercase and dash-separated
  return spaceSeparated.toLowerCase().replace(/\s+/g, "-");
};

// Generate SEO-friendly meta title
export const generateMetaTitle = (
  context: "home" | "state" | "city" | "contractor" | "blog" | "blogPost",
  data?: { state?: string; city?: string; contractor?: Contractor; title?: string }
): string => {
  switch (context) {
    case "home":
      return "Find Top-Rated Fence Contractors Near You | Fence Finder Hub";
    case "state":
      return `Top Fence Contractors in ${data?.state || ""} | Fence Finder Hub`;
    case "city":
      return `Best Fence Contractors in ${formatCityName(data?.city || "")} ${data?.state || ""} | Fence Finder Hub`;
    case "contractor":
      return `${data?.contractor?.title || ""} - Fence Contractor in ${formatCityName(data?.contractor?.city || "")}, ${data?.contractor?.state || ""} | Fence Finder Hub`;
    case "blog":
      return "Fence Installation & Maintenance Blog | Fence Finder Hub";
    case "blogPost":
      return `${data?.title || ""} | Fence Finder Blog`;
    default:
      return "Fence Finder Hub | Find Local Fence Contractors";
  }
};

// Generate SEO-friendly meta description
export const generateMetaDescription = (
  context: "home" | "state" | "city" | "contractor" | "blog" | "blogPost",
  data?: { state?: string; city?: string; contractor?: Contractor; excerpt?: string }
): string => {
  switch (context) {
    case "home":
      return "Find and compare the best local fence contractors in your area. Get connected with top-rated fence installation and repair services near you.";
    case "state":
      return `Browse our directory of fence contractors in ${data?.state || ""}. Find reliable fence installation, repair, and maintenance services throughout the state.`;
    case "city":
      return `Looking for fence contractors in ${formatCityName(data?.city || "")}? Compare top-rated fence companies serving the ${formatCityName(data?.city || "")}, ${data?.state || ""} area.`;
    case "contractor":
      if (data?.contractor) {
        return `${data.contractor.title} provides fence services in ${formatCityName(data.contractor.city)}, ${data.contractor.state}. ${data.contractor.stars} stars from ${data.contractor.reviews} reviews. Call ${data.contractor.phone}.`;
      }
      return "Find detailed information about this fence contractor, including services, reviews, and contact information.";
    case "blog":
      return "Expert advice on fence installation, materials, maintenance, and more. Stay informed with the latest trends and tips in the fencing industry.";
    case "blogPost":
      return data?.excerpt || "Read our latest blog post about fence installation, maintenance, and industry insights.";
    default:
      return "Find and compare the best local fence contractors in your area. Get connected with top-rated fence services.";
  }
};

// Filter contractors based on search criteria
export const filterContractors = (
  contractors: Contractor[],
  filters: SearchFilters
): Contractor[] => {
  return contractors.filter((contractor) => {
    // Filter by search query (if provided)
    if (filters.query) {
      const query = filters.query.toLowerCase();
      const matchesTitle = contractor.title.toLowerCase().includes(query);
      const matchesAddress = contractor.formatted_address.toLowerCase().includes(query);
      const matchesCity = contractor.city.toLowerCase().includes(query);
      const matchesState = contractor.state.toLowerCase().includes(query);
      
      if (!(matchesTitle || matchesAddress || matchesCity || matchesState)) {
        return false;
      }
    }
    
    // Filter by state (if provided)
    if (filters.state && contractor.state.toLowerCase() !== filters.state.toLowerCase()) {
      return false;
    }
    
    // Filter by city (if provided)
    if (filters.city && contractor.city.toLowerCase() !== filters.city.toLowerCase()) {
      return false;
    }
    
    return true;
  });
};

// Generate alt text for contractor images
export const generateContractorImageAlt = (contractor: Contractor): string => {
  return `Fence installation by ${contractor.title} in ${formatCityName(contractor.city)}, ${contractor.state}`;
};

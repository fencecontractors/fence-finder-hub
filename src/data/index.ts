import { useQuery } from "@tanstack/react-query";
import { Contractor, LocationData, BlogPost } from "../types";
import contractorsData from "./fence_contractors.json";
import blogPostsData from "./blog_posts.json";

// Export raw data for direct access
export const fenceContractors = contractorsData as Contractor[];
export let blogPosts = blogPostsData as BlogPost[];

// Function to add a new blog post (for admin use)
export const addBlogPost = (post: BlogPost) => {
  // Add a unique ID to the post (using timestamp for simplicity)
  const postWithId = {
    ...post,
    id: String(blogPosts.length + 1)
  };
  
  // Add the new post to the beginning of the array
  blogPosts = [postWithId, ...blogPosts];
  
  return postWithId;
};

// Utility to load all contractors
export const useContractors = () => {
  return useQuery({
    queryKey: ["contractors"],
    queryFn: async (): Promise<Contractor[]> => {
      // In a real app, this would be an API call
      return contractorsData as Contractor[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Utility to get location data (states and cities)
export const useLocationData = () => {
  return useQuery({
    queryKey: ["locationData"],
    queryFn: async (): Promise<LocationData> => {
      const contractors = contractorsData as Contractor[];
      
      // Extract unique states
      const states = [...new Set(contractors.map((contractor) => contractor.state))].sort();
      
      // Create map of cities by state
      const citiesByState: Record<string, string[]> = {};
      
      states.forEach((state) => {
        const citiesInState = [
          ...new Set(
            contractors
              .filter((contractor) => contractor.state === state)
              .map((contractor) => contractor.city)
          ),
        ].sort();
        
        citiesByState[state] = citiesInState;
      });
      
      return {
        states,
        citiesByState,
        contractors,
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Utility to get contractors by state
export const useContractorsByState = (state: string) => {
  return useQuery({
    queryKey: ["contractors", "state", state],
    queryFn: async (): Promise<Contractor[]> => {
      const contractors = contractorsData as Contractor[];
      return contractors.filter((contractor) => 
        contractor.state.toLowerCase() === state.toLowerCase()
      );
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!state, // Only run query if state is provided
  });
};

// Utility to get contractors by city
export const useContractorsByCity = (state: string, city: string) => {
  return useQuery({
    queryKey: ["contractors", "state", state, "city", city],
    queryFn: async (): Promise<Contractor[]> => {
      const contractors = contractorsData as Contractor[];
      return contractors.filter(
        (contractor) => 
          contractor.state.toLowerCase() === state.toLowerCase() && 
          contractor.city.toLowerCase() === city.toLowerCase()
      );
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!state && !!city, // Only run query if state and city are provided
  });
};

// Utility to get a single contractor by ID
export const useContractor = (id: string) => {
  return useQuery({
    queryKey: ["contractor", id],
    queryFn: async (): Promise<Contractor | undefined> => {
      const contractors = contractorsData as Contractor[];
      return contractors.find((contractor) => contractor.unique_id === id);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!id, // Only run query if id is provided
  });
};

// Utility to get neighboring contractors
export const useNeighboringContractors = (neighborIds: string[]) => {
  return useQuery({
    queryKey: ["contractors", "neighbors", neighborIds],
    queryFn: async (): Promise<Contractor[]> => {
      const contractors = contractorsData as Contractor[];
      return contractors.filter((contractor) => 
        neighborIds.includes(contractor.unique_id)
      );
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: neighborIds.length > 0, // Only run query if neighborIds is provided
  });
};

// Utility to get blog posts
export const useBlogPosts = () => {
  return useQuery({
    queryKey: ["blogPosts"],
    queryFn: async (): Promise<BlogPost[]> => {
      // In a real app, this would be an API call
      return blogPosts;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Utility to get a single blog post by slug
export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: ["blogPost", slug],
    queryFn: async (): Promise<BlogPost | undefined> => {
      return blogPosts.find((post) => post.slug === slug);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!slug, // Only run query if slug is provided
  });
};

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Contractor, LocationData, BlogPost } from "../types";
import contractorsData from "./fence_contractors.json";
import blogPostsData from "./blog_posts.json";

// Export raw data for direct access
export const fenceContractors = contractorsData as Contractor[];
export let blogPosts = blogPostsData as BlogPost[];

// Function to update JSON data persistently (this is a simulation for a real API)
const updateData = (type: 'blog' | 'contractor', data: any) => {
  // In a real application, this would make an API call to update the server
  // For this demo, we'll create a localStorage backup to simulate persistence
  try {
    if (type === 'blog') {
      localStorage.setItem('blogPosts', JSON.stringify(data));
    } else {
      localStorage.setItem('fenceContractors', JSON.stringify(data));
    }
  } catch (error) {
    console.error(`Error saving ${type} data to localStorage:`, error);
  }
  
  console.log(`Data update for ${type}:`, data);
  return data;
};

// Initialize data from localStorage if available (for persistence simulation)
const initializeFromStorage = () => {
  try {
    const storedContractors = localStorage.getItem('fenceContractors');
    const storedBlogPosts = localStorage.getItem('blogPosts');
    
    if (storedContractors) {
      const parsedContractors = JSON.parse(storedContractors);
      if (Array.isArray(parsedContractors) && parsedContractors.length > 0) {
        // Copy the stored data to our fenceContractors array
        fenceContractors.length = 0;
        parsedContractors.forEach(contractor => fenceContractors.push(contractor));
      }
    }
    
    if (storedBlogPosts) {
      const parsedBlogPosts = JSON.parse(storedBlogPosts);
      if (Array.isArray(parsedBlogPosts) && parsedBlogPosts.length > 0) {
        blogPosts = parsedBlogPosts;
      }
    }
  } catch (error) {
    console.error("Error initializing data from localStorage:", error);
  }
};

// Call this on initial load
initializeFromStorage();

// Function to add a new blog post
export const addBlogPost = (post: BlogPost) => {
  // Add a unique ID to the post (using timestamp for simplicity)
  const postWithId = {
    ...post,
    id: String(blogPosts.length + 1)
  };
  
  // Add the new post to the beginning of the array
  blogPosts = [postWithId, ...blogPosts];
  
  // Update the JSON data (simulation)
  updateData('blog', blogPosts);
  
  return postWithId;
};

// Function to update an existing blog post
export const updateBlogPost = (post: BlogPost) => {
  const index = blogPosts.findIndex(p => p.id === post.id);
  
  if (index === -1) {
    throw new Error(`Blog post with ID ${post.id} not found`);
  }
  
  blogPosts[index] = post;
  
  // Update the JSON data (simulation)
  updateData('blog', blogPosts);
  
  return post;
};

// Function to delete a blog post
export const deleteBlogPost = (id: string) => {
  const index = blogPosts.findIndex(post => post.id === id);
  
  if (index === -1) {
    throw new Error(`Blog post with ID ${id} not found`);
  }
  
  blogPosts.splice(index, 1);
  
  // Update the JSON data (simulation)
  updateData('blog', blogPosts);
  
  return id;
};

// Function to toggle the featured status of a contractor
export const toggleContractorFeatured = (contractorId: string, featured: boolean): Contractor => {
  const index = fenceContractors.findIndex(c => c.unique_id === contractorId);
  
  if (index === -1) {
    throw new Error(`Contractor with ID ${contractorId} not found`);
  }
  
  fenceContractors[index] = {
    ...fenceContractors[index],
    featured
  };
  
  // Update the JSON data (simulation)
  updateData('contractor', fenceContractors);
  
  return fenceContractors[index];
};

// Utility to load all contractors
export const useContractors = () => {
  return useQuery({
    queryKey: ["contractors"],
    queryFn: async (): Promise<Contractor[]> => {
      // Initialize from storage on each request to ensure latest data
      initializeFromStorage();
      return [...fenceContractors];
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

// Utility to get featured contractors
export const useFeaturedContractors = () => {
  return useQuery({
    queryKey: ["contractors", "featured"],
    queryFn: async (): Promise<Contractor[]> => {
      // Initialize from storage on each request to ensure latest data
      initializeFromStorage();
      return fenceContractors.filter(contractor => contractor.featured === true);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Utility to toggle featured status
export const useToggleContractorFeatured = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ contractorId, featured }: { contractorId: string; featured: boolean }) => {
      return Promise.resolve(toggleContractorFeatured(contractorId, featured));
    },
    onSuccess: () => {
      // Invalidate relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["contractors"] });
      queryClient.invalidateQueries({ queryKey: ["contractors", "featured"] });
    },
  });
};

// Utility to get blog posts
export const useBlogPosts = () => {
  return useQuery({
    queryKey: ["blogPosts"],
    queryFn: async (): Promise<BlogPost[]> => {
      // Initialize from storage on each request to ensure latest data
      initializeFromStorage();
      return [...blogPosts];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Utility to get a single blog post by slug
export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: ["blogPost", slug],
    queryFn: async (): Promise<BlogPost | undefined> => {
      return blogPosts.find((post) => post.slug === slug || post.id === slug);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!slug, // Only run query if slug is provided
  });
};

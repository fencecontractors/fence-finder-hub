
import { Reviewer } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import { Helmet } from "react-helmet-async";

interface ContractorReviewsProps {
  reviews: Reviewer[];
  contractorName?: string;
  contractorUrl?: string;
}

const ContractorReviews = ({ reviews, contractorName, contractorUrl }: ContractorReviewsProps) => {
  if (!reviews || reviews.length === 0) {
    return null;
  }

  // Filter out duplicate reviews by creating a Map with reviewer_name + review_text as key
  const uniqueReviewsMap = new Map();
  reviews.forEach((review) => {
    const key = `${review.reviewer_name}-${review.review_text}`;
    if (!uniqueReviewsMap.has(key)) {
      uniqueReviewsMap.set(key, review);
    }
  });
  
  // Convert the Map values back to an array
  const uniqueReviews = Array.from(uniqueReviewsMap.values());

  // Create review schema if contractor name is provided
  const reviewSchema = contractorName ? {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": contractorName,
    "url": contractorUrl || window.location.href,
    "review": uniqueReviews.map(review => ({
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "author": {
        "@type": "Person",
        "name": review.reviewer_name
      },
      "reviewBody": review.review_text
    }))
  } : null;

  return (
    <>
      {reviewSchema && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(reviewSchema)}
          </script>
        </Helmet>
      )}
      
      <div className="bg-card rounded-xl shadow-sm p-6 border">
        <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
        
        <div className="space-y-4">
          {uniqueReviews.map((review, index) => (
            <Card key={index} className="bg-muted/30">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <CardTitle className="text-base">{review.reviewer_name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{review.review_text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default ContractorReviews;

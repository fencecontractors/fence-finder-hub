// src/pages/ContractorDetail.tsx

import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import ContractorHeader from "@/components/contractors/ContractorHeader";
import ContractorInfo from "@/components/contractors/ContractorInfo";
import ContractorReviews from "@/components/contractors/ContractorReviews";
import LocationMapSection from "@/components/contractors/LocationMapSection";
import NearbyContractors from "@/components/contractors/NearbyContractors";
import { useContractor, useNeighboringContractors } from "@/data";

const ContractorDetail = () => {
  const { state, city, id } = useParams<{ state: string; city: string; id: string }>();
  const { data: contractor, isLoading: isLoadingContractor } = useContractor(id || "");
  const [neighborIds, setNeighborIds] = useState<string[]>([]);
  const { data: neighborContractors = [], isLoading: isLoadingNeighbors } = useNeighboringContractors(neighborIds);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (contractor?.neighbors) {
      setNeighborIds(contractor.neighbors);
    }
  }, [contractor]);

  const imageSrc = useMemo(() => {
    if (!contractor) return '';
    return contractor.local_image_path
      ? `/images/${contractor.unique_id}.jpg`
      : imageError
        ? contractor.photo_url
        : contractor.updated_image;
  }, [contractor, imageError]);

  const schema = useMemo(() => {
    if (!contractor) return null;

    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": contractor.title,
      "image": imageSrc,
      "telephone": contractor.phone,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": contractor.address,
        "addressLocality": contractor.city,
        "addressRegion": contractor.state
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": contractor.latitude,
        "longitude": contractor.longitude
      },
      "url": contractor.website || window.location.href,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": contractor.stars,
        "reviewCount": contractor.reviews
      }
    };
  }, [contractor, imageSrc]);

  const metaTitle = useMemo(() => {
    if (!contractor) return "Contractor Details | Fence Contractors Directory";
    return `${contractor.title} - Fence Contractor in ${contractor.city}, ${contractor.state}`;
  }, [contractor]);

  const metaDescription = useMemo(() => {
    if (!contractor) return "Find detailed information about this fence contractor";
    return `${contractor.title} provides fence services in ${contractor.city}, ${contractor.state}. Rated ${contractor.stars} stars from ${contractor.reviews} reviews. Contact at ${contractor.phone}.`;
  }, [contractor]);

  const canonicalUrl = useMemo(() => {
    if (!contractor || !state || !city || !id) return undefined;
    return `${window.location.origin}/contractors/${state}/${city}/${id}`;
  }, [contractor, state, city, id]);

  if (isLoadingContractor) {
    return (
      <PageLayout>
        <div className="page-container text-center">
          <p>Loading contractor details...</p>
        </div>
      </PageLayout>
    );
  }

  if (!contractor) {
    return (
      <PageLayout>
        <div className="page-container text-center">
          <h1 className="text-4xl font-bold mb-8">Contractor Not Found</h1>
          <p className="mb-8">Sorry, we couldn't find the contractor you're looking for.</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={metaTitle}
      description={metaDescription}
      canonicalUrl={canonicalUrl}
      ogImage={imageSrc}
      schema={schema}
    >
      <div className="page-container">
        <ContractorHeader contractor={contractor} state={state} city={city} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ContractorInfo
              contractor={contractor}
              imageSrc={imageSrc}
              setImageError={setImageError}
            />
            <LocationMapSection contractor={contractor} />

            {/* Pass businessTitle to ContractorReviews */}
            <ContractorReviews
              reviews={contractor.reviewers || []}
              businessTitle={contractor.title}
            />
          </div>

          <div className="space-y-8">
            <NearbyContractors
              neighborContractors={neighborContractors}
              state={state}
              city={city}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ContractorDetail;
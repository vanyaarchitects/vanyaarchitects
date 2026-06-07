import React from "react";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ArchitecturalOffice",
    "name": "Vanya Architects",
    "alternateName": "V Λ N Y Λ ARCHITECTS",
    "description": "Vanya Architects is a luxury architectural design studio based in Kerala, creating spaces rooted in purpose, tropical ventilation, and timeless craftsmanship.",
    "url": "https://vanyaarchitecture.com",
    "logo": "https://vanyaarchitecture.com/logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Killy, Kattakada",
      "addressLocality": "Trivandrum",
      "addressRegion": "Kerala",
      "postalCode": "695572",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9746235886",
      "contactType": "customer service",
      "email": "vanyaarchitects01@gmail.com",
      "availableLanguage": ["English", "Malayalam", "Hindi"]
    },
    "sameAs": [
      "https://www.instagram.com/vanyaarchitects/",
      "https://linkedin.com/company/vanyaarchitecture"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

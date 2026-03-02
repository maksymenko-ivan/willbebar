import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  schema?: object;
}

const SEO: React.FC<SEOProps> = ({ title, description, canonical, ogType = 'website', schema }) => {
  const { lang, urlPrefix } = useLanguage();
  const fullTitle = `${title} | Will Be Bar Catering`;
  const baseUrl = "https://willbebar.cz";
  const currentUrl = `${baseUrl}${urlPrefix}${canonical || ''}`;

  // Update HTML lang attribute dynamically
  useEffect(() => {
    document.documentElement.lang = lang === 'UA' ? 'uk' : lang === 'CZ' ? 'cs' : 'en';
  }, [lang]);

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={currentUrl} />

      {/* Multilingual SEO (Hreflang) */}
      <link rel="alternate" hrefLang="cs" href={`${baseUrl}${canonical || ''}`} />
      <link rel="alternate" hrefLang="uk" href={`${baseUrl}/ua${canonical || ''}`} />
      <link rel="alternate" hrefLang="en" href={`${baseUrl}/eng${canonical || ''}`} />
      <link rel="alternate" hrefLang="x-default" href={baseUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content={lang === 'UA' ? 'uk_UA' : lang === 'CZ' ? 'cs_CZ' : 'en_US'} />
      <meta property="og:site_name" content="Will Be Bar Catering" />

      {/* Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;

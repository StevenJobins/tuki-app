import { Helmet } from 'react-helmet-async';
import type { Language } from '../types';
import { translations } from '../data/translations';

interface SEOProps {
  lang: Language;
  pageTitle?: string;
}

export function SEO({ lang, pageTitle }: SEOProps) {
  const t = translations[lang];
  const title = pageTitle ? `${pageTitle} | Tuki` : t.title;
  const baseUrl = 'https://tuki.ch';
  const canonicalUrl = lang === 'de' ? baseUrl : `${baseUrl}/${lang}`;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={t.meta.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={t.meta.description} />
      <meta property="og:image" content={t.meta.ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={lang === 'de' ? 'de_CH' : lang === 'fr' ? 'fr_CH' : 'en_CH'} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={t.meta.description} />
      <meta name="twitter:image" content={t.meta.ogImage} />
      
      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Alternate languages */}
      <link rel="alternate" hrefLang="de" href={`${baseUrl}`} />
      <link rel="alternate" hrefLang="en" href={`${baseUrl}/en`} />
      <link rel="alternate" hrefLang="fr" href={`${baseUrl}/fr`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}`} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  );
}

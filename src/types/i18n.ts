import 'react-i18next';

// Extend the i18next module to include type safety
declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: Record<string, unknown>;
    };
  }
}

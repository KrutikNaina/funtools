import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'GetFunTools',
    short_name: 'GetFunTools',
    description: 'GetFunTools is a fast, modern collection of free online tools including calculators, generators, converters, AI tools, image utilities, productivity tools, developer tools, and fun interactive tools.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F8FAFF',
    theme_color: '#4F46E5',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}

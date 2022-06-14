import dynamic from 'next/dynamic';

export const NonSSRAdSense = dynamic(() => import('../components/AdSense'), {
  ssr: false,
});

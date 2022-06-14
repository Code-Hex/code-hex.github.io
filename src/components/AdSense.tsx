import { useRouter } from 'next/router';
import { CSSProperties, useEffect } from 'react';

interface AdSenseProps {
  adSlot: string;
  adClient: string;
  adLayout?: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
  style?: CSSProperties;
}

const AdSense = ({
  adLayout,
  adFormat,
  adClient,
  adSlot,
  fullWidthResponsive,
  style,
}: AdSenseProps) => {
  const { asPath } = useRouter();
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log({ err, meta: 'google adsense' });
    }
  }, [asPath]);

  return (
    <div key={`${adSlot}-${asPath}`}>
      <ins
        className="adsbygoogle"
        style={style ?? { display: 'block', textAlign: 'center' }}
        data-ad-layout={adLayout}
        data-ad-format={adFormat}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-full-width-responsive={fullWidthResponsive}
      />
    </div>
  );
};

export default AdSense;

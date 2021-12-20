import Script from 'next/script';

export const GoogleAnalytics = ({ gaId }: { gaId: string }): JSX.Element => {
  if (gaId === '') return <></>;
  return (
    <>
      <Script
        defer
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script
        defer
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());    
              gtag('config', '${gaId}');
            `,
        }}
        strategy="afterInteractive"
      />
    </>
  );
};

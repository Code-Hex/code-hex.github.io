import Script from 'next/script';

export const GoogleAnalytics = ({ gaId }: { gaId: string }): JSX.Element => {
  if (gaId === '') return <></>;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}');
      `}
      </Script>
    </>
  );
};

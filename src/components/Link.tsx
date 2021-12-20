import NextLink from 'next/link';
import { useCallback, ReactNode } from 'react';
import { event } from '~/lib/gtag';

interface LinkProps {
  children: ReactNode;
  href: string;
  className?: string;
  ariaLabel?: string;
  gaLabel?: Record<string, string | number | boolean>;
}

const Link = ({ children, href, className, ariaLabel, gaLabel }: LinkProps) => {
  const gaClickEvent = useCallback(() => {
    event({
      action: 'click',
      category: 'homepage',
      label: gaLabel,
    });
  }, [event, gaLabel]);
  return (
    <NextLink href={href}>
      <a className={className} aria-label={ariaLabel} onClick={gaClickEvent}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;

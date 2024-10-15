import NextLink from 'next/link';
import { useCallback, ReactNode, FC } from 'react';
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
  }, [gaLabel]);
  return (
    <NextLink
      role="link"
      className={className}
      aria-label={ariaLabel}
      onClick={gaClickEvent}
      href={href}
    >
      {children}
    </NextLink>
  );
};

export const BlankLink: FC<{
  children: ReactNode;
  href: string;
  className?: string;
  ariaLabel?: string;
}> = ({ children, href, className, ariaLabel }) => (
  <a
    href={href}
    className={className}
    target="_blank"
    rel="noopener noreferrer"
    role="link"
    aria-label={ariaLabel}
  >
    {children}
  </a>
);

export default Link;

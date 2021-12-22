import NextLink from 'next/link';
import { useCallback, ReactNode, VFC } from 'react';
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
      <a
        role="link"
        className={className}
        aria-label={ariaLabel}
        onClick={gaClickEvent}
      >
        {children}
      </a>
    </NextLink>
  );
};

export const BlankLink: VFC<{
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

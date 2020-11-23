import {
  Box,
  Link as ChakraLink,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import GitHubSlugger from 'github-slugger';

const Code = (props) => {
  if (props.className && props.className.startsWith('language-')) {
    return <chakra.code {...props}></chakra.code>;
  }
  return (
    <chakra.div
      p="0.4em"
      css={{
        borderRadius: 'sm',
        backgroundColor: '#444',
        color: '#f0f0f0',
        wordBreak: 'break-all',
        borderRadius: '4px',
        overflow: 'auto',
        display: 'block',
        lineHeight: '1.4em',
      }}
      {...props}
    />
  );
};

const LinkedHeading = ({ children, id, ...props }) => (
  <Box as="h1" {...props}>
    <span id={id}></span>
    <a className="underline" href={`#${id}`}>
      {children}
    </a>
    <style jsx>{`
      .underline {
        border-bottom: 1px solid transparent;
      }
      .underline:hover {
        border-bottom: 1px dashed currentColor;
      }
    `}</style>
  </Box>
);

const InlineCode = ({ children, ...props }) => {
  return (
    <Box as="code" apply="mdx.inlineCode" {...props}>
      {children}
    </Box>
  );
};

const Link = ({ href, hrefAs, ...props }) => {
  if (href && (href.startsWith('/') || href.startsWith('#'))) {
    return (
      <NextLink href={href} as={hrefAs} passHref>
        <ChakraLink apply="mdx.a" {...props} />
      </NextLink>
    );
  }
  return <ChakraLink apply="mdx.a" href={href} isExternal {...props} />;
};

const slugger = new GitHubSlugger();

const MDXComponents = {
  h1: (props) => (
    <LinkedHeading
      apply="mdx.h1"
      id={slugger.slug(props.children)}
      {...props}
    />
  ),
  h2: (props) => (
    <LinkedHeading
      as="h2"
      apply="mdx.h2"
      id={slugger.slug(props.children)}
      {...props}
    />
  ),
  h3: (props) => (
    <LinkedHeading
      as="h3"
      apply="mdx.h3"
      id={slugger.slug(props.children)}
      {...props}
    />
  ),
  h4: (props) => (
    <LinkedHeading
      as="h4"
      apply="mdx.h4"
      id={slugger.slug(props.children)}
      {...props}
    />
  ),
  hr: (props) => <chakra.hr apply="mdx.hr" {...props} />,
  strong: (props) => <Box as="strong" fontWeight="semibold" {...props} />,
  a: Link,
  p: (props) => <chakra.p apply="mdx.p" {...props} />,
  ul: (props) => <chakra.ul apply="mdx.ul" {...props} />,
  ol: (props) => <chakra.ol apply="mdx.ul" {...props} />,
  li: (props) => <chakra.li pb="4px" {...props} />,
  code: Code,
  inlineCode: InlineCode,
  br: (props) => <Box height="24px" {...props} />,
  blockquote: (props) => (
    <chakra.blockquote apply="mdx.blockquote" {...props} />
  ),
  table: (props) => {
    return (
      <chakra.div overflowX="auto">
        <chakra.table textAlign="left" mt="32px" width="full" {...props} />
      </chakra.div>
    );
  },
  th: (props) => (
    <chakra.th
      bg={useColorModeValue('gray.50', 'whiteAlpha.100')}
      fontWeight="semibold"
      p={2}
      fontSize="sm"
      {...props}
    />
  ),
  td: (props) => (
    <chakra.td
      p={2}
      borderTopWidth="1px"
      borderColor="inherit"
      fontSize="sm"
      whiteSpace="normal"
      {...props}
    />
  ),
};

export default MDXComponents;

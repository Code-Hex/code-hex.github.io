import Head from 'next/head';
import {
  Box,
  Flex,
  Container,
  ChakraProvider,
  extendTheme,
  useColorModeValue,
} from '@chakra-ui/react';
import Header from '../components/note/Header';
import Footer from '../components/note/Footer';
import { mode } from '@chakra-ui/theme-tools';

const customTheme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: mode('#DEE4E7', '#121212')(props),
      },
    }),
  },
  mdx: {
    h1: {
      mt: '2rem',
      mb: '.25rem',
      lineHeight: 1.3,
      fontWeight: 'bold',
      fontSize: '1.875rem',
      letterSpacing: '-.025em',
    },
    h2: {
      mt: '1.5rem',
      mb: '0.5rem',
      lineHeight: 1.25,
      fontWeight: 'bold',
      fontSize: '1.75em',
      letterSpacing: '-.025em',
      '& + h3': {
        mt: '1.5rem',
      },
    },
    h3: {
      mt: '1rem',
      lineHeight: 1.25,
      fontWeight: 'semibold',
      fontSize: '1.55rem',
      letterSpacing: '-.025em',
    },
    h4: {
      mt: '0.5rem',
      lineHeight: 1.175,
      fontWeight: 'semibold',
      fontSize: '1.35rem',
    },
    a: {
      color: 'green.500',
      fontWeight: 'semibold',
      transition: 'color 0.15s',
      transitionTimingFunction: 'ease-out',
      _hover: {
        color: 'green.600',
      },
    },
    p: {
      mt: '1.25rem',
      lineHeight: 1.7,
      'blockquote &': {
        mt: 0,
      },
    },
    hr: {
      my: '2rem',
    },
    blockquote: {
      color: '#6a737d',
      borderLeft: '.25em solid #dfe2e5',
      px: '1.25rem',
      py: '1rem',
      my: '1.5rem',
    },
    ul: {
      lineHeight: 1.7,
      ml: '1.25rem',
      'blockquote &': { mt: 0 },
      '& > * + *': {
        lineHeight: 1.7,
      },
    },
    code: {
      rounded: 'sm',
      px: '1',
      fontSize: '0.875em',
      py: '2px',
      whiteSpace: 'nowrap',
      lineHeight: 'normal',
    },
    inlineCode: {
      px: '2px',
      py: '2px',
      borderRadius: '4px',
      color: '#c7254e',
      bg: '#f9f2f4',
    },
  },
});

const ColorContainer = (props) => {
  return <Container bg={useColorModeValue('#FFFFFF', '#272727')} {...props} />;
};

const name = 'アルパカの徒然文';

/**
 *
 * @param {*} props
 * @param {string} props.title
 */
const NoteLayout = ({ children, title }) => {
  return (
    <ChakraProvider theme={customTheme}>
      <Head>
        <title>{title ? name + ' - ' + title : name}</title>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.9.0/themes/prism-tomorrow.min.css"
          rel="stylesheet"
        />
        <meta name="author" content="codehex"></meta>
        <meta
          name="description"
          content="codehexのメモ帳です。ブログな感じで技術的なことだったり日常生活で気がついたことを簡単にメモします。"
        ></meta>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        ></meta>
        <link rel="icon" href="/assets/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/favicon/favicon-16x16.png"
        />
      </Head>
      <ColorContainer maxW="3xl">
        <Flex flexDirection="column" minH="100%">
          <Box>
            <Header title={name} />
          </Box>
          <Box as="main" flex="1" h="100%">
            {children}
          </Box>
          <Footer title={name} />
        </Flex>
      </ColorContainer>
    </ChakraProvider>
  );
};

export default NoteLayout;

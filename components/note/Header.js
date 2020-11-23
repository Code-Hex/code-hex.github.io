import Link from 'next/link';
import {
  Box,
  Heading,
  Flex,
  useColorMode,
  IconButton,
  Spacer,
} from '@chakra-ui/react';
import CodeHex from '../CodeHex';
import DarkIcon from './DarkIcon';
import LightIcon from './LightIcon';

const Header = ({ title }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      py="4"
      mb="6"
      as="header"
      borderBottomWidth="1px"
      borderBottomColor="gray.300"
    >
      <Flex align="center">
        <Box>
          <CodeHex width="2em" height="2em" />
        </Box>
        <Box px="1">
          <Heading size="md">
            <Link href="/note" as="/note">
              <a>{title}</a>
            </Link>
          </Heading>
        </Box>
        <Spacer />
        <Box>
          <IconButton
            onClick={toggleColorMode}
            icon={colorMode === 'light' ? <DarkIcon /> : <LightIcon />}
            aria-label="Switch theme"
            variant="outline"
            _focus={{
              shadow: 'none',
            }}
          />
        </Box>
      </Flex>
      <style jsx>{`
        a {
          text-decoration: none;
        }
      `}</style>
    </Box>
  );
};

export default Header;

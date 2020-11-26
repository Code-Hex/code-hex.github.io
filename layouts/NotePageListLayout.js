import Link from 'next/link';
import NoteLayout from './NoteLayout';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

/**
 *
 * @param {string} p
 */
const formatPath = (p) => {
  return p.replace(/\.mdx?$/, '');
};

/**
 *
 * @param {string} d
 */
const formatDate = (d) => {
  return d.slice(0, 10);
};

// pages variable:
// [
//     {
//         title: 'こんにちは mdx!!',
//         date: '2020-11-23T00:00:00.000Z',
//         tags: [ 'blog', 'tag1', 'tag2', 'perl' ],
//         __resourcePath: 'blog/mdx-ftw.mdx'
//     }
// ]
const NotePageListLayout = ({ title, pages }) => {
  return (
    <NoteLayout minH="100%" title="Posts">
      <Box>
        <Heading pl="4" mb="4" size="lg">
          {title}
        </Heading>
      </Box>
      <Flex flexDirection="column">
        {pages.map((page) => (
          <Box w="100%" key={'/' + page.__resourcePath}>
            <Box
              _hover={{
                color: 'green.600',
              }}
              px="4"
              py="2"
            >
              <Link href={'/' + formatPath(page.__resourcePath)}>
                <a>
                  <Box>
                    <Text fontSize="sm">{formatDate(page.date)}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="600" fontSize="xl">
                      {page.title}
                    </Text>
                  </Box>
                </a>
              </Link>
            </Box>
          </Box>
        ))}
      </Flex>
    </NoteLayout>
  );
};

export default NotePageListLayout;

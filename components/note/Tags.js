import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';

const Tags = ({ tags }) => {
  return (
    <Flex flexDirection="row">
      {tags.map((tag) => (
        <Link href={`/note/tag/${tag}`}>
          <Box
            as="a"
            mr={2}
            px={2}
            py={1}
            fontSize="xs"
            borderWidth="1px"
            borderRadius="2px"
            borderColor={useColorModeValue('#000000', '#FFFFFF')}
            textDecoration="none"
            cursor="pointer"
            _hover={{
              backgroundColor: useColorModeValue('gray.200', 'gray.600'),
            }}
          >
            # {tag}
          </Box>
        </Link>
      ))}
    </Flex>
  );
};

export default Tags;

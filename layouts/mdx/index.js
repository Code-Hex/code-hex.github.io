import { MDXProvider } from '@mdx-js/react';
import NoteLayout from '../NoteLayout';
import { Heading, Text, Box } from '@chakra-ui/react';
import MDXComponents from '../../components/note/Mdx';
import Tags from '../../components/note/Tags';

export default function Index({ children, frontMatter }) {
  const { date, title, tags } = frontMatter;
  return (
    <NoteLayout title={title}>
      <MDXProvider components={{ ...MDXComponents }}>
        <Box px="4" mb={8}>
          <Text fontSize="xs" mb={2}>
            {date.toString()}
          </Text>
          <Heading as="h1" mb={{ base: 2, md: 3 }} size="lg">
            {frontMatter.title}
          </Heading>
          <Tags tags={tags} />
        </Box>
        <Box px="4" fontSize={{ base: 'sm', md: 'md' }} lineHeight="taller">
          {children}
        </Box>
      </MDXProvider>
    </NoteLayout>
  );
}

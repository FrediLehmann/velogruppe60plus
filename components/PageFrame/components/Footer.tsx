import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Link,
  Text
} from '@chakra-ui/react';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { TrackClickEvent } from 'components';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const Footer = () => {
  const user = useUser();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const today = new Date().getFullYear();

  return (
    <Box as="footer" mt="8" py="3" borderTop="1px solid" borderColor="gray.200">
      <Container
        maxW="container.md"
        display="flex"
        alignItems={['flex-start', 'center']}
        flexDirection={['column-reverse', 'row']}
        justifyContent="space-between"
        gap={['3', '8']}>
        <Box color="gray.700" fontSize={['xs', 'sm']}>
          <Text>© Copyright {today} by Frederic Lehmann,</Text>
          <Text>all rights reserved.</Text>
        </Box>
        <ButtonGroup spacing="3" variant="link" size="xs" colorScheme="black">
          <TrackClickEvent event={{ name: 'GITHUB_LINK_CLICK' }}>
            <NextLink
              href="https://github.com/FrediLehmann/velogruppe60plus"
              passHref
              legacyBehavior>
              <Button as={Link} aria-label="Github" isExternal>
                Github
              </Button>
            </NextLink>
          </TrackClickEvent>
          {user && (
            <TrackClickEvent event={{ name: 'SIGNOUT_BUTTON_CLICK' }}>
              <Button
                onClick={async () => {
                  await supabaseClient.auth.signOut();
                  router.push('/');
                }}>
                Abmelden
              </Button>
            </TrackClickEvent>
          )}
          {user ? (
            <TrackClickEvent event={{ name: 'ADMIN_LINK_CLICK' }}>
              <NextLink href="/admin" passHref legacyBehavior>
                <Button as={Link}>Admin</Button>
              </NextLink>
            </TrackClickEvent>
          ) : (
            <TrackClickEvent event={{ name: 'LOGIN_LINK_CLICK' }}>
              <NextLink href="/login" passHref legacyBehavior>
                <Button as={Link}>Login</Button>
              </NextLink>
            </TrackClickEvent>
          )}
        </ButtonGroup>
      </Container>
    </Box>
  );
};

export default Footer;

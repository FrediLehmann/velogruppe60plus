'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Link,
  Text
} from '@chakra-ui/react';

import { TrackClickEvent } from '@/components';
import { createClient } from '@/lib/supabase/client';

const Footer = () => {
  const router = useRouter();
  const supabase = createClient();

  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session }
      } = await supabase.auth.getSession();
      setSignedIn(session !== null);
    }

    checkSession();
  }, [supabase.auth]);

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
          <Text>
            © Copyright {new Date().getFullYear()} by Frederic Lehmann,
          </Text>
          <Text>all rights reserved.</Text>
        </Box>
        <ButtonGroup spacing="3" variant="link" size="xs" colorScheme="black">
          <TrackClickEvent event={{ name: 'GITHUB_LINK_CLICK' }} showBox={true}>
            <NextLink
              href="https://github.com/FrediLehmann/velogruppe60plus"
              passHref
              legacyBehavior>
              <Button as={Link} aria-label="Github" isExternal>
                Github
              </Button>
            </NextLink>
          </TrackClickEvent>
          {signedIn && (
            <TrackClickEvent
              event={{ name: 'SIGNOUT_BUTTON_CLICK' }}
              showBox={true}>
              <Button
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.push('/');
                }}>
                Abmelden
              </Button>
            </TrackClickEvent>
          )}
          {signedIn ? (
            <TrackClickEvent
              event={{ name: 'ADMIN_LINK_CLICK' }}
              showBox={true}>
              <NextLink href="/admin" passHref legacyBehavior>
                <Button as={Link}>Admin</Button>
              </NextLink>
            </TrackClickEvent>
          ) : (
            <TrackClickEvent
              event={{ name: 'LOGIN_LINK_CLICK' }}
              showBox={true}>
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

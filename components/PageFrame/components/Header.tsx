import { Button, ButtonGroup, Container, Link, Text } from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import NextLink from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const user = useUser();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  return (
    <Container
      as="header"
      py="4"
      maxW="container.md"
      display="flex"
      justifyContent="space-between"
    >
      <Text fontSize={["xl", "2xl"]} fontWeight="bold">
        Velogruppe 60+
      </Text>
      <ButtonGroup size="sm" gap="4">
        {user && (
          <Button
            as={Link}
            variant="link"
            onClick={async () => {
              await supabaseClient.auth.signOut();
              router.push("/");
            }}
          >
            Abmelden
          </Button>
        )}
        <NextLink href="/alle-touren" passHref legacyBehavior>
          <Button as={Link} variant="link">
            Alle Touren
          </Button>
        </NextLink>
      </ButtonGroup>
    </Container>
  );
};

export default Header;

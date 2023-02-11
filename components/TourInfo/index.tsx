import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Link,
  Text
} from '@chakra-ui/react';
import { ArrowRight, Clock, MessageCircle } from 'icons';
import NextLink from 'next/link';

const TourInfo = () => {
  return (
    <Box as="section">
      <Heading as="h2" size="md" color="green.800">
        Touren
      </Heading>
      <Heading as="h2" size="lg" mb="3">
        Was muss ich wissen?
      </Heading>
      <Text fontSize="lg">
        Jede Woche fahren wir eine von über 30 Touren, kreuz und quer durch das
        schöne Sensetal. Dabei sind wir einen halben, bis einen ganzen Tag
        unterwegs.
      </Text>
      <Grid mt="8" templateColumns={['1fr', 'repeat(2, 1fr)']} gap="6">
        <GridItem>
          <Flex gap="4">
            <Flex
              background="green.400"
              w="50px"
              h="50px"
              borderRadius="lg"
              color="white">
              <Text fontSize="lg" fontWeight="bold" m="auto">
                Mi
              </Text>
            </Flex>
            <Box>
              <Text fontSize="lg" fontWeight="semibold">
                Jeden Mittwoch
              </Text>
              <Text maxW={['25ch', '20ch', '25ch']}>
                Die Touren finden einmal pro Woche statt, jeweils am Mittwoch.
              </Text>
            </Box>
          </Flex>
        </GridItem>
        <GridItem>
          <Flex gap="4">
            <Flex
              background="green.400"
              w="50px"
              h="50px"
              borderRadius="lg"
              color="white">
              <Text fontSize="lg" fontWeight="bold" m="auto">
                30+
              </Text>
            </Flex>
            <Box>
              <Text fontSize="lg" fontWeight="semibold">
                Über 30 Touren
              </Text>
              <Text maxW={['25ch', '20ch', '25ch']}>
                Jede Woche wird eine andere von über 30 Touren gefahren.
              </Text>
              <NextLink href="/alle-touren" passHref legacyBehavior>
                <Link display="block" mt="2" color="green.700">
                  Touren ansehen <ArrowRight boxSize="4" />
                </Link>
              </NextLink>
            </Box>
          </Flex>
        </GridItem>
        <GridItem>
          <Flex gap="4">
            <Flex
              background="green.400"
              w="50px"
              h="50px"
              borderRadius="lg"
              justifyContent="center"
              color="white">
              <Clock boxSize="6" strokeWidth="3" my="auto" />
            </Flex>
            <Box>
              <Text fontSize="lg" fontWeight="semibold">
                Halb- und Ganztagestouren
              </Text>
              <Text maxW={['25ch', '20ch', '25ch']}>
                Jeweils 35 bis 50 Kilometer oder Ganztagestouren von 60 bis 70
                Kilometer.
              </Text>
            </Box>
          </Flex>
        </GridItem>
        <GridItem>
          <Flex gap="4">
            <Flex
              background="green.400"
              w="50px"
              h="50px"
              borderRadius="lg"
              justifyContent="center"
              color="white">
              <Text fontSize="lg" fontWeight="bold" m="auto">
                FN
              </Text>
            </Flex>
            <Box>
              <Text fontSize="lg" fontWeight="semibold">
                Freiburger-Nachrichten
              </Text>
              <Text maxW={['25ch', '20ch', '25ch']}>
                Die genauen Zeitpunkte der nächsten Tour wird jeweils Dienstags
                und Mittwochs publiziert.
              </Text>
            </Box>
          </Flex>
        </GridItem>
        <GridItem>
          <Flex gap="4">
            <Flex
              background="green.400"
              w="50px"
              h="50px"
              borderRadius="lg"
              justifyContent="center"
              color="white">
              <MessageCircle boxSize="6" strokeWidth="3" my="auto" />
            </Flex>
            <Box>
              <Text fontSize="lg" fontWeight="semibold">
                WhatsApp Gruppe
              </Text>
              <Text maxW={['25ch', '20ch', '25ch']}>
                Die Gruppe dient dazu die Teilnehmer über Änderungen zu
                informieren.
              </Text>
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default TourInfo;

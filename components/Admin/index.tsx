import { Container } from '@chakra-ui/react';
import { NewTourSection, NextTourSection, Tours } from './components';

const Admin = () => {
  return (
    <Container maxW="container.md" mt={['4', '6', '12']}>
      <NextTourSection />
      <NewTourSection />
      <Tours />
    </Container>
  );
};

export default Admin;

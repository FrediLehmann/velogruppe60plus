import {
  AdditionalInfos,
  EBikeSecurity,
  Organisers,
  RulesOfConduct,
  Stack,
  TourInfo
} from './components';

export async function generateMetadata() {
  return {
    title: 'Velogruppe 60+ Sensetal | Informationen',
    description:
      'Das Programm umfasst Touren mit verschiedenen Distanzen, Halb- und Tagestouren. Wir werden auch interessante Sehenswürdigkeiten entlang der Strecke besuchen und uns Zeit nehmen, um die Schönheit der Natur zu genießen. Neben der Verbesserung der körperlichen Fitness bieten die Touren auch die Gelegenheit, die Landschaft der Region auf eine aufregende und umweltfreundliche Art und Weise zu erkunden.'
  };
}

export default function Information() {
  return (
    <Stack>
      <TourInfo />
      <Organisers />
      <RulesOfConduct />
      <EBikeSecurity />
      <AdditionalInfos />
    </Stack>
  );
}

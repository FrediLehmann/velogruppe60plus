import { useEffect } from 'react';

type GTagWindow = Window & typeof globalThis & { dataLayer: any[] };

export default function GoogleTag() {
  useEffect(() => {
    (window as GTagWindow).dataLayer = (window as GTagWindow).dataLayer || [];

    function gtag(...args: any[]) {
      (window as GTagWindow).dataLayer.push(args);
    }

    gtag('js', new Date());
    gtag('config', 'G-E1N4BTYCY0');
  }, []);

  return <></>;
}

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ revalidated: boolean } | { message: string }>
) {
  const { body, method } = req;

  if (method === 'POST') {
    const { secret, pages }: { secret: string; pages: string[] } =
      JSON.parse(body);

    // Check for secret to confirm this is a valid request
    if (secret !== process.env.NEXT_REGENERATE_TOKEN) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    try {
      await res.revalidate('/');
      pages.forEach(async page => await res.revalidate(`/${page}`));

      return res.json({ revalidated: true });
    } catch (err) {
      // If there was an error, Next.js will continue
      // to show the last successfully generated page
      return res.status(500).send({ message: `Error revalidating: ${err}` });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}

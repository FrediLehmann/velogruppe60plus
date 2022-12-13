import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ revalidated: boolean } | { message: string }>
) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.NEXT_REGENERATE_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    if (!req.query.pages) {
      await res.revalidate('/');
    } else {
      await Promise.all(
        req.query.pages
          .toString()
          .split(',')
          .map(page => res.revalidate(`/${page}`))
      );
    }

    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send({ message: 'Error revalidating' });
  }
}

import prisma from 'lib/prisma';

const handler = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({
      message: 'Method not allowed',
    });
    return;
  }

  const trips = await prisma.trip.findMany();
  res.status(200).json(trips);
};

export default handler;

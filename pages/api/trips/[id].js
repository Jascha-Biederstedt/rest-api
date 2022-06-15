import prisma from 'lib/prisma';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const trip = await prisma.trip.findUnique({
      where: {
        id: parseInt(req.query.id),
      },
    });
    if (!trip) {
      res.status(404).json({ message: 'Not Found' });
    }
    res.status(200).json(trip);
  }

  if (req.method === 'PUT') {
  }

  if (req.method === 'DELETE') {
  }
};

export default handler;

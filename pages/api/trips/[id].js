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
    const { user, name, start_date, end_date } = req.body;

    await prisma.trip.update({
      data: {
        user,
        name,
        start_date,
        end_date,
      },
      where: {
        id: parseInt(req.query.id),
      },
    });

    return res.status(200).end();
  }

  if (req.method === 'DELETE') {
    await prisma.trip.delete({
      where: {
        id: parseInt(req.query.id),
      },
    });

    return res.status(200).end();
  }
};

export default handler;

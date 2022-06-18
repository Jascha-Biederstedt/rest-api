import prisma from 'lib/prisma';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const trips = await prisma.trip.findMany();

    await Promise.all(
      trips.map(async trip => {
        trip.expenses = await prisma.expense.findMany({
          where: {
            trip: trip.id,
          },
        });
      })
    );

    return res.status(200).json(trips);
  }

  if (req.method === 'POST') {
    const { user, name, start_date, end_date } = req.body;

    if (!user) {
      res.status(400).json({ message: 'Missing required parameter `user`' });
    }

    if (!name) {
      res.status(400).json({ message: 'Missing required parameter `name`' });
    }

    await prisma.trip.create({
      data: {
        user,
        name,
        start_date,
        end_date,
      },
    });

    return res.status(200).end();
  }

  res.status(405).json({
    message: 'Method not allowed',
  });
};

export default handler;

import { Cycle } from './../model/cycle.js';

export async function save(req, res) {
  try {
    const userId = req.session?.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const { cycleTitle, startDate, items } = req.body;

    if (
      !cycleTitle ||
      !startDate ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const normalizedItems = items.map((it) => ({
      title: it.title,
      length: Number(it.length),
      start: it.start,
      end: it.end,
      color: it.backgroundColor ?? '#55b2fa',
    }));

    const cycle = await Cycle.create({
      userId,
      cycleTitle,
      startDate,
      items: normalizedItems,
    });

    return res.status(201).json({ cycle });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to save cycle' });
  }
}

export async function get(req, res) {
  try {
    const userId = req.session?.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const cycles = await Cycle.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({ cycles });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to get cycles' });
  }
}

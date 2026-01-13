import { useEffect, useRef, useState } from 'react';
import { addEvent, getCycles } from '../../calendarService';

export default function GoogleSync() {
  const [status, setStatus] = useState('idle');
  const [doneCount, setDoneCount] = useState(0);
  const [total, setTotal] = useState(0);
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    const run = async () => {
      try {
        setStatus('running');
        setDoneCount(0);

        const data = await getCycles();
        const cycles = data?.cycles ?? [];

        const events = cycles.flatMap((cycle) => {
          const items = cycle.items ?? [];
          return items.map((it) => ({
            summary: it.title,
            start: { date: it.start },
            end: { date: it.end },
          }));
        });

        setTotal(events.length);

        for (let i = 0; i < events.length; i++) {
          await addEvent(events[i]);
          setDoneCount(i + 1);
        }

        setStatus('done');
      } catch (err) {
        console.log(err);
        setStatus('error');
      }
    };

    run();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-2">Google Sync</h1>

      {status === 'running' && (
        <p>
          Syncing... {doneCount} / {total}
        </p>
      )}

      {status === 'done' && <p>Done! Synced {doneCount} events.</p>}

      {status === 'error' && (
        <p className="text-red-600">Sync failed. Check console.</p>
      )}
    </div>
  );
}

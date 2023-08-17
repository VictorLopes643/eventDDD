import { Customer } from '../customer.entity';
import { EventSection } from '../event-section';
import { Event } from '../event.entity';
import { EventSpot } from '../event.spot';
import { PartnerId } from '../partner.entity';

test('should create event', () => {
  const event = Event.create({
    name: 'Evento',
    description: 'description',
    date: new Date(),
    partnerId: new PartnerId(),
  });

  const section = EventSection.create({
    name: 'section',
    description: 'description',
    price: 10,
    total_spots: 100,
  });

  event.sections.add(section);

  const spot = EventSpot.create();

  section.spots.add(spot);

  console.dir(event.toJSON(), { depth: 10 });
});

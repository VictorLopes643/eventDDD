import { AggregateRoot } from '../../../common/domain/aggregate-root';
import Uuid from '../../../common/domain/value-objects/uuid.vo';
import { EventSection } from './event-section';
import { PartnerId } from './partner.entity';

export class EventId extends Uuid {}

export type CreateEventCommand = {
  name: string;
  description: string;
  date: Date;
  partnerId: PartnerId;
};

export type EventConstructorProp = {
  id?: EventId | string;
  name: string;
  description: string;
  date: Date;
  is_published: boolean;
  total_spots: number;
  total_spots_reserved: number;
  partnerId: PartnerId;
  sections?: Set<EventSection>;
};

export class Event extends AggregateRoot {
  id: EventId;
  name: string;
  description: string;
  date: Date;
  is_published: boolean;
  total_spots: number;
  total_spots_reserved: number;
  partnerId: PartnerId;
  sections: Set<EventSection>;
  constructor(props: EventConstructorProp) {
    super();
    this.id =
      typeof props.id === 'string'
        ? new EventId(props.id)
        : props.id ?? new EventId();
    this.name = props.name;
    this.description = props.description;
    this.date = props.date;
    this.is_published = props.is_published;
    this.total_spots = props.total_spots;
    this.total_spots_reserved = props.total_spots_reserved;
    this.partnerId =
      props.partnerId instanceof PartnerId
        ? props.partnerId
        : new PartnerId(props.partnerId);
    this.sections = props.sections ?? new Set<EventSection>();
  }

  static create(command: CreateEventCommand) {
    return new Event({
      name: command.name,
      partnerId: command.partnerId,
      description: command.description,
      date: command.date,
      is_published: false,
      total_spots: 0,
      total_spots_reserved: 0,
    });
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      date: this.date,
      is_published: this.is_published,
      total_spots: this.total_spots,
      total_spots_reserved: this.total_spots_reserved,
      partnerId: this.partnerId,
      sections: [...this.sections].map((section) => section.toJSON()),
    };
  }
}

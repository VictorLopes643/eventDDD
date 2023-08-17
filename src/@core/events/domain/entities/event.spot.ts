import { Entity } from '../../../common/domain/entity';
import Uuid from '../../../common/domain/value-objects/uuid.vo';
import { EventSection } from './event-section';

export class EventSpotId extends Uuid {}

export type EventSpotConstructorProp = {
  id?: EventSpotId | string;
  location: string | null;
  is_reserved: boolean;
  is_published: boolean;
};

export class EventSpot extends Entity {
  id: EventSpotId;
  location: string;
  is_reserved: boolean;
  is_published: boolean;

  constructor(props: EventSpotConstructorProp) {
    super();
    this.id =
      typeof props.id === 'string'
        ? new EventSpotId(props.id)
        : props.id ?? new EventSpotId();
    this.location = props.location;
    this.is_reserved = props.is_reserved;
    this.is_published = props.is_published;
  }

  static create() {
    return new EventSpot({
      location: null,
      is_reserved: false,
      is_published: false,
    });
  }
  toJSON() {
    return {
      id: this.id,
      location: this.location,
      is_reserved: this.is_reserved,
      is_published: this.is_published,
    };
  }
}

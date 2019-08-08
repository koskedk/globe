import { IEvent } from '@nestjs/cqrs';

export class AgencyDeletedEvent implements IEvent {
  constructor(public readonly id: string) {
  }
}

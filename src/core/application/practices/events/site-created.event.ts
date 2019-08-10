import { IEvent } from '@nestjs/cqrs';

export class SiteCreatedEvent implements IEvent {
  constructor(public readonly id: string) {
  }
}

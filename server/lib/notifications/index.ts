import telegram from './telegram';

export type Event = 'success' | 'error';

export type JobEventPayload = Partial<{
  name: string;
  status: string;
  origQty: string;
  executedQty: string;
  cummulativeQuoteQty: string;
  nextRunAt: string | null;
  transactTime: string;
  date: string;
  reason: string;
  userEmail: string;
  apiKey: string;
  apiSecret: string;
}>;

export default {
  async sendMessage(event: Event, job: JobEventPayload) {
    await Promise.all([telegram.sendMessage(event, job)]);
  },
};

import { z } from 'zod';
import { createRoute } from 'honox/factory';
import { zValidator } from '@hono/zod-validator';

const schema = z.object({
    name: z.string().max(10),
});

export type ResponseType = {
    success: boolean;
    name?: string;
    error?: string;
}

export const POST = createRoute(
  zValidator('json', schema, (result, c) => {
      if (result.success) {
          return c.json<ResponseType>({ success: true, name: result.data.name });
      } else {
          return c.json<ResponseType>({ success: false, error: result.error.errors[0].message }, { status: 400 });
      }
  }));

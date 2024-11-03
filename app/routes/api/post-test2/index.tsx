import { z } from 'zod';
import { createRoute } from 'honox/factory';
import { zValidator } from '@hono/zod-validator';
import { PrismaClient } from '@prisma/client';

const schema = z.object({
    name: z.string().max(10),
});

export type ResponseType = {
    success: boolean;
    name?: string;
    error?: string;
}

export const POST = createRoute(
  zValidator('json', schema, async (result, c) => {
      if (result.success) {
          const prisma = new PrismaClient();
          const user = await prisma.users.findFirst();
          if (user) {
              await prisma.users.update({
                  where: {
                      id: user.id,
                  },
                  data: {
                      name: result.data.name,
                  },
              });    
          } else {
              await prisma.users.create({
                  data: {
                      name: result.data.name,
                  },
              });
          }
          return c.json<ResponseType>({ success: true, name: result.data.name });
      } else {
          return c.json<ResponseType>({ success: false, error: result.error.errors[0].message }, { status: 400 });
      }
  }));

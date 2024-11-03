import { z } from 'zod';
import { createRoute } from 'honox/factory';
import { zValidator } from '@hono/zod-validator';
import { PostTest } from '../../post-test';
import { getCookie, setCookie } from 'hono/cookie'

const schema = z.object({
    name: z.string().max(10),
});

export const POST = createRoute(
  zValidator('form', schema, (result, c) => {
      if (result.success) {
          setCookie(c, 'name', result.data.name);
          return c.redirect('/post-test');
      } else {
          const name = getCookie(c, 'name') ?? 'no name';
          return c.render(<PostTest name={name} error={result.error.errors[0].message} />, { title: 'ポストテストページ' })
      }
  }));

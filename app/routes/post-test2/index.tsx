import { css } from 'hono/css';
import { createRoute } from 'honox/factory';
import { Page } from '../../islands/post-test2/page';
import { PrismaClient } from '@prisma/client';

const className = css`
    font-family: sans-serif;
`;

const errorClassName = css`
    color: red;
`;

export default createRoute(async (c) => {
    const prisma = new PrismaClient();
    const user = await prisma.users.findFirst();
    return c.render(<Page name={user?.name || ''} />, {title: 'ポストテストページ2'});
});

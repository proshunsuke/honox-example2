import { css } from 'hono/css';
import { createRoute } from 'honox/factory';
import { Page } from '../../islands/post-test2/page';

const className = css`
    font-family: sans-serif;
`;

const errorClassName = css`
    color: red;
`;

export default createRoute((c) => {
    const name = 'no name';
    return c.render(<Page name={name} />, {title: 'ポストテストページ2'});
});

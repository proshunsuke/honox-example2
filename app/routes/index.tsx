import { css } from 'hono/css';
import { createRoute } from 'honox/factory';
import Counter from '../islands/counter';

const className = css`
    font-family: sans-serif;
`;

export default createRoute((c) => {
    const name = c.req.query('name') ?? 'Hono';
    return c.render(
      <div class={className}>
          <h1>Hello, {name}!</h1>
          <Counter/>
          <ul>
              <li><a href="/post-test">post-testへ</a></li>
              <li><a href="/post-test2">post-test2へ</a></li>
          </ul>
      </div>,
      {title: name}
    );
});

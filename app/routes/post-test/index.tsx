import { css } from 'hono/css';
import { createRoute } from 'honox/factory';
import { getCookie, setCookie } from 'hono/cookie';
import { FC } from 'hono/jsx';

const className = css`
    font-family: sans-serif;
`;

const errorClassName = css`
    color: red;
`;

type Props = {
    name: string;
    error?: string;
}

export const PostTest: FC<Props> = ({name, error}) => {
    return (
      <div>
          <h1>Hello POST, {name}!</h1>
          <form method="post" action="/api/test-post">
              <input type="text" name="name" placeholder="name"/>
              <input type="submit"/>
          </form>
          {error && <p class={errorClassName}>{error}</p>}
      </div>
    );
};

export default createRoute((c) => {
    const name = getCookie(c, 'name') ?? 'no name';
    return c.render(<PostTest name={name}/>, {title: 'ポストテストページ'});
});

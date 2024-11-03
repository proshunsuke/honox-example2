import { FC, useState } from 'hono/jsx';
import { css } from 'hono/css';
import { ResponseType } from '../../../routes/api/post-test2';

type Props = {
    name: string
}

const errorClassName = css`
    color: red;
`;

export const Page: FC<Props> = ({name}) => {
    const [displayName, setDisplayName] = useState(name)
    const [error, setError] = useState('');
    const post = async (formData: FormData) => {
        const response = await fetch('/api/post-test2', {
            method: 'POST',
            body: JSON.stringify({ name: formData.get('name') }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const res = await response.json<ResponseType>()
        if (response.status >= 400) {
            if (res.error) {
                setError(res.error);    
            }
            
        } else {
            if (res.name) {
                setDisplayName(res.name);    
            }
        }
    };
    
    return (
      <div>
          <h1>Hello POST, {displayName}!</h1>
          <p>DBからデータ取ったりDBにデータ保存・更新したり</p>
          <form action={post} >
              <input type="text" name="name" placeholder="name" />
              <input type="submit"/>
          </form>
          {error && <p class={errorClassName} >{error}</p>}
      </div>
    )
}

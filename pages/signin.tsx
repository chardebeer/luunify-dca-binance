import React from 'react';
import { getCsrfToken } from 'next-auth/react';
import { CtxOrReq } from 'next-auth/client/_utils';

interface Props {
  csrfToken?: string;
}

export default function SignIn({ csrfToken }: Props) {
  return (
    <form method="post" action="/api/auth/signin/email">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label>
        Email address
        <input type="email" id="email" name="email" style={{ border: '1px solid grey' }} />
      </label>
      <button type="submit" style={{ backgroundColor: 'lightGray' }}>
        Sign in with Email
      </button>
    </form>
  );
}

// export async function getStaticProps(context: CtxOrReq | undefined) {
//   return {
//     props: { csrfToken: await getCsrfToken(context) }, // will be passed to the page component as props
//   };
// }

export async function getServerSideProps(context: CtxOrReq | undefined) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}

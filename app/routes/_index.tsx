import type { V2_MetaFunction } from '@remix-run/react';
import { init, insertProfile } from '~/db/db';
import type { InsertProfile } from '~/db/schema';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'New Remix App' }];
};
export async function loader() {
  init();
  const newProfile: InsertProfile = {
    nickname: 'test',
    email: 'kkt@kkt.com',
  };

  const getInsertId = await insertProfile(newProfile);
  console.log('🚀 ~ file: _index.tsx:11 ~ loader ~ getInsertId:', getInsertId);
  // const newCountry: InsertCountry = {
  //   name: 'United States of America',
  // };
  // insertCountry(newCountry);
  // const result = getCountries();
  // console.log('🚀 ~ file: _index.tsx:11 ~ loader ~ result:', result);
  return {};
}

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a target="_blank" href="https://remix.run/tutorials/blog" rel="noreferrer">
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/tutorials/jokes" rel="noreferrer">
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}

/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import PropTypes from 'prop-types';
import { Typography } from '@material-tailwind/react';

import ThreadItem from './ThreadItem';
import ThreadSkeleton from './ThreadSkeleton';

export default function ThreadList({ threadList }) {
  return (
    <section className="my-6 home-page__content p-4 rounded-xl w-full md:w-2/3 lg:w-3/5">
      <Typography variant="h3">Diskusi Tersedia</Typography>
      {threadList.length === 0 && <ThreadSkeleton />}
      {threadList.map((data, index) => <ThreadItem {...data} key={index} />)}
    </section>
  );
}

ThreadList.propTypes = {
  threadList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

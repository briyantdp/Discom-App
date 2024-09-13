/* eslint-disable max-len */
/**
 * test scenario for threadsReducer
 *
 * - threadsReducer function
 *   - should return the initial state when given an unknown action
 *   - should return the initial state when given by threads/receive action
 *   - should return the threads with the new thread when given by threads/add action
 *   - should return the threads with the upvoted thread when given by threads/up-vote action
 *   - should return the threads with the neutralized thread when given by threads/neutralize-vote action
 *   - should return the threads with the downvoted thread when given by threads/down-vote action
 */

import { describe, expect, it } from 'vitest';
import threadsReducer from './reducer';

const fakeThreadsResponse = [
  {
    id: 'thread-1',
    title: 'Bagaimana pengalamanmu belajar redux?',
    body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
    category: 'redux',
    createdAt: '2021-06-23T07:00:00.000Z',
    ownerId: 'user-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
  {
    id: 'thread-2',
    title: 'Halo! Selamat datang dan silakan perkenalkan diri kamu',
    body: '<div>Bagaimana kabarmu? Semoga baik-baik saja ya. Sekali lagi saya ucapkan selamat datang semuanya!</div><div><br></div><div>Seperti yang sudah disampaikan sebelumnya, pada diskusi ini kamu bisa memperkenalkan diri kamu dan juga berkenalan dengan teman sekelas lainnya.</div><div><br></div><div>Berhubungan baik dengan teman sekelas dan instruktur merupakan bagian penting dari pembelajaran di kelas ini, karena mereka dapat membantu jika kamu mengalami kendala dalam mempelajari dan memahami materi.&nbsp;&nbsp;</div><div><br></div><div>Oleh karena itu, luangkanlah waktumu untuk saling mengenal dan mencairkan suasana. Membangun interaksi dengan siswa lain akan membuat pengalaman belajar kamu jauh lebih menyenangkan dan menarik.&nbsp;</div><div><br></div><div>Beberapa hal yang dapat kamu tulis pada perkenalan diri:</div><div><br></div><div>- Siapa kamu dan dari mana kamu berasal?</div><div>- Apa pekerjaan atau pendidikan kamu saat ini?</div><div>- Kenapa kamu mengambil pelatihan ini? Apakah mungkin karena kamu sedang mengejar perubahan dalam karir, atau lainnya?</div>',
    category: 'General',
    createdAt: '2021-06-23T07:00:00.000Z',
    ownerId: 'user-1',
    upVotesBy: [],
    downVotesBy: [],
  },
];

describe('threadsReducer', () => {
  it('should return the initial state when given an unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the initial state when given by threads/receive action', () => {
    const initialState = [];
    const action = {
      type: 'threads/receive',
      payload: {
        threads: fakeThreadsResponse,
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return the threads with the new thread when given by threads/add action', () => {
    const initialState = fakeThreadsResponse;
    const action = {
      type: 'threads/add',
      payload: {
        thread: {
          id: 'thread-3',
          title: 'Test tambah thread',
          body: 'Coba test',
          category: 'test',
          createdAt: '2021-06-23T07:00:00.000Z',
          ownerId: 'user-1',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([...initialState, action.payload.thread]);
  });

  it('should return the threads with the upvoted thread when given by threads/up-vote action', () => {
    const initialState = fakeThreadsResponse;
    const action = {
      type: 'threads/up-vote',
      payload: {
        userId: 'user-1',
        threadId: 'thread-1',
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(initialState.map((thread) => {
      if (thread.id !== action.payload.threadId) {
        return thread;
      }
      return {
        ...thread,
        upVotesBy: [...thread.upVotesBy, action.payload.userId],
        downVotesBy: thread.downVotesBy.filter(
          (id) => id !== action.payload.userId,
        ),
      };
    }));
  });

  it('should return the threads with the neutralized thread when given by threads/neutralize-vote action', () => {
    const initialState = fakeThreadsResponse;
    const action = {
      type: 'threads/neutralize-vote',
      payload: {
        userId: 'user-1',
        threadId: 'thread-1',
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(initialState.map((thread) => {
      if (thread.id !== action.payload.threadId) {
        return thread;
      }
      return {
        ...thread,
        upVotesBy: thread.upVotesBy.filter(
          (id) => id !== action.payload.userId,
        ),
        downVotesBy: thread.downVotesBy.filter(
          (id) => id !== action.payload.userId,
        ),
      };
    }));
  });

  it('should return the threads with the downvoted thread when given by threads/down-vote action', () => {
    const initialState = fakeThreadsResponse;
    const action = {
      type: 'threads/down-vote',
      payload: {
        userId: 'user-1',
        threadId: 'thread-1',
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(initialState.map((thread) => {
      if (thread.id !== action.payload.threadId) {
        return thread;
      }
      return {
        ...thread,
        upVotesBy: thread.upVotesBy.filter(
          (id) => id !== action.payload.userId,
        ),
        downVotesBy: [...thread.downVotesBy, action.payload.userId],
      };
    }));
  });
});

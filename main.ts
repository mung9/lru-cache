import chai from 'chai';
import { LRUCache } from './LRUCache';
const { expect } = chai;

describe('LRUCache test', () => {
  it('Capacity를 초과하도록 put을 수행했을 때 가장 오래된 아이템이 사라진다', () => {
    const cache = new LRUCache<string, string>(3);
    cache.put('file:1', '111');
    cache.put('file:2', '222');
    cache.put('file:3', '333');
    cache.put('file:4', '444');

    expect(cache.values())
      .to.have.ordered.members(['444', '333', '222'])
      .and.length(3);
  });

  it('조회된 아이템은 맨 앞으로 옮겨진다', () => {
    const cache = new LRUCache<string, string>(3);
    cache.put('file:1', '111');
    cache.put('file:2', '222');
    cache.put('file:3', '333');
    cache.get('file:1');

    expect(cache.values())
      .to.have.ordered.members(['111', '333', '222'])
      .and.length(3);
  });

  it('존재하지 않는 key를 대상으로 get을 호출하면 undefined를 반환한다', () => {
    const cache = new LRUCache<string, string>(3);
    cache.put('file:1', '111');
    cache.put('file:2', '222');
    cache.put('file:3', '333');

    expect(cache.get('file:4')).to.be.undefined;
  });

  it('제네릭으로 key와 value의 타입을 지정할 수 있다', () => {
    interface Post {
      title: string;
      content: string;
    }

    const post1: Post = {
      title: 'post1',
      content: 'I am post1'
    };

    const post2: Post = {
      title: 'post2',
      content: 'I am post2'
    };

    const post3: Post = {
      title: 'post3',
      content: 'I am post3'
    };

    const cache = new LRUCache<string, Post>(5);
    cache.put('post:1', post1);
    cache.put('post:2', post2);
    cache.put('post:3', post3);

    expect(cache.get('post:1')).to.equal(post1);
    expect(cache.get('post:2')).to.equal(post2);
    expect(cache.get('post:3')).to.equal(post3);
  });
});

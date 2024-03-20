import { SnakeToTitleCasePipe } from './snake-to-title-case.pipe';

describe('SnakeToTitleCasePipe', () => {
  let pipe: SnakeToTitleCasePipe;

  beforeEach(() => {
    pipe = new SnakeToTitleCasePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms snake case to title case', () => {
    const input = 'hello_world';
    const transformed = pipe.transform(input);
    expect(transformed).toEqual('Hello World');
  });

  it('transforms single word snake case to title case', () => {
    const input = 'hello';
    const transformed = pipe.transform(input);
    expect(transformed).toEqual('Hello');
  });

  it('returns empty string for empty input', () => {
    const input = '';
    const transformed = pipe.transform(input);
    expect(transformed).toEqual('');
  });

  it('handles undefined input', () => {
    const input: any = undefined;
    const transformed = pipe.transform(input);
    expect(transformed).toEqual('');
  });
});

describe('[COMMON] fn test', () => {
  const fn = {
    add: (a: number, b: number) => a + b,
  };

  it('1 + 1 = 2', () => {
    expect(fn.add(1, 1)).toBe(2);
  });

  it('2 + 1 = 3', () => {
    expect(fn.add(2, 1)).toBe(3);
  });

  it('4 + 3 = 7', () => {
    expect(fn.add(4, 3)).toBe(7);
  });

  it('4 + 3 != 6', () => {
    expect(fn.add(4, 3)).not.toBe(6);
  });
});

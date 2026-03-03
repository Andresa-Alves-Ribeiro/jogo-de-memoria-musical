import { renderHook } from '@testing-library/react';
import { useMenuHoverSound } from '../useMenuHoverSound';

describe('useMenuHoverSound', () => {
  it('should return a function', () => {
    const { result } = renderHook(() => useMenuHoverSound());
    expect(typeof result.current).toBe('function');
  });

  it('should not throw when called', () => {
    const { result } = renderHook(() => useMenuHoverSound());
    expect(() => result.current()).not.toThrow();
  });
});

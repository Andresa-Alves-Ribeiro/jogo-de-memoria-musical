import '@testing-library/jest-dom';
import { vi } from 'vitest';

const storage: Record<string, string> = {};
const localStorageMock = {
  getItem: vi.fn((key: string) => storage[key] ?? null),
  setItem: vi.fn((key: string, value: string) => {
    storage[key] = value;
  }),
  clear: vi.fn(() => {
    Object.keys(storage).forEach((key) => delete storage[key]);
  }),
  removeItem: vi.fn((key: string) => {
    delete storage[key];
  }),
  get length() {
    return Object.keys(storage).length;
  },
  key: vi.fn((index: number) => Object.keys(storage)[index] ?? null),
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

class AudioMock {
  play = vi.fn().mockResolvedValue(undefined);
  pause = vi.fn();
  load = vi.fn();
  currentTime = 0;
  addEventListener = vi.fn();
  removeEventListener = vi.fn();
  onended = null;
}

Object.defineProperty(window, 'Audio', { value: AudioMock });

vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
})); 
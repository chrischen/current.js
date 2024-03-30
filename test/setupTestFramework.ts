import { vi } from "vitest";

// this file is ran right after the test framework is setup for some test file.
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

// logger import on graphql app.js

import '@testing-library/jest-dom/vitest';

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
// import "raf/polyfill";
// import { configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// configure({ adapter: new Adapter() });

// require('jest-fetch-mock').enableMocks();

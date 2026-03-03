import "@testing-library/jest-dom";

jest.mock("lucide-react", () => ({
  ArrowRight: () => <div data-testid="arrow-right" />,
  Loader2: () => <div data-testid="loader" />,
}));

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    header: ({ children, ...props }) => <header {...props}>{children}</header>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

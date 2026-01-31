// Keep existing imports (merge if file already has content)
import "./commands";

// -- Prevent known cross-origin script failure & stub resources early --
Cypress.on("window:before:load", (win) => {
  try {
    (win as any).onloadCallback = () => {};
    (win as any).grecaptcha = {
      render: () => {},
      ready: (cb: () => void) => { try { cb(); } catch (e) {} }
    };
  } catch (e) {}
});

// Only ignore very specific uncaught errors we observed (not all errors)
Cypress.on("uncaught:exception", (err) => {
  const msg = (err && err.message) ? err.message : "";

  if (msg.includes("Script error") ||
      msg.includes("reCAPTCHA couldn't find") ||
      msg.includes("setup is not a function")) {
    return false;
  }
  return undefined;
});
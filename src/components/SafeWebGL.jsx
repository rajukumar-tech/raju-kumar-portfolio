import { Component } from "react";

// True when the browser can create a WebGL context. Some browsers disable
// WebGL (blocked GPU, crashed GPU process, battery saver, old devices), and
// the 3D scenes would otherwise throw and break the page.
let cached;
export function hasWebGL() {
  if (cached !== undefined) return cached;
  try {
    const canvas = document.createElement("canvas");
    cached = !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    cached = false;
  }
  return cached;
}

// Renders `fallback` instead of `children` when WebGL is unavailable or the
// 3D content throws while rendering.
export class SafeWebGL extends Component {
  state = { failed: !hasWebGL() };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.warn("3D content disabled:", error?.message);
  }

  render() {
    return this.state.failed ? this.props.fallback ?? null : this.props.children;
  }
}

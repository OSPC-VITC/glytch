"use client";

import { useEffect, useRef, ReactNode } from "react";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";

interface FuzzyTextProps {
  children: ReactNode;
  color?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FuzzyText = ({ children, color = "#FF0080" }: FuzzyTextProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animationFrameId = 0;
    let isCancelled = false;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const init = async () => {
      const df = document.fonts;
      if (df?.ready) await df.ready;
      if (isCancelled) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const fontSize = "clamp(2rem, 8vw, 8rem)";
      const fontWeight = 900;
      const fontFamily = "sans-serif";

      const temp = document.createElement("span");
      temp.style.fontSize = fontSize;
      document.body.appendChild(temp);
      const numericFontSize = parseFloat(window.getComputedStyle(temp).fontSize);
      document.body.removeChild(temp);

      const text = children?.toString() ?? "";
      const offscreen = document.createElement("canvas");
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;

      offCtx.font = `${fontWeight} ${fontSize} ${fontFamily}`;
      offCtx.textBaseline = "alphabetic";
      const metrics = offCtx.measureText(text);

      const actualLeft = metrics.actualBoundingBoxLeft ?? 0;
      const actualRight = metrics.actualBoundingBoxRight ?? metrics.width;
      const actualAscent = metrics.actualBoundingBoxAscent ?? numericFontSize;
      const actualDescent = metrics.actualBoundingBoxDescent ?? numericFontSize * 0.2;

      const textBoundingWidth = Math.ceil(actualLeft + actualRight);
      const tightHeight = Math.ceil(actualAscent + actualDescent);
      const extraWidthBuffer = 10;
      const offscreenWidth = textBoundingWidth + extraWidthBuffer;

      offscreen.width = offscreenWidth;
      offscreen.height = tightHeight;

      const xOffset = extraWidthBuffer / 2;
      offCtx.font = `${fontWeight} ${fontSize} ${fontFamily}`;
      offCtx.textBaseline = "alphabetic";
      offCtx.fillStyle = color;
      offCtx.fillText(text, xOffset - actualLeft, actualAscent);

      const horizontalMargin = 50;
      const verticalMargin = 0;
      canvas.width = offscreenWidth + horizontalMargin * 2;
      canvas.height = tightHeight + verticalMargin * 2;
      ctx.translate(horizontalMargin, verticalMargin);

      const isHovering = false;
      const fuzzRange = 30;

      const run = () => {
        if (isCancelled) return;
        ctx.clearRect(-fuzzRange, -fuzzRange, offscreenWidth + 2 * fuzzRange, tightHeight + 2 * fuzzRange);
        const intensity = isHovering ? 0.5 : 0.18;
        for (let j = 0; j < tightHeight; j++) {
          const dx = Math.floor(intensity * (Math.random() - 0.5) * fuzzRange);
          ctx.drawImage(offscreen, 0, j, offscreenWidth, 1, dx, j, offscreenWidth, 1);
        }
        animationFrameId = window.requestAnimationFrame(run);
      };

      run();
    };

    init();

    return () => {
      isCancelled = true;
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [children, color]);

  return <canvas ref={canvasRef} style={{ backgroundColor: "transparent" }} />;
};

export function GlytchShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    camera: THREE.Camera;
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    uniforms: {
      time: { type: string; value: number };
      resolution: { type: string; value: THREE.Vector2 };
    };
    animationId: number;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time*0.05;
        float lineWidth = 0.002;

        // Dark crimson background
        vec3 bgColor = vec3(0.08, 0.0, 0.02);
        
        vec3 color = bgColor;
        float intensity = 0.0;
        
        for(int i=0; i < 5; i++){
          intensity += lineWidth*float(i*i) / abs(fract(t + float(i)*0.01)*5.0 - length(uv) + mod(uv.x+uv.y, 0.2));
        }
        
        vec3 hotPink = vec3(1.0, 0.0, 0.5);
        vec3 electricPurple = vec3(0.8, 0.0, 0.8);
        vec3 magenta = vec3(1.0, 0.0, 0.7);
        vec3 deepRed = vec3(0.6, 0.0, 0.2);
        
        float dist = length(uv);
        vec3 baseColor = mix(hotPink, electricPurple, dist * 0.5);
        baseColor = mix(baseColor, magenta, sin(t * 2.0) * 0.3 + 0.3);
        baseColor = mix(baseColor, deepRed, dist * 0.8);
        
        color += baseColor * intensity;
        color += vec3(0.3, 0.0, 0.1) * 0.05 * (1.0 - smoothstep(0.0, 1.5, dist));
        
        gl_FragColor = vec4(color,1.0);
      }
    `;

    const camera = new THREE.Camera();
    camera.position.z = 1;

    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      time: { type: "f", value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2() },
    };

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms as unknown as Record<string, THREE.IUniform>,
      vertexShader,
      fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const onWindowResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      uniforms.resolution.value.x = renderer.domElement.width;
      uniforms.resolution.value.y = renderer.domElement.height;
    };

    onWindowResize();
    window.addEventListener("resize", onWindowResize, false);

    const animate = () => {
      const animationId = requestAnimationFrame(animate);
      uniforms.time.value += 0.05;
      renderer.render(scene, camera);

      if (sceneRef.current) sceneRef.current.animationId = animationId;
    };

    sceneRef.current = {
      camera,
      scene,
      renderer,
      uniforms,
      animationId: 0,
    };

    animate();

    return () => {
      window.removeEventListener("resize", onWindowResize);

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        try { container.removeChild(sceneRef.current.renderer.domElement); } catch {}
        sceneRef.current.renderer.dispose();
        geometry.dispose();
        material.dispose();
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" style={{ background: "#140005", overflow: "hidden" }} />;
}

export default function GlytchDemoOne() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const radius = useTransform(scrollYProgress, [0, 0.5], ["0px", "40px"]);

  return (
    <motion.div
      ref={sectionRef}
      style={{ scale, borderRadius: radius }}
      className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden"
    >
      <GlytchShaderAnimation />
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="glytch-wrapper">
          <div
            className="text-8xl font-extrabold tracking-widest glytch"
            data-text="GLYTCH"
            style={{
              fontFamily: 'glytch, sans-serif',
              color: '#000000',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              textShadow: `
                0 0 20px rgba(255, 0, 100, 0.8),
                0 0 40px rgba(255, 0, 100, 0.5),
                0 0 60px rgba(128, 0, 255, 0.4)
              `
            }}
          >
            GLYTCH
          </div>
        </div>
      </div>
    </motion.div>
  );
}
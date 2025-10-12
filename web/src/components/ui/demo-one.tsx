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
      <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
        <div className="w-full max-w-7xl">
          <div
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-widest sterion text-center"
            data-text="GLYTCH"
            style={{
              fontFamily: 'sterion, sans-serif',
              color: '#000000',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              textShadow: '0 0 20px rgba(255, 0, 100, 0.8), 0 0 40px rgba(255, 0, 100, 0.5), 0 0 60px rgba(128, 0, 255, 0.4)'
            }}
          >
            GLYTCH
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function GlytchCountdown() {
  return (
    <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 pointer-events-auto">
      {/* Location & Date - Glitch Style */}
      <div className="flex items-center justify-center gap-4 sm:gap-8 mb-6 sm:mb-8 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-sm bg-pink-500 animate-pulse shadow-[0_0_10px_rgba(255,0,100,0.8)]" />
          <span className="text-white font-bold tracking-wider uppercase" style={{ textShadow: '0 0 10px rgba(255,0,100,0.5)' }}>
            MG Auditorium
          </span>
        </div>
        <div className="w-px h-4 sm:h-6 bg-gradient-to-b from-transparent via-pink-500 to-transparent" />
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-sm bg-purple-500 animate-pulse shadow-[0_0_10px_rgba(128,0,255,0.8)]" />
          <span className="text-white font-bold tracking-wider uppercase" style={{ textShadow: '0 0 10px rgba(128,0,255,0.5)' }}>
            3 Nov 2025
          </span>
        </div>
      </div>

      {/* Countdown - Glitch Grid */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        {[
          { value: 21, label: 'DAYS' },
          { value: 14, label: 'HOURS' },
          { value: 32, label: 'MINS' },
          { value: 45, label: 'SECS' }
        ].map((item, idx) => (
          <div key={item.label} className="relative group">
            {/* Glitch background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 blur-xl group-hover:blur-2xl transition-all duration-300" />
            
            {/* Main container */}
            <div className="relative bg-black/40 backdrop-blur-sm border border-pink-500/30 rounded-lg p-3 sm:p-4 md:p-6 hover:border-pink-500/60 transition-all duration-300 overflow-hidden group-hover:scale-105" style={{ boxShadow: '0 0 20px rgba(255, 0, 100, 0.1), inset 0 0 20px rgba(255, 0, 100, 0.05)' }}>
              {/* Scan line effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ animation: `scan ${2 + idx * 0.5}s ease-in-out infinite` }} />
              
              {/* Value */}
              <div className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white font-mono mb-1 sm:mb-2" style={{ textShadow: '0 0 10px rgba(255, 0, 100, 0.8), 0 0 20px rgba(255, 0, 100, 0.4), 0 0 30px rgba(128, 0, 255, 0.3)' }}>
                {String(item.value).padStart(2, '0')}
              </div>
              
              {/* Label */}
              <div className="relative text-[0.6rem] sm:text-xs font-bold text-white/80 tracking-widest uppercase" style={{ textShadow: '0 0 5px rgba(255, 0, 100, 0.5)' }}>
                {item.label}
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-pink-500/50" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-purple-500/50" />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scan {
          0%, 100% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
}
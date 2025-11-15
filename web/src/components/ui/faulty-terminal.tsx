"use client";

import { Renderer, Program, Mesh, Color, Triangle, RenderTarget } from "ogl";
import type { OGLRenderingContext } from "ogl";
import React, { useEffect, useRef, useMemo, useCallback } from "react";

type Vec2 = [number, number];
type UniformValue = number | boolean | Color | Float32Array;
type ShaderUniform = { value: UniformValue };

type SpiderVerseUniforms = {
  iTime: ShaderUniform;
  iResolution: ShaderUniform;
  uScale: ShaderUniform;
  uGridMul: ShaderUniform;
  uDigitSize: ShaderUniform;
  uScanlineIntensity: ShaderUniform;
  uGlitchAmount: ShaderUniform;
  uFlickerAmount: ShaderUniform;
  uNoiseAmp: ShaderUniform;
  uChromaticAberration: ShaderUniform;
  uDither: ShaderUniform;
  uCurvature: ShaderUniform;
  uTint: ShaderUniform;
  uMouse: ShaderUniform;
  uMouseStrength: ShaderUniform;
  uUseMouse: ShaderUniform;
  uPageLoadProgress: ShaderUniform;
  uUsePageLoadAnimation: ShaderUniform;
  uBrightness: ShaderUniform;
  uWebIntensity: ShaderUniform;
  uPulseSpeed: ShaderUniform;
  tDiffuse?: ShaderUniform
};

export interface SpiderVerseTerminalProps extends React.HTMLAttributes<HTMLDivElement> {
  scale?: number;
  gridMul?: Vec2;
  digitSize?: number;
  timeScale?: number;
  pause?: boolean;
  scanlineIntensity?: number;
  glitchAmount?: number;
  flickerAmount?: number;
  noiseAmp?: number;
  chromaticAberration?: number;
  dither?: number | boolean;
  curvature?: number;
  mouseReact?: boolean;
  mouseStrength?: number;
  dpr?: number;
  pageLoadAnimation?: boolean;
  brightness?: number;
  webIntensity?: number;
  pulseSpeed?: number;
}

const baseVertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const preFragmentShader = `
precision mediump float;

varying vec2 vUv;

uniform float iTime;
uniform vec3  iResolution;
uniform float uScale;
uniform vec2  uGridMul;
uniform float uDigitSize;
uniform float uScanlineIntensity;
uniform float uGlitchAmount;
uniform float uFlickerAmount;
uniform float uNoiseAmp;
uniform float uChromaticAberration;
uniform float uDither;
uniform float uCurvature;
uniform vec3  uTint;
uniform vec2  uMouse;
uniform float uMouseStrength;
uniform float uUseMouse;
uniform float uPageLoadProgress;
uniform float uUsePageLoadAnimation;
uniform float uBrightness;
uniform float uWebIntensity;
uniform float uPulseSpeed;


float time;

float noise(vec2 p) {
  return sin(p.x * 10.0) * sin(p.y * (3.0 + sin(time * 0.090909))) + 0.2; 
}

mat2 rotate(float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat2(c, -s, s, c);
}

float fbm(vec2 p) {
  p *= 1.1;
  float f = 0.0;
  float amp = 0.5 * uNoiseAmp;
  
  mat2 modify0 = rotate(time * 0.02);
  f += amp * noise(p);
  p = modify0 * p * 2.0;
  amp *= 0.454545;
  
  mat2 modify1 = rotate(time * 0.02);
  f += amp * noise(p);
  p = modify1 * p * 2.0;
  amp *= 0.454545;
  
  mat2 modify2 = rotate(time * 0.08);
  f += amp * noise(p);
  
  return f;
}

float pattern(vec2 p, out vec2 q, out vec2 r) {
  vec2 offset1 = vec2(1.0);
  vec2 offset0 = vec2(0.0);
  mat2 rot01 = rotate(0.1 * time);
  mat2 rot1 = rotate(0.1);
  
  q = vec2(fbm(p + offset1), fbm(rot01 * p + offset1));
  r = vec2(fbm(rot1 * q + offset0), fbm(q + offset0));
  return fbm(p + r);
}


float digit(vec2 p){
    vec2 grid = uGridMul * 15.0;
    vec2 s = floor(p * grid) / grid;
    p = p * grid;
    vec2 q, r;
    float intensity = pattern(s * 0.1, q, r) * 1.3 - 0.03;
    
    if(uUseMouse > 0.5){
        vec2 mouseWorld = uMouse * uScale;
        float distToMouse = distance(s, mouseWorld);
        float mouseInfluence = exp(-distToMouse * 8.0) * uMouseStrength * 10.0;
        intensity += mouseInfluence;
        
        float ripple = sin(distToMouse * 20.0 - iTime * 5.0) * 0.1 * mouseInfluence;
        intensity += ripple;
    }
    
    if(uUsePageLoadAnimation > 0.5){
        float cellRandom = fract(sin(dot(s, vec2(12.9898, 78.233))) * 43758.5453);
        float cellDelay = cellRandom * 0.8;
        float cellProgress = clamp((uPageLoadProgress - cellDelay) / 0.2, 0.0, 1.0);
        
        float fadeAlpha = smoothstep(0.0, 1.0, cellProgress);
        intensity *= fadeAlpha;
    }
    
    p = fract(p);
    p *= uDigitSize;
    
    float px5 = p.x * 5.0;
    float py5 = (1.0 - p.y) * 5.0;
    float x = fract(px5);
    float y = fract(py5);
    
    float i = floor(py5) - 2.0;
    float j = floor(px5) - 2.0;
    float n = i * i + j * j;
    float f = n * 0.0625;
    
    float isOn = step(0.1, intensity - f);
    float brightness = isOn * (0.2 + y * 0.8) * (0.75 + x * 0.25);
    
    return step(0.0, p.x) * step(p.x, 1.0) * step(0.0, p.y) * step(p.y, 1.0) * brightness;
}

vec2 barrel(vec2 uv){
  vec2 c = uv * 2.0 - 1.0;
  float r2 = dot(c, c);
  c *= 1.0 + uCurvature * r2;
  return c * 0.5 + 0.5;
}

void main() {
    time = iTime * 0.333333;
    vec2 uv = vUv;

    if(uCurvature != 0.0){
      uv = barrel(uv);
    }
    
    vec2 p = uv * uScale;
    gl_FragColor = vec4(digit(p), 0.0, 0.0, 1.0);
}
`;

const postFragmentShader = `
precision mediump float;

varying vec2 vUv;
uniform float iTime;
uniform vec3  iResolution;
uniform float uScale;
uniform vec2  uGridMul;
uniform float uDigitSize;
uniform float uScanlineIntensity;
uniform float uGlitchAmount;
uniform float uFlickerAmount;
uniform float uNoiseAmp;
uniform float uChromaticAberration;
uniform float uDither;
uniform float uCurvature;
uniform vec3  uTint;
uniform vec2  uMouse;
uniform float uMouseStrength;
uniform float uUseMouse;
uniform float uPageLoadProgress;
uniform float uUsePageLoadAnimation;
uniform float uBrightness;
uniform float uWebIntensity;
uniform float uPulseSpeed;

uniform sampler2D tDiffuse;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

float hash21(vec2 p){
  p = fract(p * 234.56);
  p += dot(p, p + 34.56);
  return fract(p.x * p.y);
}

vec3 spiderWebOverlay(vec2 p, float t) {
  vec2 center = vec2(0.5);
  vec2 toCenter = p - center;
  float dist = length(toCenter);
  float angle = atan(toCenter.y, toCenter.x);
  
  float spokeCount = 8.0;
  float spokeAngle = mod(angle + PI, TWO_PI / spokeCount);
  float spokes = smoothstep(0.015, 0.0, spokeAngle) + smoothstep(0.015, 0.0, TWO_PI / spokeCount - spokeAngle);
  
  float ringPattern = 0.0;
  for(float i = 1.0; i < 6.0; i += 1.0) {
    float ringDist = i * 0.12;
    float ring = 1.0 - smoothstep(0.0, 0.004, abs(dist - ringDist));
    ringPattern += ring * 0.3;
  }
  
  float pulse = sin(t * uPulseSpeed) * 0.5 + 0.5;
  
  vec3 hotPink = vec3(1.0, 0.0, 0.5);
  vec3 electricPurple = vec3(0.5, 0.0, 0.8);
  vec3 cyan = vec3(0.0, 0.8, 1.0);
  
  vec3 webColor = mix(hotPink, electricPurple, dist);
  webColor = mix(webColor, cyan, pulse * 0.5);
  
  float webPattern = (spokes + ringPattern) * uWebIntensity;
  webPattern *= (1.0 - smoothstep(0.5, 1.0, dist));
  
  return webColor * webPattern;
}

float onOff(float a, float b, float c) {
  return step(c, sin(iTime + a * cos(iTime * b))) * uFlickerAmount;
}

float digit(vec2 uv) {
  return texture2D(tDiffuse, uv).r;
}

float displace(vec2 look) {
    float y = look.y - mod(iTime * 0.25, 1.0);
    float window = 1.0 / (1.0 + 50.0 * y * y);
    return sin(look.y * 20.0 + iTime) * 0.0125 * onOff(4.0, 2.0, 0.8) * (1.0 + cos(iTime * 60.0)) * window;
}

vec3 getColor(vec2 p){
    float bar = step(mod(p.y + iTime * 0.333333 * 20.0, 1.0), 0.2) * 0.4 + 1.0;
    bar *= uScanlineIntensity;
    
    float displacement = displace(p);
    p.x += displacement;

    if (uGlitchAmount != 1.0) {
      float extra = displacement * (uGlitchAmount - 1.0);
      p.x += extra;
    }

    float middle = digit(p);
    
    const float off = 0.002;
    float sum = digit(p + vec2(-off, -off)) + digit(p + vec2(0.0, -off)) + digit(p + vec2(off, -off)) +
                digit(p + vec2(-off, 0.0)) + digit(p + vec2(0.0, 0.0)) + digit(p + vec2(off, 0.0)) +
                digit(p + vec2(-off, off)) + digit(p + vec2(0.0, off)) + digit(p + vec2(off, off));
    
    vec3 baseColor = vec3(0.9) * middle + sum * 0.1 * vec3(1.0) * bar;
    return baseColor;
}

void main(){
  vec2 p = vUv * uScale;

  vec3 color = getColor(p);

  if(uChromaticAberration != 0.0){
    vec2 ca = vec2(uChromaticAberration) / iResolution.xy;
    color.r = getColor(p + ca).r;
    color.b = getColor(p - ca).b;
  }

  color *= uTint;
  
  vec3 webOverlay = spiderWebOverlay(vUv, iTime);
  color += webOverlay;
  
  color *= uBrightness;

  if(uDither > 0.0){
    float rnd = hash21(gl_FragCoord.xy);
    color += (rnd - 0.5) * (uDither * 0.003922);
  }

  gl_FragColor = vec4(color, 1.0);
}
`

const hexToRgb = (hex: string): [number, number, number] => {
  let h = hex.replace('#', '').trim();
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  const num = parseInt(h, 16);
  return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];
};

const DEFAULT_DPR = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;

export default function SpiderVerseTerminal({
  scale = 1,
  gridMul = [2, 1],
  digitSize = 1.5,
  timeScale = 0.3,
  pause = false,
  scanlineIntensity = 0.3,
  glitchAmount = 1,
  flickerAmount = 1,
  noiseAmp = 1,
  chromaticAberration = 2,
  dither = 0.5,
  curvature = 0.1,
  mouseReact = true,
  mouseStrength = 0.2,
  dpr = DEFAULT_DPR,
  pageLoadAnimation = true,
  brightness = 0.9,
  webIntensity = 0.15,
  pulseSpeed = 2.0,
  className,
  style,
  ...rest
}: SpiderVerseTerminalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const programRef = useRef<Program | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });
  const frozenTimeRef = useRef(0);
  const rafRef = useRef<number>(0);
  const loadAnimationStartRef = useRef<number>(0);
  const timeOffsetRef = useRef<number>(Math.random() * 100);

  const tintVec = useMemo(() => hexToRgb('#FF0080'), []);
  const ditherValue = useMemo(() => (typeof dither === 'boolean' ? (dither ? 1 : 0) : dither), [dither]);
  
  const gridMulX = gridMul[0];
  const gridMulY = gridMul[1];
  const gridMulArray = useMemo(() => new Float32Array([gridMulX, gridMulY]), [gridMulX, gridMulY]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const ctn = containerRef.current;
    if (!ctn) return;
    const rect = ctn.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: 1 - (e.clientY - rect.top) / rect.height
    };
  }, []);

  useEffect(() => {
    const ctn = containerRef.current;
    if (!ctn) return;

    let renderer: Renderer | null = null;
    try {
      renderer = new Renderer({ dpr });
    } catch {
      return;
    }
    if (!renderer) return;

    rendererRef.current = renderer;
    const gl: OGLRenderingContext = renderer.gl;
    gl.clearColor(0, 0, 0, 1);

    const geometry = new Triangle(gl);

    const uniforms: SpiderVerseUniforms = {
      iTime: { value: 0 },
      iResolution: { value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height) },
      uScale: { value: scale },
      uGridMul: { value: gridMulArray },
      uDigitSize: { value: digitSize },
      uScanlineIntensity: { value: scanlineIntensity },
      uGlitchAmount: { value: glitchAmount },
      uFlickerAmount: { value: flickerAmount },
      uNoiseAmp: { value: noiseAmp },
      uChromaticAberration: { value: chromaticAberration },
      uDither: { value: ditherValue },
      uCurvature: { value: curvature },
      uTint: { value: new Color(tintVec[0], tintVec[1], tintVec[2]) },
      uMouse: { value: new Float32Array([0.5, 0.5]) },
      uMouseStrength: { value: mouseStrength },
      uUseMouse: { value: mouseReact ? 1 : 0 },
      uPageLoadProgress: { value: pageLoadAnimation ? 0 : 1 },
      uUsePageLoadAnimation: { value: pageLoadAnimation ? 1 : 0 },
      uBrightness: { value: brightness },
      uWebIntensity: { value: webIntensity },
      uPulseSpeed: { value: pulseSpeed },
    };

    const renderTarget = new RenderTarget(gl)

    let preProgram: Program | null = null;
    let postProgram: Program | null = null;
    try {
      preProgram = new Program(gl, { 
        vertex: baseVertexShader, 
        fragment: preFragmentShader, 
        uniforms: 
          uniforms as unknown as Record<string, { value: unknown }> 
      });
      postProgram = new Program(gl, { 
        vertex: baseVertexShader, 
        fragment: postFragmentShader, 
        uniforms: 
          uniforms as unknown as Record<string, { value: unknown }> 
      });

      postProgram.uniforms.tDiffuse = {
        value: renderTarget.texture
      }
    } catch {
      return;
    }
    if (!preProgram || !postProgram) return;

    programRef.current = preProgram;

    const preMesh = new Mesh(gl, { geometry, program: preProgram });
    const postMesh = new Mesh(gl, { geometry, program: postProgram });

    const resize = () => {
      if (!ctn || !renderer) return;
      renderer.setSize(ctn.offsetWidth, ctn.offsetHeight);
      renderTarget.setSize(ctn.offsetWidth, ctn.offsetHeight);
      uniforms.iResolution.value = new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(ctn);
    resize();

    const mouseUniform = uniforms.uMouse.value as Float32Array;
    const smoothMouse = smoothMouseRef.current;
    const mouse = mouseRef.current;

    const update = (t: number) => {
      rafRef.current = requestAnimationFrame(update);
      
      if (pageLoadAnimation && loadAnimationStartRef.current === 0) {
        loadAnimationStartRef.current = t;
      }
      
      if (!pause) {
        const elapsed = (t * 0.001 + timeOffsetRef.current) * timeScale;
        uniforms.iTime.value = elapsed;
        frozenTimeRef.current = elapsed;
      } else {
        uniforms.iTime.value = frozenTimeRef.current;
      }
      
      if (pageLoadAnimation && loadAnimationStartRef.current > 0) {
        const progress = Math.min((t - loadAnimationStartRef.current) * 0.0005, 1);
        uniforms.uPageLoadProgress.value = progress;
      }
      
      if (mouseReact) {
        smoothMouse.x += (mouse.x - smoothMouse.x) * 0.08;
        smoothMouse.y += (mouse.y - smoothMouse.y) * 0.08;
        mouseUniform[0] = smoothMouse.x;
        mouseUniform[1] = smoothMouse.y;
      }
      
      renderer!.render({ scene: preMesh, target: renderTarget });
      renderer!.render({ scene: postMesh });
    };
    
    rafRef.current = requestAnimationFrame(update);
    ctn.appendChild(gl.canvas);

    if (mouseReact) window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      if (mouseReact) window.removeEventListener('mousemove', handleMouseMove);
      if (gl.canvas.parentElement === ctn) ctn.removeChild(gl.canvas);
      const loseExt = gl.getExtension('WEBGL_lose_context') as { loseContext?: () => void } | null;
      loseExt?.loseContext?.();
      loadAnimationStartRef.current = 0;
      timeOffsetRef.current = Math.random() * 100;
    };
  }, [
    dpr,
    pause,
    timeScale,
    scale,
    gridMulArray,
    digitSize,
    scanlineIntensity,
    glitchAmount,
    flickerAmount,
    noiseAmp,
    chromaticAberration,
    ditherValue,
    curvature,
    tintVec,
    mouseReact,
    mouseStrength,
    pageLoadAnimation,
    brightness,
    webIntensity,
    pulseSpeed,
    handleMouseMove
  ]);

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full ${className ?? ""}`} 
      style={style} 
      {...rest} 
    />
  );
}

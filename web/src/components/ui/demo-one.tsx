"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";

interface SceneRef {
  camera: THREE.Camera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  uniforms: {
    time: { type: string; value: number };
    resolution: { type: string; value: THREE.Vector2 };
    mouse: { type: string; value: THREE.Vector2 };
  };
  animationId: number;
}

export function SpiderWebAttack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SceneRef | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `;

    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform vec2 mouse;

      // --- Noise Functions ---
      float hash(float n) { return fract(sin(n) * 43758.5453123); }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float n = i.x + i.y * 57.0;
        
        float a = hash(n);
        float b = hash(n + 1.0);
        float c = hash(n + 57.0);
        float d = hash(n + 58.0);
        
        vec2 u = f * f * (3.0 - 2.0 * f);
        
        return mix(a, b, u.x) + 
               (c - a) * u.y * (1.0 - u.x) + 
               (d - b) * u.x * u.y;
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for(int i = 0; i < 4; i++) {
          value += amplitude * noise(p);
          p *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      // --- 3D Spider Web Effect ---
      vec3 spiderWeb(vec2 uv, float t) {
        float dist = length(uv);
        float angle = atan(uv.y, uv.x);
        
        vec3 colorBrightRed = vec3(1.0, 0.0, 0.1);
        vec3 colorHotPink = vec3(1.0, 0.0, 0.5);
        vec3 colorElectricPurple = vec3(0.5, 0.0, 0.8);
        vec3 colorCyan = vec3(0.0, 0.8, 1.0);
        vec3 colorWhite = vec3(1.0, 1.0, 1.0);

        // 3D depth illusion with parallax
        float depth = sin(dist * 8.0 - t * 2.0) * 0.15 + 0.85;
        vec2 parallaxUV = uv / depth;
        float parallaxDist = length(parallaxUV);
        float parallaxAngle = atan(parallaxUV.y, parallaxUV.x);
        
        // Multiple radial spokes with 3D feel - 8 main spokes
        float spokeCount = 8.0;
        float spokeAngle = mod(parallaxAngle + PI, TWO_PI / spokeCount);
        float radialSpokes = smoothstep(0.025, 0.0, spokeAngle) + smoothstep(0.025, 0.0, TWO_PI / spokeCount - spokeAngle);
        
        // Secondary thinner spokes between main ones
        float secondarySpokes = mod(parallaxAngle + PI + PI / spokeCount, TWO_PI / spokeCount);
        float thinSpokes = (smoothstep(0.015, 0.0, secondarySpokes) + smoothstep(0.015, 0.0, TWO_PI / spokeCount - secondarySpokes)) * 0.6;
        
        // Circular web rings with varying thickness for depth
        float ringPattern = 0.0;
        for(float i = 1.0; i < 9.0; i += 1.0) {
          float ringDist = i * 0.15;
          float ringThickness = 0.008 + i * 0.001; // thicker rings further out
          float ring = 1.0 - smoothstep(0.0, ringThickness, abs(parallaxDist - ringDist));
          
          // Add 3D shading to rings
          float ringShade = 0.7 + 0.3 * sin(parallaxAngle * 4.0 + t + i);
          ringPattern += ring * ringShade;
        }
        
        // Connection points (sticky nodes) where spokes meet rings
        float nodes = 0.0;
        for(float i = 1.0; i < 9.0; i += 1.0) {
          float ringDist = i * 0.15;
          for(float j = 0.0; j < spokeCount; j += 1.0) {
            float nodeAngle = (j * TWO_PI / spokeCount);
            vec2 nodePos = vec2(cos(nodeAngle), sin(nodeAngle)) * ringDist;
            float nodeDist = length(parallaxUV - nodePos);
            nodes += 1.0 - smoothstep(0.0, 0.02, nodeDist);
          }
        }
        
        // Attack pulse hexagon with 3D extrusion
        float pulseTime = sin(t * 1.0) * 0.5 + 0.5;
        float hexDist = max(abs(uv.x + uv.y * 0.5773), abs(uv.x - uv.y * 0.5773));
        float hexSize = 0.35 * (0.8 + pulseTime * 0.4);
        float hexOutline = 1.0 - smoothstep(0.0, 0.045, abs(hexDist - hexSize));
        
        // Inner hex glow for 3D effect
        float hexGlow = (1.0 - smoothstep(hexSize - 0.1, hexSize, hexDist)) * 0.3;
        
        // Combine all web elements
        float webPattern = max(radialSpokes, thinSpokes);
        webPattern = max(webPattern, ringPattern * 0.8);
        webPattern += nodes * 1.5;
        webPattern += hexOutline * 1.2;
        webPattern += hexGlow;
        
        // 3D shading based on angle
        float lighting = 0.6 + 0.4 * sin(parallaxAngle * 2.0 + t * 0.5);
        
        // Color gradients for depth
        vec3 webColor = mix(colorWhite, colorCyan, dist * 0.3);
        webColor = mix(webColor, colorElectricPurple, dist * 0.6);
        webColor = mix(webColor, colorBrightRed, smoothstep(0.5, 1.0, dist));
        webColor = mix(webColor, colorHotPink, hexOutline * pulseTime);
        
        // Apply lighting
        webColor *= lighting;
        
        // Glitch effect on nodes
        float glitch = fbm(uv * 10.0 + t * 1.0) * 0.15;
        webPattern += glitch * nodes * 0.6;

        // Depth-based fade
        float focus = 1.0 - smoothstep(0.8, 1.8, dist);
        return webColor * webPattern * focus * 1.2; 
      }

      // --- SONIC WAVE BACKGROUND ---
      vec3 screenAttack(vec2 uv, float t) {
        vec3 colorBlack = vec3(0.0, 0.0, 0.0);
        vec3 colorDeepRed = vec3(0.2, 0.0, 0.0);
        vec3 colorBrightRed = vec3(0.8, 0.0, 0.1);
        vec3 colorHotPink = vec3(0.7, 0.0, 0.4);
        vec3 colorElectricPurple = vec3(0.4, 0.0, 0.6);
        vec3 colorCyan = vec3(0.0, 0.5, 0.7);
        
        float dist = length(uv);
        float angle = atan(uv.y, uv.x);
        
        // SONIC BOOM WAVES - Multiple expanding rings
        float wave1 = sin(dist * 15.0 - t * 12.0) * 0.5 + 0.5;
        float wave2 = sin(dist * 20.0 - t * 18.0 + PI) * 0.5 + 0.5;
        float wave3 = sin(dist * 10.0 - t * 15.0 + PI * 0.5) * 0.5 + 0.5;
        
        // Sharp wave rings
        float waveRing1 = 1.0 - smoothstep(0.0, 0.03, abs(wave1 - 0.5) - 0.48);
        float waveRing2 = 1.0 - smoothstep(0.0, 0.025, abs(wave2 - 0.5) - 0.48);
        float waveRing3 = 1.0 - smoothstep(0.0, 0.035, abs(wave3 - 0.5) - 0.48);
        
        // SPEED LINES - Radial motion blur
        float speedLines = sin(angle * 40.0 + t * 8.0) * 0.5 + 0.5;
        float speedIntensity = 1.0 - smoothstep(0.0, 0.005, abs(speedLines - 0.5) - 0.495);
        speedIntensity *= smoothstep(0.3, 1.2, dist);
        speedIntensity *= (1.0 - smoothstep(1.0, 2.0, dist));
        
        // TUNNEL EFFECT
        vec2 tunnelUV = uv / dist;
        float tunnel = sin(tunnelUV.x * 50.0 + tunnelUV.y * 50.0 - t * 20.0) * 0.5 + 0.5;
        float tunnelLines = 1.0 - smoothstep(0.0, 0.02, abs(tunnel - 0.5) - 0.48);
        tunnelLines *= smoothstep(0.2, 0.6, dist) * (1.0 - smoothstep(1.2, 2.0, dist));
        
        // CHROMATIC DISTORTION
        float chromaticShift = fbm(uv * 5.0 + t * 3.0) * 0.2;
        
        // TURBULENCE
        float turbulence = fbm(uv * 20.0 - vec2(t * 5.0, 0.0)) * 0.3;
        turbulence += fbm(uv * 15.0 + vec2(0.0, t * 4.0)) * 0.2;
        
        // BASE BACKGROUND - Black with red undertones
        vec3 background = colorBlack;
        background += colorDeepRed * 0.3 * sin(t * 2.0 + dist * 5.0);
        
        // COMPOSE EFFECTS
        vec3 finalColor = background;
        
        // Add wave rings with red and spider-verse colors
        finalColor += colorBrightRed * waveRing1 * 0.2;
        finalColor += colorHotPink * waveRing2 * 0.15;
        finalColor += colorElectricPurple * waveRing3 * 0.15;
        
        // Add speed lines
        finalColor += colorBrightRed * speedIntensity * 0.3;
        finalColor += colorHotPink * speedIntensity * 0.2;
        
        // Add tunnel effect
        finalColor += colorElectricPurple * tunnelLines * 0.35;
        
        // Add turbulence and chromatic effects
        finalColor += vec3(chromaticShift * 0.15, 0.0, chromaticShift * 0.2);
        finalColor += colorBrightRed * turbulence * 0.07;
        
        // MOTION BLUR STREAKS
        float streaks = fbm(vec2(angle * 10.0, dist * 3.0 - t * 25.0)) * 0.4;
        finalColor += colorCyan * streaks * smoothstep(0.4, 1.0, dist) * 0.2;
        
        return finalColor;
      }

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time * 0.3;
        
        vec3 web = spiderWeb(uv, t);
        vec3 attack = screenAttack(uv, t);
        
        vec3 finalColor = attack + web;
        
        finalColor = pow(finalColor, vec3(0.9));

        float len = length(uv);
        float vignette = 1.0 - smoothstep(1.2, 2.5, len);
        vec3 edgeColor = vec3(0.0, 0.0, 0.0);
        finalColor = mix(edgeColor, finalColor, vignette);
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const camera = new THREE.Camera();
    camera.position.z = 1;

    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      time: { type: "f", value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2() },
      mouse: { type: "v2", value: new THREE.Vector2() },
    };

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms as unknown as Record<string, THREE.IUniform>,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    const onWindowResize = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      renderer.setSize(clientWidth, clientHeight);
      uniforms.resolution.value.set(renderer.domElement.width, renderer.domElement.height);
    };

    const onMouseMove = (event: MouseEvent) => {
      uniforms.mouse.value.set(
        event.clientX / window.innerWidth,
        1.0 - event.clientY / window.innerHeight
      );
    };

    onWindowResize();
    window.addEventListener("resize", onWindowResize, false);
    window.addEventListener("mousemove", onMouseMove, false);

    const animate = () => {
      if (!sceneRef.current) return;
      sceneRef.current.animationId = requestAnimationFrame(animate);
      uniforms.time.value += 0.02;
      renderer.render(scene, camera);
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
      window.removeEventListener("mousemove", onMouseMove);

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        sceneRef.current.renderer.dispose();
        geometry.dispose();
        material.dispose();
        
        if (container?.contains(sceneRef.current.renderer.domElement)) {
          container.removeChild(sceneRef.current.renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ background: "#000000", overflow: "hidden" }}
    />
  );
}

export default function DemoTwo() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const radius = useTransform(scrollYProgress, [0, 0.5], ["0px", "40px"]);

  return (
    <motion.div
      ref={sectionRef}
      style={{ scale, borderRadius: radius }}
      className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden"
    >
      <SpiderWebAttack />
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <motion.div
          className="text-8xl font-extrabold text-black tracking-widest"
          animate={{
            textShadow: [
              "0 0 20px rgba(255,0,128,0.9), 0 0 40px rgba(255,0,128,0.7), 0 0 80px rgba(255,0,128,0.5)",
              "0 0 30px rgba(255,0,0,0.9), 0 0 60px rgba(255,0,0,0.7), 0 0 100px rgba(255,0,0,0.5)",
              "0 0 20px rgba(128,0,255,0.9), 0 0 40px rgba(128,0,255,0.7), 0 0 80px rgba(128,0,255,0.5)",
              "0 0 20px rgba(255,0,128,0.9), 0 0 40px rgba(255,0,128,0.7), 0 0 80px rgba(255,0,128,0.5)",
            ],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 2.0,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
         
        </motion.div>
      </div>
    </motion.div>
  );
}
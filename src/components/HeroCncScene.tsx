import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Layers, RotateCcw, ScanLine, Box } from 'lucide-react';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

// Pre-allocated math helpers outside render loop (Zero-GC discipline)
const _vec3 = new THREE.Vector3();
const _targetCamPos = new THREE.Vector3(4.2, 3.2, 4.6);

export default function HeroCncScene() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotionPreference();

  const [exploded, setExploded] = useState(false);
  const [wireframeCad, setWireframeCad] = useState(true);
  const [scanActive, setScanActive] = useState(true);
  const [webglFailed, setWebglFailed] = useState(false);

  const stateRef = useRef({
    exploded: false,
    wireframeCad: true,
    scanActive: true,
    resetRequested: false,
  });

  useEffect(() => {
    stateRef.current.exploded = exploded;
  }, [exploded]);

  useEffect(() => {
    stateRef.current.wireframeCad = wireframeCad;
  }, [wireframeCad]);

  useEffect(() => {
    stateRef.current.scanActive = scanActive;
  }, [scanActive]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = (() => {
      try {
        const probe = document.createElement('canvas').getContext('webgl2');
        if (!probe) return true;
        const ext = probe.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : probe.RENDERER;
        const gpu = String(probe.getParameter(param));
        probe.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: false,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglFailed(true);
      return;
    }

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 480;

    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // Cool deep oceanic cobalt-slate backdrop (zero black)
    renderer.setClearColor(0x0f2547, 1);

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      setWebglFailed(true);
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f2547);
    scene.fog = new THREE.FogExp2(0x0f2547, 0.038);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.copy(_targetCamPos);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.minDistance = 3.2;
    controls.maxDistance = 8.5;
    controls.minPolarAngle = 0.35;
    controls.maxPolarAngle = Math.PI / 2 - 0.06;
    controls.target.set(0, 0.45, 0);

    // 3-Point Cool Aerospace Lighting
    const hemiLight = new THREE.HemisphereLight(0xcbe8ff, 0x1a365d, 0.85);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff8ed, 2.1);
    keyLight.position.set(4.5, 6.5, 4.0);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.camera.near = 1;
      keyLight.shadow.camera.far = 18;
      keyLight.shadow.camera.left = -3.5;
      keyLight.shadow.camera.right = 3.5;
      keyLight.shadow.camera.top = 3.5;
      keyLight.shadow.camera.bottom = -3.5;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.2);
    rimLight.position.set(-4.5, 3.0, -3.5);
    scene.add(rimLight);

    const cyanFill = new THREE.PointLight(0x06b6d4, 1.5, 9, 2);
    cyanFill.position.set(2.0, 1.4, -2.5);
    scene.add(cyanFill);

    const disposables: Array<{ dispose: () => void }> = [envTexture];

    const castIronMat = new THREE.MeshStandardMaterial({
      color: 0x1d3557,
      metalness: 0.45,
      roughness: 0.72,
    });
    const anodizedSlateMat = new THREE.MeshStandardMaterial({
      color: 0x2b4b75,
      metalness: 0.65,
      roughness: 0.44,
    });
    const brushedTitaniumMat = new THREE.MeshPhysicalMaterial({
      color: 0xdce6f2,
      metalness: 0.94,
      roughness: 0.16,
      anisotropy: 0.8,
      clearcoat: 0.25,
      clearcoatRoughness: 0.18,
    });
    const steelChuckMat = new THREE.MeshPhysicalMaterial({
      color: 0x94a3b8,
      metalness: 0.9,
      roughness: 0.25,
    });
    const tialnCarbideMat = new THREE.MeshPhysicalMaterial({
      color: 0xe3b34c,
      metalness: 0.92,
      roughness: 0.16,
      clearcoat: 0.4,
    });
    const electricBlueMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.9,
      metalness: 0.3,
      roughness: 0.32,
    });
    const cadWireMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.48,
    });
    const gridHelperMat = new THREE.LineBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.26,
    });

    disposables.push(
      castIronMat,
      anodizedSlateMat,
      brushedTitaniumMat,
      steelChuckMat,
      tialnCarbideMat,
      electricBlueMat,
      cadWireMat,
      gridHelperMat
    );

    const floorGrid = new THREE.GridHelper(10, 20, 0x38bdf8, 0x1e3a66);
    floorGrid.position.y = -0.82;
    (floorGrid.material as THREE.Material).transparent = true;
    (floorGrid.material as THREE.Material).opacity = 0.45;
    scene.add(floorGrid);

    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(128, 128, 12, 128, 128, 124);
      grad.addColorStop(0, 'rgba(7, 20, 44, 0.72)');
      grad.addColorStop(0.55, 'rgba(15, 37, 71, 0.35)');
      grad.addColorStop(1, 'rgba(15, 37, 71, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowPlaneGeo = new THREE.PlaneGeometry(4.6, 4.6);
    const shadowPlaneMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.8;
    scene.add(shadowPlane);
    disposables.push(shadowTex, shadowPlaneGeo, shadowPlaneMat);

    const cncAssembly = new THREE.Group();
    scene.add(cncAssembly);

    // 1. Rotary Table & Fixture Sub-Assembly
    const tableGroup = new THREE.Group();
    tableGroup.position.y = -0.58;
    cncAssembly.add(tableGroup);

    const basePlateGeo = new THREE.CylinderGeometry(1.55, 1.65, 0.24, 48);
    const basePlate = new THREE.Mesh(basePlateGeo, castIronMat);
    basePlate.receiveShadow = true;
    basePlate.castShadow = true;
    tableGroup.add(basePlate);

    const rotaryRingGeo = new THREE.CylinderGeometry(1.22, 1.28, 0.16, 48);
    const rotaryRing = new THREE.Mesh(rotaryRingGeo, anodizedSlateMat);
    rotaryRing.position.y = 0.2;
    rotaryRing.castShadow = true;
    rotaryRing.receiveShadow = true;
    tableGroup.add(rotaryRing);

    const accentBandGeo = new THREE.TorusGeometry(1.25, 0.018, 12, 64);
    const accentBand = new THREE.Mesh(accentBandGeo, electricBlueMat);
    accentBand.rotation.x = Math.PI / 2;
    accentBand.position.y = 0.27;
    tableGroup.add(accentBand);

    const jawGeo = new THREE.BoxGeometry(0.32, 0.22, 0.42);
    for (let i = 0; i < 3; i++) {
      const angle = (i * Math.PI * 2) / 3;
      const jaw = new THREE.Mesh(jawGeo, steelChuckMat);
      jaw.position.set(Math.cos(angle) * 0.94, 0.36, Math.sin(angle) * 0.94);
      jaw.rotation.y = -angle + Math.PI / 2;
      jaw.castShadow = true;
      tableGroup.add(jaw);
    }

    const boltGeo = new THREE.CylinderGeometry(0.036, 0.036, 0.07, 12);
    const boltCount = 24;
    const boltsInstanced = new THREE.InstancedMesh(boltGeo, steelChuckMat, boltCount);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < boltCount; i++) {
      const a = (i / boltCount) * Math.PI * 2;
      dummy.position.set(Math.cos(a) * 1.4, 0.14, Math.sin(a) * 1.4);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      boltsInstanced.setMatrixAt(i, dummy.matrix);
    }
    boltsInstanced.computeBoundingSphere();
    tableGroup.add(boltsInstanced);
    disposables.push(basePlateGeo, rotaryRingGeo, accentBandGeo, jawGeo, boltGeo);

    // 2. Precision Machined Component
    const workpieceGroup = new THREE.Group();
    workpieceGroup.position.y = -0.22;
    cncAssembly.add(workpieceGroup);

    const lathePoints = [
      new THREE.Vector2(0.0, 0.0),
      new THREE.Vector2(0.86, 0.0),
      new THREE.Vector2(0.86, 0.16),
      new THREE.Vector2(0.72, 0.2),
      new THREE.Vector2(0.72, 0.38),
      new THREE.Vector2(0.5, 0.44),
      new THREE.Vector2(0.46, 0.72),
      new THREE.Vector2(0.32, 0.8),
      new THREE.Vector2(0.24, 0.8),
      new THREE.Vector2(0.24, 0.26),
      new THREE.Vector2(0.0, 0.26),
    ];
    const hubGeo = new THREE.LatheGeometry(lathePoints, 48);
    const hubMesh = new THREE.Mesh(hubGeo, brushedTitaniumMat);
    hubMesh.castShadow = true;
    hubMesh.receiveShadow = true;
    workpieceGroup.add(hubMesh);

    const bladeShape = new THREE.Shape();
    bladeShape.moveTo(0, 0);
    bladeShape.lineTo(0.34, 0.04);
    bladeShape.lineTo(0.28, 0.34);
    bladeShape.lineTo(0.02, 0.42);
    bladeShape.closePath();

    const bladeGeo = new THREE.ExtrudeGeometry(bladeShape, {
      depth: 0.045,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.01,
      bevelSegments: 2,
    });
    bladeGeo.translate(0, 0, -0.0225);

    const bladeCount = 14;
    const bladesInstanced = new THREE.InstancedMesh(bladeGeo, brushedTitaniumMat, bladeCount);
    for (let i = 0; i < bladeCount; i++) {
      const a = (i / bladeCount) * Math.PI * 2;
      dummy.position.set(Math.cos(a) * 0.44, 0.32, Math.sin(a) * 0.44);
      dummy.rotation.set(0.18, -a, 0.14);
      dummy.updateMatrix();
      bladesInstanced.setMatrixAt(i, dummy.matrix);
    }
    bladesInstanced.castShadow = true;
    bladesInstanced.computeBoundingSphere();
    workpieceGroup.add(bladesInstanced);

    const cadEdgesGeo = new THREE.EdgesGeometry(hubGeo, 18);
    const cadWireframeMesh = new THREE.LineSegments(cadEdgesGeo, cadWireMat);
    workpieceGroup.add(cadWireframeMesh);
    disposables.push(hubGeo, bladeGeo, cadEdgesGeo);

    // 3. Overhead Spindle & Carbide End-Mill
    const spindleGroup = new THREE.Group();
    spindleGroup.position.set(0.45, 1.35, 0);
    cncAssembly.add(spindleGroup);

    const spindleHousingGeo = new THREE.CylinderGeometry(0.44, 0.48, 0.65, 32);
    const spindleHousing = new THREE.Mesh(spindleHousingGeo, anodizedSlateMat);
    spindleHousing.position.y = 0.55;
    spindleHousing.castShadow = true;
    spindleGroup.add(spindleHousing);

    const spindleCollarGeo = new THREE.CylinderGeometry(0.32, 0.38, 0.16, 32);
    const spindleCollar = new THREE.Mesh(spindleCollarGeo, steelChuckMat);
    spindleCollar.position.y = 0.16;
    spindleCollar.castShadow = true;
    spindleGroup.add(spindleCollar);

    const toolHolderGeo = new THREE.CylinderGeometry(0.22, 0.16, 0.26, 24);
    const toolHolder = new THREE.Mesh(toolHolderGeo, steelChuckMat);
    toolHolder.position.y = -0.05;
    toolHolder.castShadow = true;
    spindleGroup.add(toolHolder);

    const cutterGroup = new THREE.Group();
    cutterGroup.position.y = -0.36;
    spindleGroup.add(cutterGroup);

    const cutterShaftGeo = new THREE.CylinderGeometry(0.085, 0.085, 0.42, 20);
    const cutterShaft = new THREE.Mesh(cutterShaftGeo, tialnCarbideMat);
    cutterShaft.castShadow = true;
    cutterGroup.add(cutterShaft);

    const flutePointsA: THREE.Vector3[] = [];
    const flutePointsB: THREE.Vector3[] = [];
    for (let i = 0; i <= 18; i++) {
      const t = i / 18;
      const yy = -0.2 + t * 0.3;
      const angA = t * Math.PI * 2.4;
      const angB = angA + Math.PI;
      flutePointsA.push(new THREE.Vector3(Math.cos(angA) * 0.086, yy, Math.sin(angA) * 0.086));
      flutePointsB.push(new THREE.Vector3(Math.cos(angB) * 0.086, yy, Math.sin(angB) * 0.086));
    }
    const fluteGeoA = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(flutePointsA),
      20,
      0.015,
      6,
      false
    );
    const fluteGeoB = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(flutePointsB),
      20,
      0.015,
      6,
      false
    );
    cutterGroup.add(new THREE.Mesh(fluteGeoA, brushedTitaniumMat));
    cutterGroup.add(new THREE.Mesh(fluteGeoB, brushedTitaniumMat));

    const spindleRingGeo = new THREE.TorusGeometry(0.49, 0.012, 8, 48);
    const spindleRing = new THREE.Mesh(spindleRingGeo, electricBlueMat);
    spindleRing.rotation.x = Math.PI / 2;
    spindleRing.position.y = 0.24;
    spindleGroup.add(spindleRing);

    disposables.push(
      spindleHousingGeo,
      spindleCollarGeo,
      toolHolderGeo,
      cutterShaftGeo,
      fluteGeoA,
      fluteGeoB,
      spindleRingGeo
    );

    const scanRingGeo = new THREE.RingGeometry(0.95, 1.03, 64);
    const scanRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.78,
    });
    const scanRing = new THREE.Mesh(scanRingGeo, scanRingMat);
    scanRing.rotation.x = Math.PI / 2;
    scanRing.position.y = 0.2;
    cncAssembly.add(scanRing);
    disposables.push(scanRingGeo, scanRingMat);

    const frameGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(3.4, 2.5, 3.4));
    const frameLines = new THREE.LineSegments(frameGeo, gridHelperMat);
    frameLines.position.y = 0.45;
    cncAssembly.add(frameLines);
    disposables.push(frameGeo);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const onControlsStart = () => {
      stateRef.current.resetRequested = false;
    };
    controls.addEventListener('start', onControlsStart);

    let frameId = 0;
    let disposed = false;
    let lastTime = performance.now();
    let elapsed = 0;

    let currentExplode = 0;
    let currentSpindleX = 0.45;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) return;
        const status = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (status === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick(now: number) {
      if (disposed) return;
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      if (!reducedMotion) {
        elapsed += dt;
        workpieceGroup.rotation.y += dt * 0.42;
        cutterGroup.rotation.y -= dt * 8.0;

        const targetX = stateRef.current.exploded ? 0 : Math.sin(elapsed * 0.75) * 0.32;
        currentSpindleX = THREE.MathUtils.damp(currentSpindleX, targetX, 5, dt);
        spindleGroup.position.x = currentSpindleX;
        spindleGroup.position.z = stateRef.current.exploded ? 0 : Math.cos(elapsed * 0.75) * 0.22;

        scanRing.visible = stateRef.current.scanActive;
        if (stateRef.current.scanActive) {
          const sweep = (Math.sin(elapsed * 1.8) + 1) * 0.5;
          scanRing.position.y = -0.2 + sweep * 0.92;
          scanRingMat.opacity = 0.4 + Math.sin(elapsed * 4) * 0.15;
        }
      } else {
        scanRing.visible = stateRef.current.scanActive;
      }

      const targetExplode = stateRef.current.exploded ? 1 : 0;
      currentExplode = THREE.MathUtils.damp(currentExplode, targetExplode, 6, dt);
      tableGroup.position.y = -0.58 - currentExplode * 0.25;
      workpieceGroup.position.y = -0.22 + currentExplode * 0.18;
      spindleGroup.position.y = 1.35 + currentExplode * 0.58;

      cadWireframeMesh.visible = stateRef.current.wireframeCad;
      frameLines.visible = stateRef.current.wireframeCad;

      if (stateRef.current.resetRequested) {
        camera.position.lerp(_targetCamPos, 1 - Math.exp(-5 * dt));
        _vec3.set(0, 0.45, 0);
        controls.target.lerp(_vec3, 1 - Math.exp(-5 * dt));
        if (camera.position.distanceTo(_targetCamPos) < 0.03) {
          stateRef.current.resetRequested = false;
        }
      }

      controls.update();
      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(() => tick(performance.now()));
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    frameId = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      resizeObserver.disconnect();
      controls.removeEventListener('start', onControlsStart);
      controls.dispose();
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    };
  }, [reducedMotion]);

  return (
    <div className="relative flex h-full min-h-[420px] lg:min-h-[540px] w-full flex-col overflow-hidden rounded-2xl border border-[#B8CBE3] bg-[#0F2547] shadow-[0_18px_45px_rgba(15,37,71,0.18)]">
      {/* Top Left Minimal Engineering Viewport Label */}
      <div className="pointer-events-none absolute top-4 left-4 z-10 flex flex-col gap-0.5">
        <span className="font-mono text-[11px] font-medium tracking-wider text-[#38BDF8]">
          5-AXIS CNC MILLING SIMULATION
        </span>
        <span className="font-mono text-[11px] text-[#CBD5E1]">
          Drag to orbit · Scroll to zoom
        </span>
      </div>

      {/* Top Right Live Axis Readout */}
      <div className="pointer-events-none absolute top-4 right-4 z-10 hidden sm:flex flex-col items-end font-mono text-[11px] text-[#CBD5E1] tabular-nums">
        <span>DATUM: G54 · Ti-6Al-4V</span>
        <span className="text-[#38BDF8]">CARBIDE TiAlN END MILL</span>
      </div>

      {/* Three.js Isolated Canvas Mount */}
      {!webglFailed ? (
        <div ref={mountRef} className="h-full w-full flex-1 cursor-grab active:cursor-grabbing" />
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
          <img
            src="/src/assets/images/project_cnc_optimization_1794839105381.jpg"
            alt="5-Axis CNC Machining Center"
            referrerPolicy="no-referrer"
            className="h-64 w-full max-w-md rounded-xl object-cover border border-[#38BDF8]/30"
          />
          <p className="mt-4 font-mono text-xs text-[#CBD5E1]">
            5-Axis CNC Machining Visualization
          </p>
        </div>
      )}

      {/* Compact Bottom Viewport Dock (Solid dark-blue rgba — no backdrop-blur over WebGL) */}
      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-xl border border-[#2E5288] bg-[#0F2547]/95 px-2.5 py-1.5">
        <button
          type="button"
          onClick={() => setExploded((v) => !v)}
          className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
            exploded
              ? 'bg-[#1463FF] text-white'
              : 'text-[#CBD5E1] hover:bg-[#1A3866] hover:text-white'
          }`}
        >
          <Layers className="h-3.5 w-3.5" />
          <span>{exploded ? 'Assemble' : 'Explode'}</span>
        </button>

        <button
          type="button"
          onClick={() => setWireframeCad((v) => !v)}
          className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
            wireframeCad
              ? 'bg-[#1463FF]/30 text-[#38BDF8] border border-[#38BDF8]/50'
              : 'text-[#CBD5E1] hover:bg-[#1A3866] hover:text-white'
          }`}
        >
          <Box className="h-3.5 w-3.5" />
          <span>CAD Mesh</span>
        </button>

        <button
          type="button"
          onClick={() => setScanActive((v) => !v)}
          className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
            scanActive
              ? 'bg-[#1463FF]/30 text-[#38BDF8] border border-[#38BDF8]/50'
              : 'text-[#CBD5E1] hover:bg-[#1A3866] hover:text-white'
          }`}
        >
          <ScanLine className="h-3.5 w-3.5" />
          <span>Scan</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setExploded(false);
            stateRef.current.resetRequested = true;
          }}
          aria-label="Reset 3D camera view"
          className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#CBD5E1] transition-colors hover:bg-[#1A3866] hover:text-white whitespace-nowrap shrink-0"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>
    </div>
  );
}

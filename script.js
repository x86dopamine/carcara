/* Site estático. GSAP é carregado da própria pasta. */
(() => {
  'use strict';
  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.navigation');
  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    menu.classList.toggle('is-open', open);
  };
  toggle.addEventListener('click', () =>
    setMenu(toggle.getAttribute('aria-expanded') !== 'true'),
  );
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', (event) => {
    if (
      event.key === 'Escape' &&
      toggle.getAttribute('aria-expanded') === 'true'
    ) {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.header')) setMenu(false);
  });

  const hero = document.querySelector('.hero');
  const header = document.querySelector('.header');
  const racer = header.querySelector('.header-racer');
  const headerItems = Array.from(header.querySelectorAll('.brand, .navigation a, .header-social, .menu-toggle'));
  function timeHeaderReveal() {
    const carWidth = racer.offsetWidth;
    const settings = getComputedStyle(header);
    const duration = parseFloat(settings.getPropertyValue('--drive-duration'));
    const startDelay = parseFloat(settings.getPropertyValue('--drive-delay'));
    const start = -1.15 * carWidth;
    const distance = window.innerWidth + 110 - start;
    const positions = headerItems.map(item => {
      const rect = item.getBoundingClientRect();
      return rect.left + rect.width / 2;
    });
    headerItems.forEach((item, index) => {
      const progress = Math.min(1, Math.max(0, (positions[index] - start) / distance));
      item.style.setProperty('--item-delay', `${(startDelay + progress * duration).toFixed(3)}s`);
    });
  }
  let headerShown = false;
  let headerHeight = 0;
  let headerVisibility;
  header.inert = true;
  header.setAttribute('aria-hidden', 'true');
  racer.addEventListener('animationend', (event) => {
    if (event.target === racer && event.animationName === 'carcara-drive') {
      header.classList.add('race-finished');
    }
  });
  function setHeaderVisible(visible) {
    if (visible === headerShown) return;
    headerShown = visible;
    header.classList.remove('race-finished');
    if (visible) timeHeaderReveal();
    if (!visible) {
      setMenu(false);
      if (header.contains(document.activeElement)) {
        hero.querySelector('.hero-cta').focus({preventScroll: true});
      }
    }
    header.inert = !visible;
    header.setAttribute('aria-hidden', String(!visible));
    header.classList.toggle('is-visible', visible);
  }
  function observeHeaderBoundary() {
    const height = header.offsetHeight;
    if (height === headerHeight) return;
    headerHeight = height;
    if (headerVisibility) headerVisibility.disconnect();
    setHeaderVisible(hero.getBoundingClientRect().bottom <= height + 1);
    if ('IntersectionObserver' in window) {
      headerVisibility = new IntersectionObserver(([entry]) => {
        setHeaderVisible(entry.boundingClientRect.bottom <= headerHeight + 1);
      }, {rootMargin: `-${height + 1}px 0px 0px 0px`, threshold: 0});
      headerVisibility.observe(hero);
    }
  }
  observeHeaderBoundary();
  if ('ResizeObserver' in window) {
    new ResizeObserver(observeHeaderBoundary).observe(header);
  } else {
    window.addEventListener('resize', observeHeaderBoundary, {passive: true});
  }
  window.addEventListener('pageshow', () => {
    setHeaderVisible(hero.getBoundingClientRect().bottom <= headerHeight + 1);
  });
  if (!('IntersectionObserver' in window)) {
    let scrollQueued = false;
    window.addEventListener('scroll', () => {
      if (scrollQueued) return;
      scrollQueued = true;
      requestAnimationFrame(() => {
        setHeaderVisible(hero.getBoundingClientRect().bottom <= headerHeight + 1);
        scrollQueued = false;
      });
    }, {passive: true});
  }
  const hasGSAP = Boolean(window.gsap);
  let openingAnimation;
  let onScreen = true;
  if (hasGSAP) {
    root.classList.add('gsap-ready');
    if (!reduced.matches && window.scrollY < hero.offsetHeight) {
      openingAnimation = gsap.timeline({defaults: {ease: 'power3.out'}})
        .from('.hero-top', {opacity: 0, y: 8, duration: 0.8}, 0.1)
        .from('.title-roll', {opacity: 0, y: 18, duration: 1}, 0.2)
        .from('.hero-cta', {opacity: 0, y: 14, stagger: 0.12, duration: 0.85}, 0.8);
    }
  }
  function syncVisibility() {
    const inactive = !onScreen || document.hidden;
    hero.classList.toggle('is-inactive', inactive);
    if (openingAnimation && openingAnimation.progress() < 1) {
      openingAnimation.paused(inactive);
    }
  }
  document.addEventListener('visibilitychange', syncVisibility);
  syncVisibility();

  // The emblem is static; content animates only once on entry.
  if ('IntersectionObserver' in window) {
    root.classList.add('js-motion');
    const reveal = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target;
        element.classList.add('is-visible');
        if (hasGSAP && !reduced.matches) {
          gsap.fromTo(element, {opacity: 0, y: 28}, {
            opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            clearProps: 'opacity,transform',
          });
        }
        reveal.unobserve(element);
      });
    }, {rootMargin: '0px 0px 32px 0px', threshold: 0});
    document.querySelectorAll('.reveal').forEach((element) => {
      if (!element.parentElement.closest('.reveal')) reveal.observe(element);
      else element.classList.add('is-visible');
    });
    const stageVisibility = new IntersectionObserver((entries) => {
      onScreen = entries[0].isIntersecting;
      syncVisibility();
    });
    stageVisibility.observe(hero);
    const navLinks = Array.from(menu.querySelectorAll('a'));
    const sections = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.setAttribute('aria-current', 'location');
          } else link.removeAttribute('aria-current');
        });
      });
    }, {rootMargin: '-15% 0px -60% 0px'});
    document.querySelectorAll('main > section').forEach((section) => sections.observe(section));
  }

  function tabGroup(selector, onSelect) {
    const buttons = Array.from(
      document.querySelectorAll(selector + ' [role="tab"]'),
    );
    function select(button) {
      buttons.forEach((item) => {
        const active = item === button;
        item.setAttribute('aria-selected', String(active));
        item.tabIndex = active ? 0 : -1;
      });
      onSelect(button);
    }
    buttons.forEach((button, index) => {
      button.addEventListener('click', () => select(button));
      button.addEventListener('keydown', (event) => {
        let next;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown')
          next = (index + 1) % buttons.length;
        else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp')
          next = (index + buttons.length - 1) % buttons.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = buttons.length - 1;
        else return;
        event.preventDefault();
        buttons[next].focus();
        select(buttons[next]);
      });
    });
  }
  function animatePanel(panel) {
    if (reduced.matches || !panel.animate) return;
    panel.animate(
      [
        { opacity: 0.35, transform: 'translateY(7px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      { duration: 280, easing: 'ease-out' },
    );
  }
  const process = [
    {
      word: 'PERGUNTA',
      eyebrow: 'PRIMEIRO, A GENTE ENTENDE O DESAFIO.',
      title: 'TUDO COMEÇA COM UMA PERGUNTA.',
      text: 'Na STEM Racing, a equipe divide o trabalho entre engenharia, projeto do carro, comunicação, parcerias e apresentação. Tudo começa por entender o desafio da temporada.',
    },
    {
      word: 'IDEIA',
      eyebrow: 'A EQUIPE PESQUISA E ESCOLHE UM CAMINHO.',
      title: 'E se a gente\ntentasse diferente?',
      text: 'A gente pesquisa, troca ideias e escolhe o que faz sentido para o carro e para a temporada. Depois, começa a desenhar.',
    },
    {
      word: 'FORMA',
      eyebrow: 'DESENHO, AERODINÂMICA E REVISÃO.',
      title: 'Pensar cada detalhe.\nConectar cada escolha.',
      text: 'A gente desenha o carro, compara versões e ajusta a aerodinâmica antes de decidir o que vai para a fabricação.',
    },
    {
      word: 'AÇÃO',
      eyebrow: 'HORA DE FABRICAR E MONTAR.',
      title: 'Fazer é outra\nforma de aprender.',
      text: 'Com o desenho definido, chega a hora de fabricar, montar e revisar o carro. Cada pessoa cuida da sua etapa e acompanha o resultado.',
    },
    {
      word: 'CORRIDA',
      eyebrow: 'NA PISTA, A GENTE CONFERE O PROJETO.',
      title: 'Testar. Observar.\nTentar de novo.',
      text: 'A gente olha os tempos, confere o que funcionou e volta ao projeto para ajustar o que ainda pode melhorar. Testar também faz parte de construir o carro.',
    },
  ];
  const assemblyCounts = [0, 1, 3, 6, 8];
  const assemblyStartOffsets = [
    [0, 0, 0],
    [0, 0, -0.46],
    [0, 0, 0.5],
    [-0.08, 0, 0.46],
    [0.08, 0, 0.46],
    [0, 0, -0.38],
    [0, 0, 0.3],
    [0, 0, 0.5],
  ];
  const assemblyCanvas = document.getElementById('assembly-canvas');
  const assemblyVisual = document.querySelector('.process-visual');
  let assemblyRenderer = null;
  let activeProcessStage = 0;

  function setProcessAssemblyStage(index) {
    activeProcessStage = index;
    assemblyVisual.classList.toggle('is-intro', index === 0);
    if (assemblyRenderer) assemblyRenderer.setCount(assemblyCounts[index]);
  }

  function multiplyMatrices(a, b) {
    const out = new Float32Array(16);
    for (let column = 0; column < 4; column += 1) {
      for (let row = 0; row < 4; row += 1) {
        out[column * 4 + row] =
          a[row] * b[column * 4] +
          a[4 + row] * b[column * 4 + 1] +
          a[8 + row] * b[column * 4 + 2] +
          a[12 + row] * b[column * 4 + 3];
      }
    }
    return out;
  }

  function perspectiveMatrix(fov, aspect, near, far) {
    const out = new Float32Array(16);
    const f = 1 / Math.tan(fov / 2);
    out[0] = f / aspect;
    out[5] = f;
    out[10] = (far + near) / (near - far);
    out[11] = -1;
    out[14] = (2 * far * near) / (near - far);
    return out;
  }

  function lookAtMatrix(eye, center, up) {
    const normalize = (vector) => {
      const length = Math.hypot(...vector) || 1;
      return vector.map((value) => value / length);
    };
    const cross = (a, b) => [
      a[1] * b[2] - a[2] * b[1],
      a[2] * b[0] - a[0] * b[2],
      a[0] * b[1] - a[1] * b[0],
    ];
    const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    const z = normalize(eye.map((value, i) => value - center[i]));
    const x = normalize(cross(up, z));
    const y = cross(z, x);
    return new Float32Array([
      x[0], y[0], z[0], 0,
      x[1], y[1], z[1], 0,
      x[2], y[2], z[2], 0,
      -dot(x, eye), -dot(y, eye), -dot(z, eye), 1,
    ]);
  }

  async function createAssemblyRenderer(canvas) {
    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    if (!gl) throw new Error('WebGL is unavailable.');

    const modelData = window.CARCARA_LUX_MODEL_DATA;
    if (typeof modelData !== 'string') throw new Error('The embedded car model data is missing.');
    const decodedModel = window.atob(modelData);
    const modelBytes = new Uint8Array(decodedModel.length);
    for (let i = 0; i < decodedModel.length; i += 1) {
      modelBytes[i] = decodedModel.charCodeAt(i);
    }
    const file = modelBytes.buffer;
    const header = new DataView(file);
    if (header.getUint32(0, true) !== 0x46546c67) throw new Error('Invalid GLB header.');
    const jsonLength = header.getUint32(12, true);
    const documentData = JSON.parse(
      new TextDecoder().decode(new Uint8Array(file, 20, jsonLength)),
    );
    const binaryHeader = 20 + jsonLength;
    const binaryLength = header.getUint32(binaryHeader, true);
    const binaryOffset = binaryHeader + 8;
    const binary = new DataView(file, binaryOffset, binaryLength);
    const componentCounts = {SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4};

    function readFloatAccessor(accessorIndex) {
      const accessor = documentData.accessors[accessorIndex];
      const view = documentData.bufferViews[accessor.bufferView];
      if (accessor.componentType !== 5126) throw new Error('Unsupported vertex component type.');
      const components = componentCounts[accessor.type];
      const stride = view.byteStride || components * 4;
      const start = (view.byteOffset || 0) + (accessor.byteOffset || 0);
      const values = new Float32Array(accessor.count * components);
      for (let item = 0; item < accessor.count; item += 1) {
        for (let component = 0; component < components; component += 1) {
          values[item * components + component] = binary.getFloat32(
            start + item * stride + component * 4,
            true,
          );
        }
      }
      return values;
    }

    function readIndexAccessor(accessorIndex) {
      const accessor = documentData.accessors[accessorIndex];
      const view = documentData.bufferViews[accessor.bufferView];
      const start = (view.byteOffset || 0) + (accessor.byteOffset || 0);
      const width = accessor.componentType === 5125 ? 4 : accessor.componentType === 5123 ? 2 : 1;
      const values = new Uint32Array(accessor.count);
      for (let item = 0; item < accessor.count; item += 1) {
        const offset = start + item * width;
        values[item] = width === 4
          ? binary.getUint32(offset, true)
          : width === 2
            ? binary.getUint16(offset, true)
            : binary.getUint8(offset);
      }
      return values;
    }

    function compileShader(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const message = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error(message || 'Could not compile the car renderer.');
      }
      return shader;
    }

    const vertexShader = compileShader(gl.VERTEX_SHADER, `
      attribute vec3 aPosition;
      attribute vec3 aNormal;
      uniform mat4 uMvp;
      uniform mat4 uModel;
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      void main() {
        vec4 worldPosition = uModel * vec4(aPosition, 1.0);
        vWorldPosition = worldPosition.xyz;
        vNormal = normalize(mat3(uModel) * aNormal);
        gl_Position = uMvp * vec4(aPosition, 1.0);
      }
    `);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, `
      precision mediump float;
      uniform vec3 uColor;
      uniform vec3 uEye;
      uniform float uOpacity;
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 light = normalize(vec3(-0.45, -0.7, 1.1));
        vec3 view = normalize(uEye - vWorldPosition);
        float diffuse = max(dot(normal, light), 0.0);
        float fill = max(dot(normal, normalize(vec3(0.35, 0.5, 0.7))), 0.0);
        float shine = pow(max(dot(normal, normalize(light + view)), 0.0), 28.0) * 0.32;
        float rim = pow(1.0 - max(dot(normal, view), 0.0), 2.0) * 0.12;
        vec3 color = uColor * (0.48 + diffuse * 0.62 + fill * 0.2);
        color += vec3(1.0, 0.56, 0.31) * shine + vec3(0.15, 0.2, 0.25) * rim;
        color = pow(max(color, vec3(0.0)), vec3(0.4545));
        gl_FragColor = vec4(color, uOpacity);
      }
    `);
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) || 'Could not link the car renderer.');
    }
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    const locations = {
      position: gl.getAttribLocation(program, 'aPosition'),
      normal: gl.getAttribLocation(program, 'aNormal'),
      mvp: gl.getUniformLocation(program, 'uMvp'),
      model: gl.getUniformLocation(program, 'uModel'),
      color: gl.getUniformLocation(program, 'uColor'),
      eye: gl.getUniformLocation(program, 'uEye'),
      opacity: gl.getUniformLocation(program, 'uOpacity'),
    };
    const rootIndex = documentData.scenes[documentData.scene || 0].nodes[0];
    const rootNode = documentData.nodes[rootIndex];
    const parts = rootNode.children.map((nodeIndex) => {
      const node = documentData.nodes[nodeIndex];
      const part = {
        nodeIndex,
        name: node.name,
        isWheel: node.name === '07_Rodas',
        boundsMin: [Infinity, Infinity, Infinity],
        boundsMax: [-Infinity, -Infinity, -Infinity],
        primitives: [],
      };
      (node.children || []).forEach((childIndex) => {
        const meshNode = documentData.nodes[childIndex];
        if (meshNode.mesh === undefined) return;
        documentData.meshes[meshNode.mesh].primitives.forEach((primitive) => {
          const positionIndex = primitive.attributes.POSITION;
          const normalIndex = primitive.attributes.NORMAL;
          const positionAccessor = documentData.accessors[positionIndex];
          const positions = readFloatAccessor(positionIndex);
          const normals = readFloatAccessor(normalIndex);
          const indices = primitive.indices === undefined
            ? Uint32Array.from({length: positionAccessor.count}, (_, i) => i)
            : readIndexAccessor(primitive.indices);
          const interleaved = new Float32Array(indices.length * 6);
          for (let vertex = 0; vertex < indices.length; vertex += 1) {
            const source = indices[vertex] * 3;
            const destination = vertex * 6;
            interleaved[destination] = positions[source];
            interleaved[destination + 1] = positions[source + 1];
            interleaved[destination + 2] = positions[source + 2];
            interleaved[destination + 3] = normals[source];
            interleaved[destination + 4] = normals[source + 1];
            interleaved[destination + 5] = normals[source + 2];
          }
          const buffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
          gl.bufferData(gl.ARRAY_BUFFER, interleaved, gl.STATIC_DRAW);
          const material = documentData.materials[primitive.material];
          const color = material.pbrMetallicRoughness.baseColorFactor.slice(0, 3);
          if (part.isWheel && material.name === 'Borracha') {
            color[0] = 0.1;
            color[1] = 0.115;
            color[2] = 0.14;
          }
          if (part.isWheel && material.name === 'Preto_carbono') {
            color[0] = 0.08;
            color[1] = 0.09;
            color[2] = 0.11;
          }
          part.primitives.push({buffer, vertexCount: indices.length, color});
          const min = positionAccessor.min;
          const max = positionAccessor.max;
          for (let axis = 0; axis < 3; axis += 1) {
            part.boundsMin[axis] = Math.min(part.boundsMin[axis], min[axis]);
            part.boundsMax[axis] = Math.max(part.boundsMax[axis], max[axis]);
          }
        });
      });
      return part;
    });

    const modelMinimum = [Infinity, Infinity, Infinity];
    const modelMaximum = [-Infinity, -Infinity, -Infinity];
    parts.forEach((part) => {
      for (let axis = 0; axis < 3; axis += 1) {
        modelMinimum[axis] = Math.min(modelMinimum[axis], part.boundsMin[axis]);
        modelMaximum[axis] = Math.max(modelMaximum[axis], part.boundsMax[axis]);
      }
    });
    const center = modelMinimum.map((value, axis) => (value + modelMaximum[axis]) / 2);
    const radius = Math.max(1, Math.hypot(...modelMaximum.map((value, axis) => (value - modelMinimum[axis]) / 2)));

    gl.useProgram(program);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);
    let cameraAzimuth = Math.atan2(-0.72, 0.55);
    let cameraElevation = Math.asin(0.42 / Math.hypot(0.55, 0.72, 0.42));
    let assembledCount = 0;
    let transition = null;
    let frameId = 0;
    let drag = null;

    function scheduleDraw() {
      if (!frameId) frameId = requestAnimationFrame(drawFrame);
    }

    function draw() {
      const canvasWidth = Math.max(1, canvas.clientWidth);
      const canvasHeight = Math.max(1, canvas.clientHeight);
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.round(canvasWidth * pixelRatio);
      const height = Math.round(canvasHeight * pixelRatio);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, width, height);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      const aspect = width / height;
      const fieldOfView = 38 * Math.PI / 180;
      const effectiveField = Math.min(
        fieldOfView,
        2 * Math.atan(Math.tan(fieldOfView / 2) * aspect),
      );
      const distance = radius / Math.sin(effectiveField / 2) * 1.08;
      const horizontalRadius = Math.cos(cameraElevation);
      const direction = [
        horizontalRadius * Math.cos(cameraAzimuth),
        horizontalRadius * Math.sin(cameraAzimuth),
        Math.sin(cameraElevation),
      ];
      const eye = center.map((value, axis) => value + direction[axis] * distance);
      const view = lookAtMatrix(eye, center, [0, 0, 1]);
      const projection = perspectiveMatrix(
        fieldOfView,
        aspect,
        Math.max(0.02, distance - radius * 2),
        distance + radius * 3,
      );
      const viewProjection = multiplyMatrices(projection, view);
      const model = new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
      ]);
      gl.uniform3fv(locations.eye, eye);
      gl.uniformMatrix4fv(locations.model, false, model);
      gl.uniformMatrix4fv(locations.mvp, false, viewProjection);

      parts.forEach((part, index) => {
        const progress = Math.max(0, Math.min(1, assembledCount - index));
        if (progress <= 0) return;
        const opacity = progress * progress * (3 - 2 * progress);
        const offset = assemblyStartOffsets[index];
        const settle = 1 - opacity;
        const model = new Float32Array([
          1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          offset[0] * settle, offset[1] * settle, offset[2] * settle, 1,
        ]);
        gl.uniformMatrix4fv(locations.model, false, model);
        gl.uniformMatrix4fv(locations.mvp, false, multiplyMatrices(viewProjection, model));
        gl.uniform1f(locations.opacity, opacity);
        if (part.isWheel) gl.disable(gl.CULL_FACE);
        else gl.enable(gl.CULL_FACE);
        part.primitives.forEach((primitive) => {
          gl.bindBuffer(gl.ARRAY_BUFFER, primitive.buffer);
          gl.enableVertexAttribArray(locations.position);
          gl.enableVertexAttribArray(locations.normal);
          gl.vertexAttribPointer(locations.position, 3, gl.FLOAT, false, 24, 0);
          gl.vertexAttribPointer(locations.normal, 3, gl.FLOAT, false, 24, 12);
          gl.uniform3fv(locations.color, primitive.color);
          gl.drawArrays(gl.TRIANGLES, 0, primitive.vertexCount);
        });
      });
      gl.enable(gl.CULL_FACE);
    }

    function drawFrame(now) {
      frameId = 0;
      if (transition) {
        const progress = Math.min(1, (now - transition.startedAt) / transition.duration);
        assembledCount = transition.from + (transition.to - transition.from) * progress;
        if (progress === 1) {
          assembledCount = transition.to;
          transition = null;
        }
      }
      draw();
      if (transition) scheduleDraw();
    }

    canvas.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      drag = {pointerId: event.pointerId, x: event.clientX, y: event.clientY};
      canvas.setPointerCapture(event.pointerId);
      canvas.classList.add('is-dragging');
      event.preventDefault();
    });
    canvas.addEventListener('pointermove', (event) => {
      if (!drag || event.pointerId !== drag.pointerId) return;
      const deltaX = event.clientX - drag.x;
      const deltaY = event.clientY - drag.y;
      drag.x = event.clientX;
      drag.y = event.clientY;
      cameraAzimuth -= deltaX * 0.009;
      cameraElevation = Math.max(-0.15, Math.min(1.28, cameraElevation + deltaY * 0.007));
      scheduleDraw();
    });
    const stopDragging = (event) => {
      if (!drag || event.pointerId !== drag.pointerId) return;
      drag = null;
      canvas.classList.remove('is-dragging');
    };
    canvas.addEventListener('pointerup', stopDragging);
    canvas.addEventListener('pointercancel', stopDragging);

    function resize() { scheduleDraw(); }
    window.addEventListener('resize', resize, {passive: true});
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);
    scheduleDraw();

    return {
      setCount(count) {
        const target = Math.max(0, Math.min(parts.length, count));
        if (reduced.matches) {
          assembledCount = target;
          transition = null;
        } else {
          transition = {
            from: assembledCount,
            to: target,
            startedAt: performance.now(),
            duration: Math.max(300, Math.abs(target - assembledCount) * 360),
          };
        }
        scheduleDraw();
      },
    };
  }

  createAssemblyRenderer(assemblyCanvas)
    .then((renderer) => {
      assemblyRenderer = renderer;
      assemblyRenderer.setCount(assemblyCounts[activeProcessStage]);
      assemblyVisual.classList.add('is-model-ready');
    })
    .catch((error) => {
      assemblyVisual.classList.add('is-model-error');
      console.warn('Não foi possível carregar o modelo 3D da montagem.', error);
    });

  tabGroup('.process-tabs', (button) => {
    const index = Number(button.dataset.stage),
      item = process[index];
    setProcessAssemblyStage(index);
    document.getElementById('process-eyebrow').textContent = item.eyebrow;
    document.getElementById('process-title').textContent = item.title;
    document.getElementById('process-description').textContent = item.text;
    const panel = document.getElementById('process-panel');
    panel.classList.toggle('is-question', index === 0);
    panel.setAttribute('aria-labelledby', button.id);
    animatePanel(panel);
  });

  const history = [
    {
      year: '2019-2020',
      title: 'A primeira geração da Carcará Lux.',
      description:
        'Foi nessa temporada que a Carcará Lux começou. A primeira geração levou para o projeto do carro uma preocupação que acompanharia a equipe: a preservação ambiental.',
      source: null,
      location: 'Primeira temporada',
      image: 'assets/equipes/2019-2020.png',
      imageAlt: 'Primeira geração da equipe Carcará Lux, temporada 2019–2020',
    },
    {
      year: '2021-2022',
      title: 'Uma nova geração volta à pista.',
      description:
        'Depois de uma pausa, voltamos com uma nova geração. Refizemos o projeto do zero, com uma proposta mais digital, e chegamos à final nacional da F1 in Schools, em São Paulo.',
      source: {
        label: 'Confederação Brasileira de Automobilismo',
        url: 'https://www.cba.org.br/noticias/noticiasinfo/2230/f1-in-schools-disputa-final-em-sao-paulo',
      },
      competition: 'Final nacional · F1 in Schools',
      location: 'São Paulo, SP',
      image: 'assets/equipes/2021-2022.png',
      imageAlt: 'Equipe Carcará Lux na temporada 2021–2022',
    },
    {
      year: '2023-2024',
      title: '7º carro mais veloz do Brasil.',
      description:
        'Na temporada 2023–2024, nosso carro ficou em 7º lugar entre os mais velozes do Brasil. A equipe também destacou o planejamento e a organização do projeto social daquele ano.',
      source: {
        label: 'Site oficial anterior da equipe',
        url: 'https://carcaralux.wixsite.com/site-oficial',
      },
      competition: 'F1 in Schools · Projeto social',
      location: 'Brasil',
      image: 'assets/equipes/2024.jpg',
      imageAlt: 'Equipe Carcará Lux na temporada 2023–2024',
    },
    {
      year: '2025-2026',
      title: 'Terceiro carro mais veloz.',
      description:
        'Em 2025, nosso carro ficou entre os três mais velozes da F1 in Schools no Festival SESI de Robótica. É o resultado de pista desta temporada.',
      source: {
        label: 'FIERN · 17 mar. 2025',
        url: 'https://www.fiern.org.br/equipes-das-escolas-sesi-rio-grande-norte-se-destacam-em-torneio-nacional-de-robotica/',
      },
      competition: 'Festival SESI de Robótica · F1 in Schools',
      location: 'São Paulo, SP',
      image: 'assets/equipes/2025.jpg',
      imageAlt: 'Equipe Carcará Lux na temporada 2025–2026',
    },
  ];
  const yearPanel = document.getElementById('year-panel');
  const yearContents = [yearPanel.querySelector('.year-media'), yearPanel.querySelector('.year-story')];
  history.forEach(item => {
    const image = new Image();
    image.src = item.image;
  });
  const initialYearTab = document.getElementById(yearPanel.getAttribute('aria-labelledby'));
  let displayedYear = history.findIndex(item => item.year === initialYearTab.dataset.year);
  let yearChanging = false;
  let queuedYear = null;
  function renderYear(item, button) {
    document.getElementById('year-number').textContent = item.year;
    const yearImage = document.getElementById('year-image');
    yearImage.src = item.image;
    yearImage.alt = item.imageAlt;
    document.getElementById('year-location').textContent =
      item.location.toUpperCase();
    document.getElementById('year-title').textContent = item.title;
    document.getElementById('year-description').textContent = item.description;
    yearPanel.setAttribute('aria-labelledby', button.id);
  }
  async function slideYearContents(from, to, duration) {
    const animations = yearContents.map(element => element.animate([
      {transform: `translate3d(${from}px, 0, 0)`, opacity: from === 0 ? 1 : 0},
      {transform: `translate3d(${to}px, 0, 0)`, opacity: to === 0 ? 1 : 0},
    ], {duration, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards'}));
    await Promise.all(animations.map(animation => animation.finished));
    return animations;
  }
  async function selectYear(button) {
    const item = history.find(year => year.year === button.dataset.year);
    if (!item) return;
    if (yearChanging) { queuedYear = button; return; }
    const nextYear = history.indexOf(item);
    if (nextYear === displayedYear) return;
    if (!yearContents.every(element => typeof element.animate === 'function')) {
      renderYear(item, button);
      displayedYear = nextYear;
      return;
    }
    yearChanging = true;
    const direction = nextYear > displayedYear ? 1 : -1;
    const distance = yearPanel.clientWidth;
    const previousMinHeight = yearPanel.style.minHeight;
    yearPanel.style.minHeight = yearPanel.offsetHeight + 'px';
    yearPanel.setAttribute('aria-busy', 'true');
    yearContents.forEach(element => { element.style.willChange = 'transform, opacity'; });
    let exiting = [], entering = [];
    try {
      exiting = await slideYearContents(0, -direction * distance, 300);
      renderYear(item, button);
      displayedYear = nextYear;
      const arrival = slideYearContents(direction * distance, 0, 430);
      exiting.forEach(animation => animation.cancel());
      entering = await arrival;
    } finally {
      [...exiting, ...entering].forEach(animation => animation.cancel());
      yearContents.forEach(element => { element.style.willChange = ''; });
      yearPanel.style.minHeight = previousMinHeight;
      yearPanel.removeAttribute('aria-busy');
      yearChanging = false;
      if (queuedYear) {
        const next = queuedYear;
        queuedYear = null;
        void selectYear(next);
      }
    }
  }
  tabGroup('.years', button => { void selectYear(button); });
})();


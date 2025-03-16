import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const House3DGenerator = ({ size, designStyle, floors }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // House dimensions
    const houseWidth = size / 10;
    const houseDepth = size / 10;
    const houseHeight = floors * 3;

    // Randomize color and texture
    const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];
    const textures = [
      new THREE.MeshBasicMaterial({ color: colors[Math.floor(Math.random() * colors.length)] }),
      new THREE.MeshBasicMaterial({ color: colors[Math.floor(Math.random() * colors.length)] }),
      new THREE.MeshBasicMaterial({ color: colors[Math.floor(Math.random() * colors.length)] })
    ];

    // Create house
    const geometry = new THREE.BoxGeometry(houseWidth, houseHeight, houseDepth);
    const house = new THREE.Mesh(geometry, textures);
    scene.add(house);

    camera.position.z = 15;

    const animate = () => {
      requestAnimationFrame(animate);
      house.rotation.x += 0.01;
      house.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [size, designStyle, floors]);

  return <div ref={mountRef}></div>;
};

export default House3DGenerator;
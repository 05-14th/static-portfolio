import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroThreeBG() {
  const mountRef = useRef(null)
  const requestRef = useRef(0)

  useEffect(() => {
    const container = mountRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000)
    camera.position.z = 60

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)

    // Particles
    const COUNT = 1200
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 200
      positions[i * 3 + 1] = (Math.random() - 0.5) * 120
      positions[i * 3 + 2] = (Math.random() - 0.5) * 120
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const material = new THREE.PointsMaterial({ size: 1.5, sizeAttenuation: true, color: 0x91c9ff, transparent: true, opacity: 0.75 })
    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // Soft light tint
    const light = new THREE.AmbientLight(0x3355ff, 0.4)
    scene.add(light)

    const clock = new THREE.Clock()
    function animate() {
      const t = clock.getElapsedTime()
      points.rotation.y = t * 0.05
      points.rotation.x = Math.sin(t * 0.2) * 0.05
      renderer.render(scene, camera)
      requestRef.current = requestAnimationFrame(animate)
    }
    animate()

    function onResize() {
      const { clientWidth, clientHeight } = container
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(clientWidth, clientHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(requestRef.current)
      window.removeEventListener('resize', onResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="three-bg" aria-hidden="true" />
}

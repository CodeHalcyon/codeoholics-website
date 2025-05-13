// "use client"

// import { useEffect, useState, useRef } from "react"
// import { useTheme } from "next-themes"

// export default function SimplifiedParticleBackground() {
//   const { theme } = useTheme()
//   const canvasRef = useRef<HTMLCanvasElement>(null)
//   const [mounted, setMounted] = useState(false)

//   // Wait for client-side rendering to access theme
//   useEffect(() => {
//     setMounted(true)
//   }, [])

//   useEffect(() => {
//     if (!mounted) return

//     const canvas = canvasRef.current
//     if (!canvas) return

//     const ctx = canvas.getContext("2d")
//     if (!ctx) return

//     // Set canvas dimensions
//     const setCanvasDimensions = () => {
//       if (canvas) {
//         canvas.width = window.innerWidth
//         canvas.height = window.innerHeight
//       }
//     }

//     setCanvasDimensions()
//     window.addEventListener("resize", setCanvasDimensions)

//     // Particle settings
//     const isDarkTheme = theme === "dark"
//     const particlesArray: Particle[] = []
//     const numberOfParticles = 40 // Reduced for better performance
//     const particleColor = "#ff3e8c"
//     const lineColor = isDarkTheme ? "rgba(255, 255, 255, 0.15)" : "rgba(51, 51, 51, 0.1)"

//     // Mouse position
//     const mouse = {
//       x: null as number | null,
//       y: null as number | null,
//     }

//     const handleMouseMove = (event: MouseEvent) => {
//       mouse.x = event.x
//       mouse.y = event.y
//     }

//     window.addEventListener("mousemove", handleMouseMove)

//     // Create particle class
//     class Particle {
//       x: number
//       y: number
//       size: number
//       speedX: number
//       speedY: number
//       color: string

//       constructor() {
//         this.x = Math.random() * canvas.width
//         this.y = Math.random() * canvas.height
//         this.size = Math.random() * 3 + 1
//         this.speedX = Math.random() * 2 - 1
//         this.speedY = Math.random() * 2 - 1
//         this.color = particleColor
//       }

//       update() {
//         this.x += this.speedX
//         this.y += this.speedY

//         // Boundary check
//         if (this.x > canvas.width || this.x < 0) {
//           this.speedX = -this.speedX
//         }
//         if (this.y > canvas.height || this.y < 0) {
//           this.speedY = -this.speedY
//         }

//         // Mouse interaction
//         if (mouse.x && mouse.y) {
//           const dx = mouse.x - this.x
//           const dy = mouse.y - this.y
//           const distance = Math.sqrt(dx * dx + dy * dy)
//           if (distance < 100) {
//             const angle = Math.atan2(dy, dx)
//             this.speedX = -Math.cos(angle) * 1
//             this.speedY = -Math.sin(angle) * 1
//           }
//         }
//       }

//       draw() {
//         if (ctx) {
//           ctx.fillStyle = this.color
//           ctx.beginPath()
//           ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
//           ctx.fill()
//         }
//       }
//     }

//     // Initialize particles
//     function init() {
//       particlesArray.length = 0
//       for (let i = 0; i < numberOfParticles; i++) {
//         particlesArray.push(new Particle())
//       }
//     }

//     // Connect nearby particles with lines
//     function connectParticles() {
//       for (let a = 0; a < particlesArray.length; a++) {
//         for (let b = a; b < particlesArray.length; b++) {
//           const dx = particlesArray[a].x - particlesArray[b].x
//           const dy = particlesArray[a].y - particlesArray[b].y
//           const distance = Math.sqrt(dx * dx + dy * dy)

//           if (distance < 150) {
//             if (ctx) {
//               ctx.strokeStyle = lineColor
//               ctx.lineWidth = 0.5
//               ctx.beginPath()
//               ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
//               ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
//               ctx.stroke()
//             }
//           }
//         }
//       }
//     }

//     // Animation loop
//     let animationFrameId: number
//     function animate() {
//       if (ctx) {
//         ctx.clearRect(0, 0, canvas.width, canvas.height)

//         // Update and draw particles
//         for (let i = 0; i < particlesArray.length; i++) {
//           particlesArray[i].update()
//           particlesArray[i].draw()
//         }

//         // Connect particles with lines
//         connectParticles()
//       }

//       animationFrameId = requestAnimationFrame(animate)
//     }

//     // Start animation
//     init()
//     animate()

//     // Cleanup
//     return () => {
//       window.removeEventListener("resize", setCanvasDimensions)
//       window.removeEventListener("mousemove", handleMouseMove)
//       cancelAnimationFrame(animationFrameId)
//     }
//   }, [mounted, theme])

//   if (!mounted) return null

//   return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10" aria-hidden="true" />
// }

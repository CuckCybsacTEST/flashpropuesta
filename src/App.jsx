import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Flame, Banknote, Target, CalendarDays, Clock } from "lucide-react";
import { DateTime } from "luxon";

const slides = [
	{
		title: "Ecommerce & Dropshipping",
		subtitle: "",
		bullets: [],
	},
	{
		title: "Sesión 1 – Fundamentos & Producto Ganador",
		subtitle: "Modelo de negocio y selección de producto",
		bullets: [
			"Qué es y qué no es el dropshipping",
			"Cuánto invertir y qué esperar",
			"Criterios para elegir productos rentables",
			"Elegimos 2 productos reales para testear",
		],
	},
	{
		title: "Sesiones 2 & 3 – Shopify en Acción",
		subtitle: "De cuenta vacía a tienda funcional",
		bullets: [
			"Planes, costos y límites de la versión básica",
			"Configuración de pagos, envíos y políticas",
			"Conexión con proveedores y apps clave",
			"Páginas de producto que realmente convierten",
		],
	},
	{
		title: "Sesiones 4, 5 & 6 – Contenido que Vende",
		subtitle: "Copy, diseño estratégico y video rápido",
		bullets: [
			"Copywriting AIDA / PAS para productos y anuncios",
			"Principios de diseño sin ser diseñador",
			"Plantillas reutilizables en Canva",
			"Videos UGC con CapCut listos para Ads",
		],
	},
	{
		title: "Sesiones 7 & 8 – Meta Ads con Poco Presupuesto",
		subtitle: "De Business Manager al primer anuncio activo",
		bullets: [
			"Configuración de Business Manager y píxel",
			"Anatomía de campaña y tipos de objetivos",
			"Segmentación actual que sí funciona",
			"Lanzamos una campaña real para el proyecto",
		],
	},
	{
		title: "Sesión 9 – Atención al Cliente & Logística",
		subtitle: "Soportar ventas reales sin morir en el intento",
		bullets: [
			"WhatsApp Business y scripts de venta",
			"Gestión de pedidos, envíos y reclamos",
			"Buenas prácticas para reducir reembolsos",
		],
	},
	{
		title: "Sesión 10 – Implementación + Plan 30·60·90",
		subtitle: "Auditoría total y hoja de ruta",
		bullets: [
			"Revisión de tienda, anuncios y contenidos",
			"Test real con presupuesto opcional",
			"Plan de acción para los próximos 90 días",
		],
	},
	{
		title: "Oferta Especial",
		subtitle: "Costo del Programa",
		bullets: [
			"Precio original: $400",
			"Precio con descuento: $250",
			"Descuento aplicado: 37.5%",
			"Validez de la oferta: Hasta el 21 de noviembre",
		],
	},
];

export default function PlanDropshippingSlider() {
	const [index, setIndex] = useState(0);
	const current = slides[index];

	const isMiddleCard = index !== 0 && index !== slides.length - 1;
	let sessionLabel = "";
	let sessionHeadline = current.title;

	if (isMiddleCard) {
		const parts = current.title.split(" – ");
		if (parts.length > 1) {
			sessionLabel = parts[0];
			sessionHeadline = parts.slice(1).join(" – ");
		}
	}

	const middleCardVariants = [
		"bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border-indigo-500/40 shadow-indigo-500/15",
		"bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 border-purple-500/35 shadow-purple-500/15",
		"bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 border-teal-500/35 shadow-teal-500/15",
		"bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900 border-amber-500/35 shadow-amber-500/15",
	];

	const next = () => setIndex((prev) => (prev + 1) % slides.length);
	const prev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

	function Countdown() {
		const [timeLeft, setTimeLeft] = useState("Calculando...");
		const [progress, setProgress] = useState(0);

		useEffect(() => {
			const targetDate = DateTime.fromISO("2025-11-21T23:59:59", { zone: "America/Lima" });
			const startDate = DateTime.fromISO("2025-11-01T00:00:00", { zone: "America/Lima" });

			const interval = setInterval(() => {
				const now = DateTime.now().setZone("America/Lima");
				const diff = targetDate.diff(now, ["days", "hours", "minutes", "seconds"]);
				const total = targetDate.diff(startDate).toMillis();
				const elapsed = now.diff(startDate).toMillis();
				const pct = Math.min(100, Math.max(0, (elapsed / total) * 100));

				if (diff.toMillis() <= 0) {
					clearInterval(interval);
					setTimeLeft("¡La oferta ha expirado!");
					setProgress(100);
				} else {
					setTimeLeft(
						`${Math.floor(diff.days)}d ${Math.floor(diff.hours)}h ${Math.floor(diff.minutes)}m ${Math.floor(diff.seconds)}s`
					);
					setProgress(pct);
				}
			}, 1000);

			return () => clearInterval(interval);
		}, []);

		return (
			<div className="bg-slate-800/50 rounded-xl p-3 sm:p-4 backdrop-blur-sm border border-emerald-700/40 mt-4 sm:mt-6">
				<div className="flex flex-wrap items-center gap-2 mb-2 text-slate-200">
					<Clock className="w-4 h-4 text-emerald-400" />
					<span className="text-sm font-medium">Tiempo restante:</span>
					<span className="font-semibold">{timeLeft}</span>
				</div>
				<div className="h-2 w-full rounded-full bg-slate-700 overflow-hidden mb-3">
					<div
						className="h-full bg-gradient-to-r from-emerald-400 via-yellow-400 to-orange-500 transition-[width] duration-1000"
						style={{ width: `${progress}%` }}
					></div>
				</div>
				<div className="flex items-center gap-2 text-xs text-slate-300">
					<CalendarDays className="w-4 h-4 text-emerald-400" />
					<span>Válido hasta el 21 de noviembre</span>
				</div>
			</div>
		); 
	}

	return (
		<div className="min-h-screen bg-slate-950 px-4 py-10">
			<div className="flex items-center justify-center min-h-[80vh]">
				<div className="w-full max-w-4xl">
					<div
						className={`bg-slate-900 rounded-2xl p-5 sm:p-6 md:p-8 shadow-2xl border border-slate-800 ${
							index === 0
								? "bg-gradient-to-br from-blue-900 to-slate-900 border-blue-500 shadow-blue-500/20 text-center"
								: index === slides.length - 1
								? "bg-gradient-to-br from-green-900 to-slate-900 border-green-500 shadow-green-500/20 text-center"
								: middleCardVariants[(index - 1) % middleCardVariants.length]
						} w-full max-w-md sm:max-w-lg md:max-w-2xl mx-auto`}
					>
						<div className="contents">
							{index === 0 && (
								<div className="mb-8 text-center">
									<p className="text-slate-500 text-xs uppercase tracking-wide mb-2">
										Entrenamiento
									</p>
									<h1 className="text-white text-2xl font-bold mb-4">
										Ecommerce & Dropshipping
									</h1>
									<h3 className="text-slate-400 text-sm uppercase mb-4">
										PLAN INTENSIVO
									</h3>
									<p className="text-slate-400 text-sm mb-4">
										Entrenamiento de 10 sesiones · 120 min c/u
									</p>
									<ul className="space-y-3 mb-4">
										<li className="flex items-start text-slate-200 text-sm md:text-base justify-center">
											<Check className="text-green-400 mr-3 mt-1 w-5 h-5" />
											Shopify desde cero
										</li>
										<li className="flex items-start text-slate-200 text-sm md:text-base justify-center">
											<Check className="text-green-400 mr-3 mt-1 w-5 h-5" />
											Meta Ads con bajo presupuesto
										</li>
										<li className="flex items-start text-slate-200 text-sm md:text-base justify-center">
											<Check className="text-green-400 mr-3 mt-1 w-5 h-5" />
											Contenido rápido (copy, Canva, CapCut)
										</li>
										<li className="flex items-start text-slate-200 text-sm md:text-base justify-center">
											<Check className="text-green-400 mr-3 mt-1 w-5 h-5" />
											Operación, logística y plan 30·60·90
										</li>
									</ul>
									<div className="mt-6">
										<p className="text-slate-400 font-medium mb-1">
											Coach:{" "}
											<span className="text-slate-300">Deivis Contreras Cárdenas</span>
										</p>
										<p className="text-slate-500 text-sm">
											Product Developer
										</p>
									</div>
									<button
										onClick={next}
										className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors font-semibold"
									>
										Ver propuesta
									</button>
								</div>
							)}
							{isMiddleCard && (
								<div className="text-center">
									<h2 className="text-white text-xl sm:text-2xl font-bold mb-2">
										{sessionHeadline}
									</h2>
									{sessionLabel && (
										<p className="text-slate-500 text-xs uppercase tracking-wide mb-3">
											{sessionLabel}
										</p>
									)}
									<h3 className="text-slate-400 text-base sm:text-lg mb-4">
										{current.subtitle}
									</h3>
									<ul className="space-y-3 mb-4">
										{current.bullets.map((bullet, i) => (
											<li
												key={i}
												className="flex items-start text-slate-200 text-sm md:text-base justify-start sm:justify-center"
											>
												<span className="text-gray-400 mr-3 mt-1">•</span>
												{bullet}
											</li>
										))}
									</ul>
								</div>
							)}
							{index === slides.length - 1 && (
								<div className="text-center">
									{/* Header destacado */}
									<div className="flex items-center justify-center gap-2 mb-4">
										<Flame className="text-yellow-400 w-6 h-6" />
										<h2 className="text-white text-2xl font-bold tracking-wide">OFERTA ESPECIAL</h2>
									</div>
									{/* Badge descuento */}
									<div className="mb-6">
										<span className="inline-block bg-yellow-400 text-slate-900 font-bold px-5 py-2 rounded-md text-sm tracking-wide shadow">-37.5% OFF</span>
									</div>
									{/* Precio hero */}
									<div className="mb-2">
										<div className="text-white font-extrabold text-5xl sm:text-6xl md:text-7xl">$149</div>
									</div>
									<p className="text-emerald-300/70 line-through text-xl mb-6">Después: $400</p>
									{/* Bullets informativos */}
									<ul className="space-y-3 text-left mb-6">
										<li className="flex items-center text-slate-100"><Check className="text-emerald-400 w-5 h-5 mr-3" /> Acceso completo al entrenamiento</li>
										<li className="flex items-center text-slate-100"><Check className="text-emerald-400 w-5 h-5 mr-3" /> Sesiones 100% prácticas</li>
										<li className="flex items-center text-slate-100"><Check className="text-emerald-400 w-5 h-5 mr-3" /> 100% personalizado</li>
									</ul>
									<Countdown />
									{/* CTA */}
									<a
										href="https://wa.me/51989843709?text=%C2%A1Quiero%20el%20entrenamiento"
										target="_blank"
										rel="noopener noreferrer"
										className="mt-8 w-full py-4 rounded-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-500 text-slate-900 font-semibold text-lg shadow-[0_0_0_2px_rgba(16,185,129,0.6),0_0_18px_-2px_rgba(16,185,129,0.7)] hover:brightness-110 transition text-center"
									>
										🎁 Obtener la oferta ahora
									</a>
									<button
										onClick={() => setIndex(1)}
										className="mt-3 w-full py-3 rounded-full bg-slate-700 text-slate-200 font-medium hover:bg-slate-600 transition"
									>
										Volver
									</button>
									<div className="w-full text-center mt-4">
										<button
											onClick={() => setIndex(0)}
											className="text-sm text-slate-400 hover:text-slate-300 transition-colors"
										>
											Decidir más tarde
										</button>
									</div>
								</div>
							)}
							{index > 0 && index < slides.length - 1 && (
								<div className="mt-6 flex flex-col justify-center items-center gap-4">
									{index === 1 ? (
										<button
											onClick={next}
											className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors w-full"
										>
											Siguiente
										</button>
									) : (
										<>
											<button
												onClick={prev}
												className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors w-full"
											>
												Anterior
											</button>
											<button
												onClick={next}
												className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors w-full"
											>
												Siguiente
											</button>
										</>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
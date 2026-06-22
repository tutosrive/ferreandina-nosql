// import { useNavigate } from "react-router-dom";
// import logo from "../assets/logo.png";
// import sucursales from "../assets/sucursales.jpg";
// import categorias from "../assets/categoria.png";
// import clientes from "../assets/clientes.jpg";
// import productos from "../assets/productos.jpg";
// import proveedores from "../assets/provedores.jpg";
// import trabajadores from "../assets/trabajadores.jpg";
// import { summaryCards, type SectionKey } from "../data";

// const imageMap: Record<SectionKey, string> = {
//   branches: sucursales,
//   categories: categorias,
//   customers: clientes,
//   products: productos,
//   suppliers: proveedores,
//   workers: trabajadores,
// };

// export default function HomePage() {
//   const navigate = useNavigate();

//   return (
//     <>
//       <section className="hero">
//         <div>
//           <span className="eyebrow">Gestión Central</span>
//           <h1>Sistema de Administración</h1>
//           <p>
//             Controla y gestiona sucursales, clientes, productos, proveedores y
//             el equipo de trabajo en un solo lugar. Todo centralizado, moderno y
//             claro.
//           </p>
//         </div>
//         <div className="hero-visual">
//           <img src={logo} alt="Ilustración" />
//         </div>
//       </section>

//       <section className="summary-grid">
//         {summaryCards.map((item) => (
//           <article
//             key={item.id}
//             className="summary-card"
//             onClick={() => navigate(`/${item.id}`)}
//             tabIndex={0}
//             role="button"
//             onKeyDown={(e) => {
//               if (e.key === "Enter" || e.key === " ") navigate(`/${item.id}`);
//             }}
//           >
//             <div className="summary-card__preview">
//               <img
//                 className="summary-card__image"
//                 src={imageMap[item.id]}
//                 alt={item.label}
//               />
//             </div>
//             <div className="summary-card__content">
//               <div className="summary-card__icon">{item.emoji}</div>
//               <p className="summary-card__label">{item.label}</p>
//               <strong className="summary-card__count">{item.count}</strong>
//               <p className="summary-card__hint">{item.description}</p>
//             </div>
//           </article>
//         ))}
//       </section>
//     </>
//   );
// }

import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import sucursales from "../assets/sucursales.jpg";
import categorias from "../assets/categoria.png";
import clientes from "../assets/clientes.jpg";
import productos from "../assets/productos.jpg";
import proveedores from "../assets/provedores.jpg";
import trabajadores from "../assets/trabajadores.jpg";
import { useDashboardData, type SectionKey } from "../hooks/useDashBoardData";
import LoaderPointsComponent from "../components/LoaderPoints.component";

const imageMap: Record<SectionKey, string> = {
  branches: sucursales,
  categories: categorias,
  customers: clientes,
  products: productos,
  suppliers: proveedores,
  workers: trabajadores,
};

export default function HomePage() {
  const navigate = useNavigate();
  const { summaryCards, isLoading } = useDashboardData();

  if (isLoading) {
    return (
      <div className="w-screen h-screen fixed top-1/2 left-0 text-center flex justify-center items-center">
        <LoaderPointsComponent />
      </div>
    );
  }

  return (
    <>
      <section className="hero">
        <div>
          <span className="eyebrow">Central Management</span>
          <h1>Administration System</h1>
          <p>
            Control and manage branches, customers, products, suppliers and the
            team in one place. Everything centralised, modern and clear.
          </p>
        </div>
        <div className="hero-visual">
          <img src={logo} alt="Ilustración" />
        </div>
      </section>

      <section className="summary-grid">
        {summaryCards.map((item) => (
          <article
            key={item.id}
            className="summary-card"
            onClick={() => navigate(`/${item.id}`)}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") navigate(`/${item.id}`);
            }}
          >
            <div className="summary-card__preview">
              <img
                className="summary-card__image"
                src={imageMap[item.id]}
                alt={item.label}
              />
            </div>
            <div className="summary-card__content">
              <div className="summary-card__icon">{item.emoji}</div>
              <p className="summary-card__label">{item.label}</p>
              <strong className="summary-card__count">{item.count}</strong>
              <p className="summary-card__hint">{item.description}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

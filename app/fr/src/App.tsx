import React, { useState } from "react";
import logoFerreandina from "./assets/logo.png";
import Formulario from "./componentes/formulario";
import SedesPage from "./pages/sedes.page";

export default function App() {
  const [nombreProducto, setNombreProducto] = useState("");
  const [menuAbierto, setMenuAbierto] = useState(false);

  // 1. NUEVOS ESTADOS: Controlan qué sede se seleccionó y qué sub-opción se está visualizando
  const [sedeSeleccionada, setSedeSeleccionada] = useState<any>(null);
  const [pestañaActiva, setPestañaActiva] = useState<string>("inventario"); // 'inventario', 'trabajadores', 'direccion'

  // Tu lista de sedes disponibles de Ferreandina
  const sedes = [
    {
      id: 1,
      nombre: "Sede Principal - Manizales",
      dirreccion: "Carrera 23 #10-54, Los Rosales",
      trabajdores: ["Santiago Marin (Boss)", "Juan Eduardo (Cajero)"],
      inventario: [
        "Tubo PVC presión",
        "Cerradura de pomo",
        "Cemento gris",
        "Tornillo de acero",
        "Llave inglesa",
      ],
    },
    {
      id: 2,
      nombre: "Sede - Medellín",
      dirreccion: "Avenida 80 #45-30, Belén",
      trabajdores: ["Laura Gómez (Gerente)", "Carlos Pérez (Vendedor)"],
      inventario: [
        "Bujía Eléctrica",
        "Canaleta PVC",
        "Candado de Alta Seguridad",
        "Tornillo de acero",
        "Taladro Percutor",
      ],
    },
    {
      id: 3,
      nombre: "Sede - Pereira",
      dirreccion: "Calle 20 #15-10, Cuba",
      trabajdores: ["Ana Rodríguez (Gerente)", "Luis Martínez (Vendedor)"],
      inventario: [
        "Lámina Drywall",
        "Pintura Blanca Galón",
        "Cemento gris",
        "Cable Cobre N.12",
        "Llave inglesa",
      ],
    },
  ];

  const categorias = [
    {
      id: 1,
      nombre: "Construction Materials",
      cantidad: 31,
      url: "https://img.magnific.com/psd-premium/materiales-construccion-aislados-sobre-fondo-transparente_495814-1454.jpg",
    },
    {
      id: 2,
      nombre: "PVC",
      cantidad: 12,
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWZn1Ro_rwZSNXEL1XZQweH3bD5Eqn7mEUGYNq_sBAD0T1glkmaoIXEa0&s=10",
    },
    {
      id: 3,
      nombre: "Locks And Padlocks",
      cantidad: 6,
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgCBAqNY305waTyJ6VcxVA74cIrcwE3XOYdX8M6tmxi_Axo13cdAkJLzjy&s=10",
    },
    {
      id: 4,
      nombre: "Eléctricos",
      cantidad: 36,
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjSzB7A6LLJ7w6Xh9hS3fYDY9Zo2Ldo9-dZC-30CEL6RoRT1MYhbMVlRxG&s=10",
    },
    {
      id: 5,
      nombre: "Galvanizados",
      cantidad: 4,
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRofLj1ucorhZEuwKdjQiNKWr0cpXR8Eg6_R4pJJNzwZHIy9OUQFTAprjKv&s=10",
    },
    {
      id: 6,
      nombre: "Bathroom Fixtures",
      cantidad: 10,
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL91TNqJ1OcYI61dFxT3za6liJ3IgQD7q3_mcfA-zs9uus0xNowzjEyehR&s=10",
    },
    {
      id: 7,
      nombre: "kitchen And Laundry Fixtures",
      cantidad: 6,
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVQm8FeIWmBTDFW83rt4ovwakvrCES1wMNRsaGfxxbTCYA9p3JD_oUKWrO&s=10",
    },
    {
      id: 8,
      nombre: "Plumbing",
      cantidad: 15,
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC3R86tYR_TDxlZkf0F-oNfhcZ-LhIhj5T5mUFPtQijYPjRg6o8w5TMgU&s=10",
    },
    {
      id: 9,
      nombre: "Power Tools",
      cantidad: 22,
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaTpkYtFMHzl9il5qy7WQ7ZGqkcH1jLfG_kYQxY0hX4NmSF8Nucs2fCyw&s=10",
    },
    {
      id: 10,
      nombre: "Hand Tools",
      cantidad: 20,
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR01KZVD1_KVvDjRBcEk7ZFSIcGmFfF2Bd4R6exdMRcSFrFoebxSBdZf_U8&s=10",
    },
    {
      id: 11,
      nombre: "Safety Equipment",
      cantidad: 8,
      url: "https://static.vecteezy.com/system/resources/previews/052/921/930/non_2x/safety-gear-icons-set-safety-helmet-gloves-glasses-and-boots-illustration-vector.jpg",
    },
    {
      id: 13,
      nombre: "Steel",
      cantidad: 18,
      url: "data:image/jpeg;base64,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",
    },
    {
      id: 14,
      nombre: "Home",
      cantidad: 20,
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDJv0kfJWV_zP2INLLsfh18ioCtU2NB5hk5g&s",
    },
    {
      id: 16,
      nombre: "Adhesives And Sealants",
      cantidad: 12,
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQspNOxCY7j73eR1UtYyFx8-HJNJL_sJCsPiQ&s",
    },
    {
      id: 17,
      nombre: "Paints",
      cantidad: 8,
      url: "data:image/jpeg;base64,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",
    },
    {
      id: 18,
      nombre: "Nails",
      cantidad: 12,
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlEpxOvT6U66RwfrE0ZtYEDI8-B_Xz-MyQSw&s",
    },
    {
      id: 19,
      nombre: "fasteners",
      cantidad: 15,
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI2oE7NSNuezwRAmMxWBlSRtBiK0dUcC9uRQ&s",
    },
    {
      id: 20,
      nombre: "Pipes And Curtain Accessories",
      cantidad: 9,
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTBEHXI4fa4BQtGaqt14BR07wnUBl1S36pew&s",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        margin: 0,
        display: "flex",
        fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        backgroundColor: "#070a13",
      }}
    >
      <SedesPage />

      {/* PANEL IZQUIERDO: Categorías */}
      <div
        style={{
          width: "35%",
          backgroundColor: "#0b0f19",
          padding: "40px 30px",
          boxSizing: "border-box",
          borderRight: "2px solid #f2b705",
          boxShadow: "5px 0 15px rgba(242, 183, 5, 0.05)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          overflowY: "auto",
          maxHeight: "100vh",
        }}
      >
        <h3
          style={{
            color: "#f2b705",
            fontSize: "14px",
            letterSpacing: "1px",
            textTransform: "uppercase",
            margin: "0 0 10px 0",
          }}
        >
          📂 Categorías ({categorias.length})
        </h3>

        {categorias.map((cat) => (
          <div
            key={cat.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              backgroundColor: "#121826",
              padding: "12px 15px",
              borderRadius: "10px",
              border: "1px solid #1e293b",
            }}
          >
            <img
              src={cat.url}
              alt={cat.nombre}
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "4px",
                objectFit: "cover",
              }}
            />
            <div>
              <span
                style={{
                  color: "#ffffff",
                  fontSize: "14px",
                  fontWeight: "600",
                  display: "block",
                }}
              >
                {cat.nombre}
              </span>
              <span style={{ color: "#64748b", fontSize: "12px" }}>
                Cantidad: {cat.cantidad} disponibles
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* PANEL DERECHO: Formulario principal cambiante */}
      <div
        style={{
          width: "65%",
          padding: "50px 60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "25px",
            right: "35px",
            zIndex: 10,
          }}
        >
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            style={{
              background: "none",
              border: "1px solid #f2b705",
              borderRadius: "6px",
              color: "#f2b705",
              fontSize: "20px",
              padding: "6px 10px",
              cursor: "pointer",
              boxShadow: "0 0 10px rgba(242, 183, 5, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ☰ {sedeSeleccionada ? "📍" : ""}
          </button>

          {menuAbierto && (
            <div
              style={{
                position: "absolute",
                top: "45px",
                right: "0",
                backgroundColor: "#111726",
                border: "1px solid #f2b705",
                borderRadius: "8px",
                width: "240px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                padding: "10px 0",
                zIndex: 100,
              }}
            >
              <div
                style={{
                  padding: "5px 15px 10px 15px",
                  color: "#f2b705",
                  fontSize: "11px",
                  fontWeight: "700",
                  borderBottom: "1px solid #1e293b",
                }}
              >
                📍 SEDES DISPONIBLES
              </div>

              {/* Opción para restaurar la vista principal */}
              <div
                style={{
                  padding: "10px 15px",
                  color: "#a3e635",
                  fontSize: "13px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  setSedeSeleccionada(null);
                  setMenuAbierto(false);
                }}
              >
                🏠 Ver Registro General
              </div>

              {sedes.map((sede) => (
                <div
                  key={sede.id}
                  style={{
                    padding: "10px 15px",
                    color: "#ffffff",
                    fontSize: "13px",
                    cursor: "pointer",
                    borderTop: "1px solid #1e293b",
                  }}
                  onClick={() => {
                    setSedeSeleccionada(sede); // Guarda toda la información de la sede clickeada
                    setPestañaActiva("inventario"); // Por defecto abre el inventario
                    setMenuAbierto(false);
                  }}
                >
                  {sede.nombre}
                </div>
              ))}
              <div
                style={{
                  padding: "5px 15px 5px 15px",
                  color: "#f2b705",
                  fontSize: "11px",
                  fontWeight: "700",
                  borderTop: "1px solid #1e293b",
                }}
              >
                ⚙️Acciones Rápidas
              </div>
              <div
                style={{
                  padding: "10px 15px",
                  color: "#f2b705",
                  fontSize: "13px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "background-color 0.2s",
                }}
                onClick={() => {
                  setPestañaActiva("agregar_producto");
                  setMenuAbierto(false);
                }}
              >
                ➕ Agregar Producto
              </div>
            </div>
          )}
        </div>

        {/* Encabezado Dinámico */}
        <div style={{ textAlign: "center", marginBottom: "35px" }}>
          <img
            src={logoFerreandina}
            alt="Logo Ferreandina"
            style={{ maxWidth: "140px", height: "auto", marginBottom: "15px" }}
          />
          <h2
            style={{
              margin: "10px 0 5px 0",
              color: "#ffffff",
              fontSize: "26px",
              fontWeight: "700",
            }}
          >
            {sedeSeleccionada ? sedeSeleccionada.nombre : "Ferreandina NoSQL"}
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "14px", margin: 0 }}>
            {sedeSeleccionada
              ? "Consulta de Información Corporativa"
              : "Panel de Control • Gestión de Inventario"}
          </p>
        </div>

        {/* SECCIÓN CENTRAL INTERACTIVA */}
        <div
          style={{
            maxWidth: "500px",
            width: "100%",
            margin: "0 auto",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {!sedeSeleccionada ? (
            /* VISTA A: REGISTRO ORIGINAL (Cuando NO hay sede elegida) */
            <div>
              <div style={{ marginBottom: "25px" }}>
                <label
                  style={{
                    color: "#f2b705",
                    fontSize: "11px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  📦 Nombre del nuevo producto
                </label>
                <input
                  type="text"
                  placeholder="Ej: Tubo PVC presión"
                  value={nombreProducto}
                  onChange={(e) => setNombreProducto(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    fontSize: "15px",
                    boxSizing: "border-box",
                    borderRadius: "8px",
                    border: "1px solid #f2b705",
                    backgroundColor: "#111726",
                    color: "#ffffff",
                    outline: "none",
                    boxShadow: "0 0 10px rgba(242, 183, 5, 0.1)",
                  }}
                />
              </div>

              <div
                style={{
                  padding: "18px",
                  backgroundColor: "#111726",
                  borderRadius: "8px",
                  borderLeft: "4px solid #f2b705",
                }}
              >
                <span
                  style={{
                    color: "#f2b705",
                    fontSize: "11px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  🔘 Estado de React en vivo
                </span>
                <p
                  style={{
                    color: nombreProducto ? "#ffffff" : "#64748b",
                    fontSize: "15px",
                    margin: 0,
                    fontStyle: nombreProducto ? "normal" : "italic",
                  }}
                >
                  {nombreProducto || "Esperando que escribas en la caja..."}
                </p>
              </div>
            </div>
          ) : (
            /* VISTA B: SUBMENÚ DE LA SEDE (Cuando SÍ se seleccionó Manizales, Medellín o Pereira) */
            <div>
              {/* Botones selectores estilo Pestañas */}
              <div
                style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
              >
                {["inventario", "trabajadores", "direccion"].map((opcion) => (
                  <button
                    key={opcion}
                    onClick={() => setPestañaActiva(opcion)}
                    style={{
                      flex: 1,
                      padding: "12px 8px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      backgroundColor:
                        pestañaActiva === opcion ? "#f2b705" : "#111726",
                      color: pestañaActiva === opcion ? "#070a13" : "#ffffff",
                      border: "1px solid #f2b705",
                      transition: "all 0.2s",
                    }}
                  >
                    {opcion === "inventario"
                      ? "📦 Inventario"
                      : opcion === "trabajadores"
                        ? "👥 Trabajadores"
                        : "📍 Dirección"}
                  </button>
                ))}
              </div>

              {/* Contenedor dinámico que pinta los datos del arreglo del objeto */}
              <div
                style={{
                  padding: "25px",
                  backgroundColor: "#111726",
                  borderRadius: "10px",
                  border: "1px solid #1e293b",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                }}
              >
                {pestañaActiva === "inventario" && (
                  <div>
                    <h4
                      style={{
                        color: "#f2b705",
                        margin: "0 0 12px 0",
                        fontSize: "14px",
                        textTransform: "uppercase",
                      }}
                    >
                      📋 Productos en stock:
                    </h4>
                    <ul
                      style={{
                        color: "#ffffff",
                        margin: 0,
                        paddingLeft: "20px",
                        fontSize: "14px",
                        lineHeight: "2",
                      }}
                    >
                      {sedeSeleccionada.inventario.map(
                        (item: string, index: number) => (
                          <li key={index}>{item}</li>
                        ),
                      )}
                    </ul>
                  </div>
                )}

                {pestañaActiva === "trabajadores" && (
                  <div>
                    <h4
                      style={{
                        color: "#f2b705",
                        margin: "0 0 12px 0",
                        fontSize: "14px",
                        textTransform: "uppercase",
                      }}
                    >
                      👥 Personal Asignado:
                    </h4>
                    <ul
                      style={{
                        color: "#ffffff",
                        margin: 0,
                        paddingLeft: "20px",
                        fontSize: "14px",
                        lineHeight: "2",
                      }}
                    >
                      {sedeSeleccionada.trabajdores.map(
                        (persona: string, index: number) => (
                          <li
                            key={index}
                            style={{
                              fontWeight:
                                persona.includes("Boss") ||
                                persona.includes("Gerente")
                                  ? "bold"
                                  : "normal",
                              color: persona.includes("Boss")
                                ? "#f2b705"
                                : "#ffffff",
                            }}
                          >
                            {persona}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                )}

                {pestañaActiva === "direccion" && (
                  <div>
                    <h4
                      style={{
                        color: "#f2b705",
                        margin: "0 0 12px 0",
                        fontSize: "14px",
                        textTransform: "uppercase",
                      }}
                    >
                      📍 Ubicación de la sucursal:
                    </h4>
                    <p
                      style={{
                        color: "#ffffff",
                        margin: 0,
                        fontSize: "15px",
                        lineHeight: "1.6",
                        fontWeight: "500",
                      }}
                    >
                      {sedeSeleccionada.dirreccion}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* SECCIÓN INFERIOR: Características */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            borderTop: "1px solid #1e293b",
            paddingTop: "25px",
            marginTop: "20px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOdWL0vxkwBBad2GlX1qJaQ5n7cgU3XEEtAA&s"
              alt="Inventario"
              style={{ width: "24px", height: "24px", marginBottom: "6px" }}
            />
            <span
              style={{
                color: "#ffffff",
                fontSize: "11px",
                fontWeight: "600",
                display: "block",
              }}
            >
              INVENTARIO
            </span>
          </div>
          <div style={{ textAlign: "center" }}>
            <img
              src="https://img.icons8.com/color/48/f2b705/analytics.png"
              alt="Control"
              style={{ width: "24px", height: "24px", marginBottom: "6px" }}
            />
            <span
              style={{
                color: "#ffffff",
                fontSize: "11px",
                fontWeight: "600",
                display: "block",
              }}
            >
              CONTROL
            </span>
          </div>
          <div style={{ textAlign: "center" }}>
            <img
              src="https://img.icons8.com/color/48/f2b705/price-tag.png"
              alt="Productos"
              style={{ width: "24px", height: "24px", marginBottom: "6px" }}
            />
            <span
              style={{
                color: "#ffffff",
                fontSize: "11px",
                fontWeight: "600",
                display: "block",
              }}
            >
              PRODUCTOS
            </span>
          </div>
          <div style={{ textAlign: "center" }}>
            <img
              src="https://img.icons8.com/color/48/f2b705/lock.png"
              alt="Datos"
              style={{ width: "24px", height: "24px", marginBottom: "6px" }}
            />
            <span
              style={{
                color: "#ffffff",
                fontSize: "11px",
                fontWeight: "600",
                display: "block",
              }}
            >
              DATOS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

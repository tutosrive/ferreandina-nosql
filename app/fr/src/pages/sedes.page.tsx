import React from "react";
import Sede, { type SedeProps } from "../componentes/sede.component";

export default function SedesPage() {
  //   const sedes = [
  //     {
  //       id: 1,
  //       nombre: "Sede Principal - Manizales",
  //       city: "Manizales",
  //       dirreccion: "Carrera 23 #10-54, Los Rosales",
  //       trabajdores: ["Santiago Marin (Boss)", "Juan Eduardo (Cajero)"],
  //       inventario: [
  //         "Tubo PVC presión",
  //         "Cerradura de pomo",
  //         "Cemento gris",
  //         "Tornillo de acero",
  //         "Llave inglesa",
  //       ],
  //     },
  //     {
  //       id: 2,
  //       nombre: "Sede - Medellín",
  //       city: "Medellín",
  //       dirreccion: "Avenida 80 #45-30, Belén",
  //       trabajdores: ["Laura Gómez (Gerente)", "Carlos Pérez (Vendedor)"],
  //       inventario: [
  //         "Bujía Eléctrica",
  //         "Canaleta PVC",
  //         "Candado de Alta Seguridad",
  //         "Tornillo de acero",
  //         "Taladro Percutor",
  //       ],
  //     },
  //     {
  //       id: 3,
  //       nombre: "Sede - Pereira",
  //       city: "Pereira",
  //       dirreccion: "Calle 20 #15-10, Cuba",
  //       trabajdores: ["Ana Rodríguez (Gerente)", "Luis Martínez (Vendedor)"],
  //       inventario: [
  //         "Lámina Drywall",
  //         "Pintura Blanca Galón",
  //         "Cemento gris",
  //         "Cable Cobre N.12",
  //         "Llave inglesa",
  //       ],
  //     },
  //   ];

  const [sedes, setSedes] = React.useState<SedeProps[]>([]);

  const getSedes = async () => {
    const customer = {
      phone: "3216512512",
      alias: "fromPcEduardo",
      ni: "823723623",
      id: 23,
      category: "University",
    };
    const url = "https://ftr52p28-8080.use.devtunnels.ms/customers";
    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      //   body: '{"phone":"3216512512","alias":"this is a test right now","ni":"823723623","id":10,"category":"University"}',
      body: JSON.stringify(customer),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button onClick={getSedes}>Cargar Sedes</button>
      {/* {sedes.map((sede) => {
        return (
          <Sede
            name={sede.name}
            city={sede.city}
            direction={sede.direction}
            products={sede.inventario.map((item, index) => ({
              id: index,
              name: item,
              quantity: 1,
            }))}
          />
        );
      })} */}
    </>
  );
}

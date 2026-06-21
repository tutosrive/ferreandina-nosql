export default function SedesPage() {
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
    </>
  );
}

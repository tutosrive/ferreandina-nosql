export interface Products {
  id: Number;
  name: String;
  quantity: Number;
}

export interface SedeProps {
  name: string;
  city: String;
  direction: String;
  products: Products[];
}

const Sede: React.FC<SedeProps> = ({ name, city, direction, products }) => {
  return (
    <div className="sede">
      <h2>{name}</h2>
      <p>
        <strong>Ciudad:</strong> {city}
      </p>
      <p>
        <strong>Nombre:</strong> {name}
      </p>
      <p>
        <strong>Direccion:</strong> {direction}
      </p>
      <p>
        <strong>Productos:</strong>{" "}
        {products.map((product) => {
          return (
            <li key={product.id.toString()}>
              {product.name} - Cantidad: {product.quantity.toString()}
            </li>
          );
        })}
      </p>
    </div>
  );
};

export default Sede;

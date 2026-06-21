import { useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { TablePrime } from "../components/TablePrime";
import { sectionData, type SectionKey } from "../data";

const titleMap: Record<SectionKey, string> = {
  branches: "Sucursales",
  categories: "Categorías",
  customers: "Clientes",
  products: "Productos",
  suppliers: "Proveedores",
  workers: "Trabajadores",
};

const sectionFields: Record<
  SectionKey,
  Array<{ name: string; label: string; type: string }>
> = {
  branches: [
    { name: "name", label: "Nombre", type: "text" },
    { name: "city", label: "Ciudad", type: "text" },
    { name: "direction", label: "Dirección", type: "text" },
  ],
  categories: [
    { name: "name", label: "Nombre", type: "text" },
    { name: "description", label: "Descripción", type: "text" },
  ],
  customers: [
    { name: "alias", label: "Alias", type: "text" },
    { name: "NI", label: "NI", type: "text" },
    { name: "category", label: "Categoría", type: "text" },
    { name: "phone", label: "Teléfono", type: "text" },
  ],
  products: [
    { name: "name", label: "Nombre", type: "text" },
    { name: "description", label: "Descripción", type: "text" },
    { name: "price", label: "Precio", type: "number" },
    { name: "quantity", label: "Cantidad", type: "number" },
    { name: "category_id", label: "Categoría ID", type: "number" },
    { name: "supplier.name", label: "Proveedor", type: "text" },
    { name: "supplier.id", label: "Proveedor ID", type: "number" },
  ],
  suppliers: [
    { name: "name", label: "Nombre", type: "text" },
    { name: "email", label: "Email", type: "text" },
    { name: "phone", label: "Teléfono", type: "text" },
  ],
  workers: [
    { name: "name", label: "Nombre", type: "text" },
    { name: "age", label: "Edad", type: "number" },
    { name: "speciality", label: "Especialidad", type: "text" },
    { name: "email", label: "Email", type: "text" },
    { name: "phone", label: "Teléfono", type: "text" },
    { name: "salary", label: "Salario", type: "number" },
  ],
};

const createEmptyRecord = (section: SectionKey) => {
  return { _id: 0, name: "" };
};

interface SectionPageProps {
  section: SectionKey;
}

export default function SectionPage({ section }: SectionPageProps) {
  const navigate = useNavigate();
  const [records, setRecords] = useState<any[]>([...sectionData[section]]);
  const [formState, setFormState] = useState<Record<string, any>>(
    createEmptyRecord(section),
  );
  const [editingId, setEditingId] = useState<number | string | null>(null);

  useEffect(() => {
    setFormState(createEmptyRecord(section));
    setEditingId(null);
  }, [section]);

  const formFields = sectionFields[section] || [];

  const setFieldValue = (name: string, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRecords((prev) => {
      if (editingId !== null) {
        return prev.map((item) =>
          item._id === editingId ? { ...item, ...formState } : item,
        );
      }
      const newId =
        Math.max(0, ...prev.map((item) => Number(item._id) || 0)) + 1;
      return [
        { ...createEmptyRecord(section), ...formState, _id: newId },
        ...prev,
      ];
    });
    setFormState(createEmptyRecord(section));
    setEditingId(null);
  };

  const handleRemove = async (id: string | number) => {
    setRecords((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <section className="detail-page">
      <div className="detail-header">
        <button className="button-back" onClick={() => navigate("/")}>
          ← Volver a la portada
        </button>
        <div>
          <h2>{titleMap[section]}</h2>
        </div>
      </div>
      <div className="detail-table-wrapper detail-table-full">
        <div className="crud-form-card">
          <form onSubmit={handleSubmit} className="crud-form">
            <h3>{editingId ? "Editar Registro" : "Nuevo Registro"}</h3>
            <div className="form-grid">
              {formFields.map((field) => (
                <div key={field.name} className="form-group">
                  <label>{field.label}</label>
                  <input
                    type={field.type}
                    value={formState[field.name] || ""}
                    onChange={(e) => setFieldValue(field.name, e.target.value)}
                    required
                  />
                </div>
              ))}
            </div>
            <button type="submit" className="button-submit">
              {editingId ? "Guardar Cambios" : "Añadir"}
            </button>
          </form>
        </div>

        <TablePrime data={{ arrayData: records }} onRemove={handleRemove} />
      </div>
    </section>
  );
}

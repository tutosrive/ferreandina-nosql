import { useEffect, useState, type FormEvent } from "react";
import logo from "./assets/logo.png";
import sucursales from "./assets/sucursales.jpg";
import categorias from "./assets/categoria.png";
import clientes from "./assets/clientes.jpg";
import productos from "./assets/productos.jpg";
import proveedores from "./assets/provedores.jpg";
import trabajadores from "./assets/trabajadores.jpg";

import TablePrime from "./componentes/TablePrime";
import { sectionData, summaryCards, type SectionKey } from "./data";

const titleMap: Record<SectionKey, string> = {
  branches: "Sucursales",
  categories: "Categorías",
  customers: "Clientes",
  products: "Productos",
  suppliers: "Proveedores",
  workers: "Trabajadores",
};

const imageMap: Record<SectionKey, string> = {
  branches: sucursales,
  categories: categorias,
  customers: clientes,
  products: productos,
  suppliers: proveedores,
  workers: trabajadores,
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
  switch (section) {
    case "branches":
      return {
        _id: 0,
        name: "",
        city: "",
        direction: "",
        products: [],
        workers: [],
        is_main: false,
      };
    case "categories":
      return { _id: 0, name: "", description: "" };
    case "customers":
      return { _id: 0, NI: "", alias: "", category: "", phone: "" };
    case "products":
      return {
        _id: 0,
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        category_id: 0,
        unitary_weight: 0,
        sould_out_date: null,
        supplier: { id: 0, name: "" },
      };
    case "suppliers":
      return { _id: 0, name: "", email: "", phone: "" };
    case "workers":
      return {
        _id: 0,
        name: "",
        age: 0,
        speciality: "",
        weight: 0,
        email: "",
        phone: "",
        salary: 0,
      };
  }
};

const initialRecords: Record<SectionKey, any[]> = {
  branches: [...sectionData.branches],
  categories: [...sectionData.categories],
  customers: [...sectionData.customers],
  products: [...sectionData.products],
  suppliers: [...sectionData.suppliers],
  workers: [...sectionData.workers],
};

export default function App() {
  const [selectedSection, setSelectedSection] = useState<SectionKey | null>(
    null,
  );
  const [records, setRecords] =
    useState<Record<SectionKey, any[]>>(initialRecords);
  const [formState, setFormState] = useState<Record<string, any>>(
    createEmptyRecord("branches"),
  );
  const [editingId, setEditingId] = useState<number | string | null>(null);

  useEffect(() => {
    if (selectedSection) {
      setFormState(createEmptyRecord(selectedSection));
      setEditingId(null);
    }
  }, [selectedSection]);

  const selectedRecords = selectedSection ? records[selectedSection] : [];
  const formFields = selectedSection ? sectionFields[selectedSection] : [];

  const setFieldValue = (name: string, value: string) => {
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormState((prev) => ({
        ...prev,
        [parent]: { ...(prev[parent] ?? {}), [child]: value },
      }));
      return;
    }

    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const getNextId = (section: SectionKey) => {
    const current = records[section];
    return Math.max(0, ...current.map((item) => Number(item._id) || 0)) + 1;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedSection) return;

    setRecords((prev) => {
      const current = [...prev[selectedSection]];
      if (editingId !== null) {
        return {
          ...prev,
          [selectedSection]: current.map((item) =>
            item._id === editingId ? { ...item, ...formState } : item,
          ),
        };
      }

      const nextRecord = {
        ...createEmptyRecord(selectedSection),
        ...formState,
        _id: getNextId(selectedSection),
      };
      return {
        ...prev,
        [selectedSection]: [nextRecord, ...current],
      };
    });

    setFormState(createEmptyRecord(selectedSection));
    setEditingId(null);
  };

  const handleRemove = async (id: string | number) => {
    if (!selectedSection) return;

    setRecords((prev) => ({
      ...prev,
      [selectedSection]: prev[selectedSection].filter(
        (item) => item._id !== id,
      ),
    }));
  };

  const handleEdit = (row: any) => {
    setEditingId(row._id ?? row.id ?? null);
    setFormState(row);
  };

  return (
    <main className="app-shell">
      {selectedSection ? (
        <section className="detail-page">
          <div className="detail-header">
            <button
              className="button-back"
              onClick={() => setSelectedSection(null)}
            >
              ← Volver a la portada
            </button>
            <div>
              <h1>{titleMap[selectedSection]}</h1>
              <p>
                CRUD local para {titleMap[selectedSection]} usando la data JSON.
              </p>
            </div>
          </div>

          <div className="detail-table-wrapper">
            <img
              className="detail-section-image"
              src={imageMap[selectedSection]}
              alt={titleMap[selectedSection]}
            />

            <div className="detail-table-full">
              <TablePrime
                data={{
                  arrayData: selectedRecords,
                  headerTable: (
                    <strong>{`Tabla de ${titleMap[selectedSection]}`}</strong>
                  ),
                  scrollHeight: "42vh",
                }}
                onEdit={handleEdit}
                onRemove={handleRemove}
              />

              <div className="crud-form-card">
                <div className="crud-form-header">
                  <div>
                    <h2>
                      {editingId
                        ? `Editar ${titleMap[selectedSection]}`
                        : `Agregar ${titleMap[selectedSection]}`}
                    </h2>
                    <p>
                      Llena el formulario para crear o actualizar registros.
                    </p>
                  </div>
                  <button
                    className="button-secondary"
                    type="button"
                    onClick={() =>
                      setFormState(createEmptyRecord(selectedSection))
                    }
                  >
                    Limpiar
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="crud-form-grid">
                  {formFields.map((field) => {
                    const value = field.name.includes(".")
                      ? (formState[field.name.split(".")[0]]?.[
                          field.name.split(".")[1]
                        ] ?? "")
                      : (formState[field.name] ?? "");

                    return (
                      <label key={field.name} className="control-formulario">
                        <span>{field.label}</span>
                        <input
                          type={field.type}
                          value={value}
                          onChange={(event) =>
                            setFieldValue(field.name, event.target.value)
                          }
                        />
                      </label>
                    );
                  })}

                  <div className="form-button-row">
                    {editingId !== null && (
                      <button
                        type="button"
                        className="button-secondary"
                        onClick={() => {
                          if (selectedSection) {
                            setFormState(createEmptyRecord(selectedSection));
                            setEditingId(null);
                          }
                        }}
                      >
                        Cancelar edición
                      </button>
                    )}
                    <button type="submit" className="button-primary">
                      {editingId ? "Guardar cambios" : "Agregar registro"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="hero">
            <div className="hero-copy">
              <div className="brand-row">
                <img
                  width="100px"
                  className="brand-logo"
                  src={logo}
                  alt="Ferreandina logo"
                />
                <span>Ferreandina</span>
              </div>
              <span className="eyebrow">Ferretería NoSQL</span>
              <h1>Bienvenido a Ferreandina</h1>
              <p>
                Administración de sucursales, categorías, clientes, productos,
                proveedores y trabajadores desde un panel moderno y claro.
              </p>
            </div>
            <div className="hero-visual">
              <img width="100px" src={logo} alt="Ilustración Ferreandina" />
            </div>
          </section>

          <section className="summary-grid">
            {summaryCards.map((item) => (
              <article
                key={item.id}
                className="summary-card"
                onClick={() => setSelectedSection(item.id)}
                tabIndex={0}
                role="button"
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    setSelectedSection(item.id);
                  }
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
      )}
    </main>
  );
}

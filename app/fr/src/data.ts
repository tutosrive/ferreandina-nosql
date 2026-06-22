export const branches = [
  {
    _id: 1,
    name: "ferreandina-manizales",
    city: "manizales",
    direction: "Cra 3 #23-12",
    products: [
      { id: 1, name: "hammer", quantity: 10 },
      { id: 2, name: "power_drill", quantity: 4500 },
      { id: 10, name: "drywall_screws", quantity: 6500 },
      { id: 6, name: "copper_wire_12awg", quantity: 2300 },
    ],
    workers: [
      { id: 1, name: "Eduardo Sánchez" },
      { id: 2, name: "Santiago Marin" },
    ],
    is_main: false,
  },
];

export const categories = [
  {
    _id: 1,
    name: "construction-materials",
    description:
      "Basic materials for construction and renovation projects such as cement, sand, bricks, blocks, mixes, plaster, mortars and complementary supplies",
  },
  {
    _id: 2,
    name: "pvc",
    description:
      "PVC products such as pipes, fittings, elbows, joints, valves and accessories for water, drainage and other systems",
  },
  {
    _id: 3,
    name: "locks-and-padlocks",
    description:
      "Security products for doors, furniture and access points, including locks, latches, padlocks and protective accessories",
  },
  {
    _id: 4,
    name: "drywall",
    description:
      "Drywall construction materials such as gypsum boards, metal profiles, corners, tapes, joint compounds and accessories for walls and ceilings",
  },
  {
    _id: 5,
    name: "electrical",
    description:
      "Electrical installation products such as cables, plugs, switches, outlets, breakers, conduits, light bulbs and electrical accessories",
  },
  {
    _id: 6,
    name: "galvanized",
    description:
      "Metal products with a zinc coating for corrosion protection, used in structures, pipes, fasteners and construction work",
  },
  {
    _id: 7,
    name: "bathroom-fixtures",
    description:
      "Water supply and control accessories for sinks and bathrooms, including faucets, valves, keys and replacement parts",
  },
  {
    _id: 8,
    name: "kitchen-and-laundry-fixtures",
    description:
      "Faucets and accessories for kitchens and laundry areas, including taps, mixers, pipes and sink accessories",
  },
  {
    _id: 9,
    name: "plumbing",
    description:
      "Plumbing products such as valves, drains, connections and bathroom installation components",
  },
  {
    _id: 10,
    name: "power-tools",
    description:
      "Electric-powered equipment and machines for construction, repair and maintenance work, such as drills, grinders, sanders, saws and accessories",
  },
  {
    _id: 11,
    name: "hand-tools",
    description:
      "Tools for mechanical, assembly and repair tasks without electricity, such as hammers, screwdrivers, wrenches, pliers and other manual tools",
  },
  {
    _id: 12,
    name: "safety-equipment",
    description:
      "Protective equipment for construction, industrial and maintenance work, such as gloves, safety glasses, helmets, masks, hearing protection and safety gear",
  },
  {
    _id: 13,
    name: "steel",
    description:
      "Metal materials for structures and manufacturing such as bars, rods, profiles, sheets and steel components",
  },
  {
    _id: 14,
    name: "home",
    description:
      "Products for household maintenance and daily use, including cleaning supplies, organization items, accessories and home solutions",
  },
  {
    _id: 15,
    name: "adhesives-and-sealants",
    description:
      "Adhesives and sealants for joining and sealing materials such as silicones, epoxies, contact cement and specialized bonding products",
  },
  {
    _id: 16,
    name: "paints",
    description:
      "Products for surface finishing and protection such as interior and exterior paints, enamels, anti-corrosion coatings, varnishes and accessories",
  },
  {
    _id: 17,
    name: "nails",
    description:
      "Metal fastening elements for woodworking, construction and carpentry in different sizes and formats",
  },
  {
    _id: 18,
    name: "fasteners",
    description:
      "Screws, nuts, washers, bolts and other fastening accessories for assembly and securing parts",
  },
  {
    _id: 19,
    name: "pipes-and-curtain-accessories",
    description:
      "Products for installing and maintaining piping systems, together with curtain accessories such as tubes, fittings, supports, rods, rails, terminals and mounting components",
  },
];

export const customers = [
  {
    _id: 1,
    NI: "1103720010",
    alias: "company1",
    category: "company",
    phone: "3126543214",
  },
];

export const products = [
  {
    _id: 1,
    name: "hammer",
    description:
      "Tools used for striking, driving nails, breaking materials and performing carpentry, construction and repair tasks",
    price: 100,
    category_id: 11,
    quantity: 1000,
    unitary_weight: 2.5,
    sould_out_date: null,
    supplier: { id: 1, name: "Fierros La Central" },
  },
];

export const suppliers = [
  {
    _id: 1,
    name: "Fierros La Central",
    email: "support@fierrosc.com",
    phone: "3212894567",
  },
];

export const workers = [
  {
    _id: 1,
    name: "Eduardo Sánchez",
    age: 27,
    speciality: "cashier",
    weight: 12,
    email: "sanchez.edu@ferreandina.com",
    phone: "3212894567",
    salary: 1200000,
  },
  {
    _id: 2,
    name: "Santiago Marin",
    age: 19,
    speciality: "boss",
    weight: 67,
    email: "boss@ferreandina.com",
    phone: "3212894568",
    salary: 12000000,
  },
];

export type SectionKey =
  | "branches"
  | "categories"
  | "customers"
  | "products"
  | "suppliers"
  | "workers";

export interface SummaryCard {
  id: SectionKey;
  label: string;
  count: number;
  description: string;
  emoji: string;
}

export const sectionData: Record<SectionKey, any[]> = {
  branches,
  categories,
  customers,
  products,
  suppliers,
  workers,
};

export const summaryCards: SummaryCard[] = [
  {
    id: "branches",
    label: "Branches",
    count: branches.length,
    description: "Sucursales activas en la red",
    emoji: "🏢",
  },
  {
    id: "categories",
    label: "Categorías",
    count: categories.length,
    description: "Tipos de productos definidos",
    emoji: "🗂️",
  },
  {
    id: "customers",
    label: "Customers",
    count: customers.length,
    description: "Clientes registrados",
    emoji: "👥",
  },
  {
    id: "products",
    label: "Productos",
    count: products.length,
    description: "Items disponibles en inventario",
    emoji: "📦",
  },
  {
    id: "suppliers",
    label: "Suppliers",
    count: suppliers.length,
    description: "Proveedores activos",
    emoji: "🚚",
  },
  {
    id: "workers",
    label: "Workers",
    count: workers.length,
    description: "Empleados registrados",
    emoji: "🛠️",
  },
];

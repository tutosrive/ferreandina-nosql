export default function Formulario() {
    return (
        <div>
            <h1>🛠️ Agregar Producto</h1>
            <form>
                <div className='control-formulario'>
               <label htmlFor="_id">ID:</label>
               <input type="number" id="_id" name="_id"></input>
                </div>
                <div className='control-formulario'>
               <label htmlFor="name">Nombre:</label>
               <input type="text" id="name" name="name"></input>
                </div>
                <div className='control-formulario'>
                    <label htmlFor="description">Descripción:</label>
                    <input type="text" id="description" name="description"></input>
                </div>

                <div className='control-formulario'>
                    <label htmlFor="price">Precio:</label>
                    <input type="number" id="price" name="price"></input>
                </div>

                <div className='control-formulario'>
                    <label htmlFor="category">Categoría:</label>
                    <input type="text" id="category" name="category"></input>
                </div>

                <div className='control-formulario'>
                    <label htmlFor="quantity">Cantidad:</label>
                    <input type="number" id="quantity" name="quantity"></input>
                </div>

                <div className='control-formulario'>
                    <label htmlFor="unitary_weight">Peso Unitario:</label>
                    <input type="number" id="unitary_weight" name="unitary_weight"></input>
                </div>

                <div className='control-formulario'>
                    <label htmlFor="sould_out_date">fecha de agotamiento</label>
                    <input type="date" id="sould_out_date" name="sould_out_date"></input>
                </div>

                <div className='control-formulario'>
                    <label htmlFor="supplier.id">ID del Proveedor:</label>
                    <input type="number" id="supplier.id" name="supplier.id"></input>
                </div>
                <div className='control-formulario'>
                    <label htmlFor="supplier.name">Nombre del Proveedor:</label>
                    <input type="text" id="supplier.name" name="supplier.name"></input>
                </div>

              
                    <button type="submit">Agregar Producto</button>


            </form>
        </div>
    ) 
}        

import axios from 'axios';
import './App.css'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { Pedido } from './types/Pedido';
import { DetallePedido } from './types/DetallePedido';
import { Producto } from './types/Producto';
import { useState } from 'react';


function App() {

  const Producto1:Producto = {
    id:1,
    descripcion:"",
    fechaBaja:new Date(),
    title:"BURGER",
    price:25.00
  }
   const Producto2:Producto = {
    id:2,
    descripcion:"",
    fechaBaja:new Date(),
    title:"PIZZA",
    price:30.00
  }
  const DetalleProducto1:DetallePedido = {
    id:1,
    quantity: 2,
    subtotalPedido: Producto1.price* 2,
    producto:Producto1
  }
  const DetalleProducto2:DetallePedido = {
    id:2,
    quantity:2,
    subtotalPedido: Producto2.price* 2,
    producto:Producto2
  }
  const Pedido:Pedido = {
    id:1,
    montoTotal:"",
    fecha: new Date(),
    detallesPedido:[DetalleProducto1,DetalleProducto2]
  }
 
  const [preferenceId,setPreferenceId] = useState(null);

  const API_URL = import.meta.env.VITE_MP_TOKEN;

  initMercadoPago(API_URL,{
    locale:"es-AR"
  });

  const createPreference = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/mp/preference",Pedido)
      
      const id = response.data;
      return id;
    } catch (error) {
      console.log(error)
    }
  }

  const handleBuy = async () => {
    const id = await createPreference();
    
    if (id) {
      setPreferenceId(id);
    }
  }


  return ( 
    <>
      <div>
          <h1>BURGER</h1>
          <p>$5000</p>
          <button onClick={handleBuy}>Comprar</button>
          {
            preferenceId &&
            <Wallet initialization={{ preferenceId: preferenceId }} />
          }
      </div>
    </>
  )
}

export default App

import { Producto } from "./Producto";

export interface DetallePedido{
    id:number,
    subtotalPedido:number,
    quantity:number,
    producto:Producto
}
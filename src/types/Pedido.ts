import { DetallePedido } from "./DetallePedido";

export interface Pedido {
    id:number,
    montoTotal:String,
    fecha:Date,
    detallesPedido:DetallePedido[]
}
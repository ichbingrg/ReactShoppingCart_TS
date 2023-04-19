import { Offcanvas } from "react-bootstrap"
import { useShoppingCart } from "../contexts/ShoppingCartContext"

type ShoppingCartProps = {
    isOpen: boolean
}

export function ShoppingCart({isOpen}: ShoppingCartProps){
    const {closeCart} = useShoppingCart()
    return (
        <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    Cart
                </Offcanvas.Title>
            </Offcanvas.Header>
        </Offcanvas>
    )
}
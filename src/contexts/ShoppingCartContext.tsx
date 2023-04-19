import { ReactNode, createContext, useContext, useState } from "react"
import { ShoppingCart } from "../components/ShoppingCart"

type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number,
    quantity: number
}

type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    cartQuantity: number
    cartItems: CartItem[]
    getItemQuantity: (id:number) => number
    increaseCartQuantity: (id:number) => void
    decreaseCartQuantity: (id:number) => void
    removeFromCart: (id:number) => void

}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }:ShoppingCartProviderProps)
{
    const [cartItems, setCartItems] = useState<CartItem []>([])
    const [isOpen, setIsOpen] = useState(false)

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    function getItemQuantity(id:number){
        return cartItems.find(item => item.id === id)?.quantity || 0 // if item found then return quantity else return a default value of 0
    }

    function increaseCartQuantity(id:number){
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)==null){
                // if the given id does not exist in cart then add the item to the cartlist
                    return [...currItems, {id,quantity:1}]
            }
            else
            {
                return currItems.map(item =>{
                    if (item.id === id){
                        return {...item, quantity:item.quantity+1}
                    }else{
                        return item
                    }
                })

            }
        })
    }

    function decreaseCartQuantity(id:number){
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity=== 1){
                    return currItems.filter(item => item.id !== id)
                    // return a brand new list without the item which had the quantity === 1
            }
            else
            {
                return currItems.map(item =>{
                    if (item.id === id){
                        return {...item, quantity:item.quantity-1}
                    }else{
                        return item
                    }
                })

            }
        })
    }

    function removeFromCart(id:number){
        setCartItems(currItems =>{
            return currItems.filter(item => item.id !== id)
        })
    }

    const cartQuantity = cartItems.reduce(
        (quantity, item) =>item.quantity + quantity,0
    )


    return (<ShoppingCartContext.Provider value={{ getItemQuantity, 
                                                    increaseCartQuantity, 
                                                    decreaseCartQuantity, 
                                                    removeFromCart,
                                                    openCart,
                                                    closeCart,
                                                    cartItems, 
                                                    cartQuantity}}>
        { children}
        <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContext.Provider>)
} 
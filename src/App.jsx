import { useState, useEffect } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db"

function App() {

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : [] 
  }

  const [data] = useState(db)
  const [cart, setCart] = useState(initialCart)

  const MAX_ITEMS = 5
  const MIN_ITEMS = 1

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])
  
  function addToCart(item) {

    const itemExists = cart.findIndex(guitar => guitar.id === item.id)
      if (itemExists >= 0) { // quiere decir que existe en el carrito
        if(cart[itemExists].quantity >= MAX_ITEMS) return
        const updatedCart = [...cart]
        updatedCart[itemExists].quantity++
        setCart(updatedCart)
      }else{
        item.quantity = 1
        setCart([...cart, item])
      }

  }

  function removeFromCart(id){
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function decreaseQuantity(id){
    const updatedCart = cart.map(item => {
      if(item.id === id && item.quantity > MIN_ITEMS){
        return{
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function increaseQuantity(id){
    const updatedCart = cart.map(item => {
      if(item.id === id && item.quantity < MAX_ITEMS){
        return{
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function clearCart(){
    setCart([])
  }


  return (
    <>
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
              <Guitar
                key={guitar.id}
                guitar={guitar}
                setCart={setCart}
                addToCart={addToCart}
              />
            ))}
        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App

// Reglas de Hooks

// 1. Se deben colocar los hooks en la parte superior de cada componente.
// 2. No se pueden registrarse en base a condicionales o bucles. Al final del componente deben existir la misma cantidad de Hooks que al commienzo del mismo.

// State
  // const [auth, setAuth] = useState(false);
  // console.log(auth);

  // // useEffect ejecuta código cada vez que cambie el state en la aplicacion
  // useEffect(() => {
  //   console.log('Componente listo');
  // }, [auth])

  // setTimeout(() =>{
  //   setAuth(true)
  // }, 3000)

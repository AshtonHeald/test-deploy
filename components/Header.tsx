import Navigation from "./Navigation"

const Header = () => {
  return (
    <header className="py-4 border-b">
      <h1 className="py-2 text-xl lg:text-3xl text-center font-bold">The Ash Café</h1>
      <Navigation />
    </header>
  )
}

export default Header
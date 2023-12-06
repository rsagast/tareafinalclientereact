
import { Link } from 'react-router-dom'

const NavBar = () => {

  return (
    <>
      <nav className="navbar bg-dark  navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to='/'>Tarea Final</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page"  to='/'>Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/Fabricante'>Fabricante</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/Articulo'>Articulo</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar

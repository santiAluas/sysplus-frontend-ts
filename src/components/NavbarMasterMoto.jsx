import Logo from '../assets/images/Logo.png'
const NavbarMasterMoto = (props) => {
  const { titulo } = props
  return (
    <div>
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffe800',
        color: '#000000',
        paddingLeft: '50px',
        paddingRight: '50px'
      }}>
        <strong style={{
          fontWeight: 'bold',
          fontSize: 20
        }}> {titulo}</strong>
        <img src={Logo}
          width={120}
          height={80}
          alt='logo de la empresa master moto'></img>
      </nav>
    </div>
  )
}

export default NavbarMasterMoto
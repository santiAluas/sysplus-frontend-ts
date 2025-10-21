import SysPlus from '../assets/images/SysPlus.png'
const PageInit = () => {
  return (
    <div style={{display:'flex',
                 justifyContent:'center', 
                alignItems:'center',
                alignContent:'center',
                height:'90vh',
                }}>
        <img 
          src={SysPlus}
          alt="Imagen de Sys Plus"
          style={{
            width: "70%",
            height: "500px",
            objectFit: "cover",
            objectPosition: "center"
          }}
        />
    </div>
  )
}

export default PageInit
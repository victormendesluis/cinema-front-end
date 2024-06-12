import React from 'react';
import '../style/footer.css'; // Opcional: para estilos personalizados

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2024 Filmmes. Todos los derechos reservados. <img src="logo.jpg" width={50}></img></p>
    </footer>
  );
}

export default Footer;
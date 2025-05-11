import React from "react";

function Footer() {
  return (
    <footer className="bg-light text-center py-3 mt-auto">
      <small>
        &copy; {new Date().getFullYear()} Robin Lassak. Všechna práva vyhrazena.
      </small>
    </footer>
  );
}

export default Footer;

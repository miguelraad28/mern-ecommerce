import React, { useEffect, useState } from 'react';
//import axios from 'axios';
const Mercadopago = ({preferenceId, cargandoBoton, setCargandoBoton}) => {
  const FORM_ID = "payment-form"
  const showMercadoPago = () => {
    
    console.log(cargandoBoton)
    if (preferenceId) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src =
        'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
      script.setAttribute('data-preference-id', preferenceId);
      const form = document.getElementById("payment-form");
      form.appendChild(script);
    }
    
  }
  useEffect(() => {
    setCargandoBoton(!cargandoBoton)
    showMercadoPago()
    setCargandoBoton(!cargandoBoton)
  }, [preferenceId]);
  return (
    <form id={FORM_ID} method="GET" />
  );
}
export default Mercadopago;
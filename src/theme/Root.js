import React, {useEffect, useState} from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';

const STORAGE_KEY = 'vibecoding_disclaimer_dismissed';

function DisclaimerModal() {
  const isBrowser = useIsBrowser();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isBrowser) return;
    try {
      const dismissed = window.localStorage.getItem(STORAGE_KEY);
      if (!dismissed) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, [isBrowser]);

  if (!open) return null;

  const handleDismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // ignore storage errors
    }
    setOpen(false);
  };

  return (
    <div className="disclaimer-overlay" role="dialog" aria-modal="true" aria-labelledby="disclaimer-title">
      <div className="disclaimer-card">
        <h2 id="disclaimer-title">Aviso a navegantes</h2>
        <p>
          Esta web recoge mis notas y lo que fui recordando (o completando) del curso de Programación con IA.
        </p>
        <p>
          Tiene fallos de diseño en la web, las presentaciones y el PDF: es simplemente un primer intento de
          aplicar lo visto en clase.
        </p>
        <p>
          El proceso me sirvió para darme cuenta de lo importante que es planificar antes, porque muchos errores
          ahora requieren para su corrección un tiempo que no puedo dedicar a mejorar esta página.
        </p>
        <p>Si sigues navegando, ten en cuenta este contexto.</p>
        <div className="disclaimer-actions">
          <button className="disclaimer-button" onClick={handleDismiss}>
            No mostrar de nuevo
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Root({children}) {
  return (
    <>
      <DisclaimerModal />
      {children}
    </>
  );
}


export  const handleForm = (personaDatos) => {
    let form = new FormData();
    form.append('nombre', personaDatos.nombre);
    form.append('apellido', personaDatos.apellido);
    form.append('edad', personaDatos.edad);
    form.append('sexo', personaDatos.sexo);
    return form;
  }
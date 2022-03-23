import React, { useState, useEffect } from "react";

import "../styles/formStyle.css";

import { db } from "../services/firebase-config"
import { ref, set, update } from "firebase/database";

export function RegistrationForm(props) {
  const initialsShieldOfValues = {
    name: '',
    cpf: '',
    phone: '',
    email: '',
    address: ''
  }

  const [values, setValues] = useState(initialsShieldOfValues);

  function handleChangeInput(e) {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value
    })
  }

  async function handleChangeForm(e) {
    e.preventDefault();
    try{
      if (setValues) {
            await set(ref(db, 'users/' + values.cpf), {
              name: values.name,
              cpf: values.cpf,
              phone: values.phone,
              email: values.email,
              address: values.address
            })
            setValues('')
          }else {
            const updates = {};
            updates['/users/' + props.idAtual] = values;
            return await update(ref(db), updates )
          } 
    }catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    if (props.idAtual === ' ') {
      setValues({
        ...initialsShieldOfValues
      })
    } else {
      setValues({
        ...props.dadosUsers[props.idAtual]
      })
    }
  }, [props.idAtual, props.dadosUsers])

  return (
    <form className="form-content" autoComplete="off" onSubmit={handleChangeForm}>
      <div className="form-group input-group">
        <input type="text" className="form-control" placeholder="Nome Completo" name="name" value={values.name} onChange={handleChangeInput} />
      </div>
      <div className="form-group input-group">
        <div className="input-grou-prepend">
        </div>
        <input type="text" className="form-control" placeholder="Cpf" name="cpf" value={values.cpf} onChange={handleChangeInput} />
      </div>
      <div className="row">
        <div className="form-group input-group col-md-6">
          <div className="input-grou-prepend">
          </div>
          <input type="text" className="form-control" placeholder="Telefone" name="phone" value={values.phone} onChange={handleChangeInput} />
        </div>

        <div className="form-group input-group col-md-6">
          <div className="input-grou-prepend">

          </div>
          <input type="text" className="form-control" placeholder="E-mail" name="email" value={values.email} onChange={handleChangeInput} />
        </div>
      </div>

      <div className="form-group">
        <textarea className="form-control" name="address" placeholder="Endereço" value={values.address} onChange={handleChangeInput}></textarea>
      </div>
      <div className="form-group">
        <input type="submit" value={props.idAtual === ' ' ? 'Salvar' : 'Atualizar'} className="btn btn-primary btn-block" />
      </div>
    </form>
  )
}
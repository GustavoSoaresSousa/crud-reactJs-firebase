import React, { useState, useEffect } from "react";
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
    if (setValues) {
      await set(ref(db, 'users/' + values.cpf), {
        name: values.name,
        cpf: values.cpf,
        phone: values.phone,
        email: values.email,
        address: values.address
      })
    }else {
      //const dadosUsersUpdates = push(child(ref(db), 'users')).key
      const updates = {};
      updates['/users/' + props.idAtual] = values;
      return await update(ref(db), updates )
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
    <form autoComplete="off" onSubmit={handleChangeForm}>
      <div className="form-group input-group">
        <div className="input-grou-prepend">
          <div className="input-group-text">
            <i className="fas fa-user"></i>
          </div>
        </div>
        <input className="form-control" placeholder="Nome Completo" name="name" value={values.name} onChange={handleChangeInput} />
      </div>
      <div className="form-group input-group">
        <div className="input-grou-prepend">
          <div className="input-group-text">
            <i className="fas fa-user"></i>
          </div>
        </div>
        <input className="form-control" placeholder="Cpf" name="cpf" value={values.cpf} onChange={handleChangeInput} />
      </div>

      <div className="row">
        <div className="form-group input-group col-md-6">
          <div className="input-grou-prepend">
            <div className="input-group-text">
              <i className="fas fa-mobile-alt"></i>
            </div>
          </div>
          <input className="form-control" placeholder="Telefone" name="phone" value={values.phone} onChange={handleChangeInput} />
        </div>

        <div className="form-group input-group col-md-6">
          <div className="input-grou-prepend">
            <div className="input-group-text">
              <i className="fas fa-envelope"></i>
            </div>
          </div>
          <input className="form-control" placeholder="E-mail" name="email" value={values.email} onChange={handleChangeInput} />
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